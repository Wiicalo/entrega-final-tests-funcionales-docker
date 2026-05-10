import { AdoptionRepository } from '../repositories/adoption.repository.js';
import { AdoptionUserRepository } from '../repositories/adoption-user.repository.js';
import { PetRepository } from '../repositories/pet.repository.js';

export class AdoptionService {
    constructor({
        adoptionRepository = new AdoptionRepository(),
        userRepository = new AdoptionUserRepository(),
        petRepository = new PetRepository()
    } = {}) {
        this.adoptionRepository = adoptionRepository;
        this.userRepository = userRepository;
        this.petRepository = petRepository;
    }

    getAllAdoptions() {
        return this.adoptionRepository.findAll();
    }

    getAdoptionById(id) {
        return this.adoptionRepository.findById(id);
    }

    createAdoption({ uid, pid }) {
        const user = this.userRepository.findById(uid);
        if (!user) {
            const error = new Error('user Not found');
            error.statusCode = 404;
            throw error;
        }

        const pet = this.petRepository.findById(pid);
        if (!pet) {
            const error = new Error('Pet not found');
            error.statusCode = 404;
            throw error;
        }

        if (pet.adopted) {
            const error = new Error('Pet is already adopted');
            error.statusCode = 400;
            throw error;
        }

        const pets = Array.isArray(user.pets) ? [...user.pets] : [];
        if (!pets.includes(pet.id)) pets.push(pet.id);

        this.userRepository.update(user.id, { pets });
        this.petRepository.update(pet.id, { adopted: true, owner: user.id });

        return this.adoptionRepository.create({ owner: user.id, pet: pet.id });
    }
}
