import request from "supertest";
import { expect } from "chai";
import app from '../../app.js';
import { describe } from "mocha";

// El JWT_SECRET lo definimos localmente para no depender de una libreria y poder firmar localmente el JWT.
process.env.JWT_SECRET = "ClaveUltraMegaSecreta123";

describe('User Routes - Integrations', () => {
    // Generamos datos unicos para evitar choques entre ejecuciones
    const uniqueId = Date.now();
    const userPayload = {
        email: `tester${uniqueId}@user.com`,
        password: '123456789',
        username: `tester${uniqueId}`,
    };

    it('GET /api/users responde un Array con código 200', async () => {
        const res = await request(app).get('/api/users/');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('POST /api/users crea un usuario', async () => {
        const res = await request(app).post('/api/users/').send(userPayload);
        expect(res.status).to.equal(201);
        expect(res.body).to.include.keys('id', 'username', 'email');
        expect(res.body.username).to.equal(userPayload.username);
        expect(res.body.email).to.equal(userPayload.email);
    });

    it('POST /api/users/login retorna un token y un user', async () => {
        const res = await request(app).post('/api/users/login').send({
            email: userPayload.email,
            password: userPayload.password
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('user');
        expect(res.body.user.email).to.equal(userPayload.email);
    });

    it('GET /api/users/profile responde responde un 401 sin token', async () => {
        const res = await request(app).get('/api/users/profile');
        expect(res.status).to.equal(401);
    });

    it('GET /api/users/profile responde responde un 200 con token válido', async () => {

        const login = await request(app).post('/api/users/login').send({
            email: userPayload.email,
            password: userPayload.password
        });
        const res = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${login.body.token}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('user');
        expect(res.body.user.email).to.have.equal(userPayload.email);

    });
});