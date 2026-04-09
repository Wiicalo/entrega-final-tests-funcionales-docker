import { UserRepository } from "../repositories/user.repository.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUND = 10;

export class UserService {
    constructor() {
        this.userRepo = new UserRepository();
    }

    getAllUsers() {
        return this.userRepo.findAll();
    }

    registerUser({ email, password, username }) {
        const existingEmail = this.userRepo.findByEmail(email);
        if (existingEmail) {
            throw new Error("Email is already in use");
        }

        const existingUsername = this.userRepo.findByUsername(username);
        if (existingUsername) {
            throw new Error("Username is already in use");
        }

        const hashedPass = bcrypt.hashSync(password, SALT_ROUND);
        const newUser = this.userRepo.createUser({
            email,
            password: hashedPass,
            username
        });
        return newUser;
    }


    login({ email, password }) {
        const user = this.userRepo.findByEmail(email);
        if (!user) throw new Error("Invalid credentials (email)");

        const validPass = bcrypt.compareSync(password, user.password);
        if (!validPass) throw new Error("Invalid credentials (password)");

        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { token, user: { id: user.id, username: user.username, email: user.email } }

    }
}