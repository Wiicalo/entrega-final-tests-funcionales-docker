import { User } from "../models/user.model.js";
import { randomUUID } from 'crypto';

const users = []; // Esto es un Array

export class UserRepository {
    findAll() {
        return users;
    }

    findById(id) {
        return users.find(user => user.id === id);
    }

    findByEmail(email) {
        return users.find(user => user.email === email);
    }

    findByUsername(username) {
        return users.find(user => user.username === username);
    }

    createUser({email, password, username}) {
        const newUser = new User({
            id: randomUUID(),
            email,
            password,
            username
        });
        users.push(newUser);
        return newUser;
    }
}