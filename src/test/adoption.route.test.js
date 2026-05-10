import request from 'supertest';
import { expect } from 'chai';
import app from '../../app.js';
import { resetAdoptions, failNextAdoptionRepositoryCall } from '../repositories/adoption.repository.js';
import { resetAdoptionUsers } from '../repositories/adoption-user.repository.js';
import { resetPets } from '../repositories/pet.repository.js';

describe('Adoption Routes - Functional', () => {
    beforeEach(() => {
        resetAdoptionUsers([
            { id: 'user-1', username: 'sofi', pets: [] },
            { id: 'user-2', username: 'nico', pets: ['pet-adopted'] }
        ]);

        resetPets([
            { id: 'pet-1', name: 'Mora', specie: 'dog', adopted: false },
            { id: 'pet-adopted', name: 'Nube', specie: 'cat', adopted: true, owner: 'user-2' }
        ]);

        resetAdoptions([
            { id: 'adoption-1', owner: 'user-2', pet: 'pet-adopted' }
        ]);
    });

    it('GET /api/adoptions responde todas las adopciones', async () => {
        const res = await request(app).get('/api/adoptions');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status', 'success');
        expect(res.body.payload).to.be.an('array').with.lengthOf(1);
        expect(res.body.payload[0]).to.include({ id: 'adoption-1', owner: 'user-2', pet: 'pet-adopted' });
    });

    it('GET /api/adoptions/:aid responde una adopcion existente', async () => {
        const res = await request(app).get('/api/adoptions/adoption-1');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status', 'success');
        expect(res.body.payload).to.include({ id: 'adoption-1', owner: 'user-2', pet: 'pet-adopted' });
    });

    it('GET /api/adoptions/:aid responde 404 cuando no existe', async () => {
        const res = await request(app).get('/api/adoptions/adoption-404');

        expect(res.status).to.equal(404);
        expect(res.body).to.deep.equal({ status: 'error', error: 'Adoption not found' });
    });

    it('GET /api/adoptions/:aid valida formato de id', async () => {
        const res = await request(app).get('/api/adoptions/@@@');

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status', 'error');
        expect(res.body.errors[0]).to.have.property('msg', 'Invalid adoption id');
    });

    it('POST /api/adoptions/:uid/:pid crea una adopcion valida', async () => {
        const res = await request(app).post('/api/adoptions/user-1/pet-1');

        expect(res.status).to.equal(200);
        expect(res.body).to.include({ status: 'success', message: 'Pet adopted' });
        expect(res.body.payload).to.include({ owner: 'user-1', pet: 'pet-1' });

        const list = await request(app).get('/api/adoptions');
        expect(list.body.payload).to.have.lengthOf(2);
        expect(list.body.payload.at(-1)).to.include({ owner: 'user-1', pet: 'pet-1' });
    });

    it('POST /api/adoptions/:uid/:pid responde 404 si el usuario no existe', async () => {
        const res = await request(app).post('/api/adoptions/user-404/pet-1');

        expect(res.status).to.equal(404);
        expect(res.body).to.deep.equal({ status: 'error', error: 'user Not found' });
    });

    it('POST /api/adoptions/:uid/:pid responde 404 si la mascota no existe', async () => {
        const res = await request(app).post('/api/adoptions/user-1/pet-404');

        expect(res.status).to.equal(404);
        expect(res.body).to.deep.equal({ status: 'error', error: 'Pet not found' });
    });

    it('POST /api/adoptions/:uid/:pid responde 400 si la mascota ya fue adoptada', async () => {
        const res = await request(app).post('/api/adoptions/user-1/pet-adopted');

        expect(res.status).to.equal(400);
        expect(res.body).to.deep.equal({ status: 'error', error: 'Pet is already adopted' });
    });

    it('POST /api/adoptions/:uid/:pid valida parametros', async () => {
        const res = await request(app).post('/api/adoptions/x/@@@');

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status', 'error');
        expect(res.body.errors.map(error => error.msg)).to.include.members([
            'Invalid user id',
            'Invalid pet id'
        ]);
    });

    it('GET /api/adoptions responde 500 ante una falla del repositorio', async () => {
        failNextAdoptionRepositoryCall('findAll');

        const res = await request(app).get('/api/adoptions');

        expect(res.status).to.equal(500);
        expect(res.body).to.include({ status: 'error', error: 'Internal server error' });
        expect(res.body.detail).to.include('Adoption repository findAll error');
    });
});
