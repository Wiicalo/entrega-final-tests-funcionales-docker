import { UserService } from "../services/user.service.js";
import { expect } from "chai";

// El JWT_SECRET lo definimos localmente para no depender de una libreria y poder firmar localmente el JWT.
process.env.JWT_SECRET = "ClaveUltraMegaSecreta123";

describe('User Service - Unit', () => {

    let userService;

    before(() => {
        // Instanciamos el servicio
        userService = new UserService();

        userService.registerUser({
            email: "test@mail.com",
            password: "123456789",
            username: "testUser"
        });
    });

    it('retorna todos los usuarios en un Array', () => {
        const users = userService.getAllUsers();
        expect(users).to.be.an('array');
        expect(users.length).to.be.greaterThan(0);
    });

    it('lanza error si el email ya existe', () => {
        expect(() =>
            userService.registerUser({
                email: "test@mail.com",
                password: "123456789",
                username: "otherUser"
            })
        ).to.throw('Email is already in use');
    });

    it('lanza error si el username ya existe', () => {
        expect(() => {
            userService.registerUser({
                email: "test@nuevomail.com",
                password: "123456789",
                username: "testUser"
            })
        }).to.throw("Username is already in use");
    });

    it('retorna el token y el user al hacer login', () => {
        const result = userService.login({
            email: "test@mail.com",
            password: "123456789"
        });

        // Verificamos el contrato que consume el controller: token + user
        expect(result).to.be.an('object');
        expect(result).to.have.property('token');
        expect(result).to.have.property('user');
        expect(result.user).to.have.property('email', 'test@mail.com');
        expect(result.user).to.have.property('username', 'testUser');
    });

    it('lanza error cuando el password es incorrecto', () => {
        expect(() => {
            userService.login({
                email: "test@mail.com",
                password: "equivocado"
            });
        }).to.throw("Invalid credentials (password)");
    });

    it('lanza error cuando el email es incorrecto', () => {
        expect(() => {
            userService.login({
                email: "equivocado@mail.com",
                password: "123456789"
            });
        }).to.throw("Invalid credentials (email)");
    });
});