import { Pet } from '../models/pet.model.js';

const pets = [];

export class PetRepository {
    findById(id) {
        return pets.find(pet => pet.id === id);
    }

    update(id, data) {
        const pet = this.findById(id);
        if (!pet) return null;
        Object.assign(pet, data);
        return pet;
    }
}

export function resetPets(seed = []) {
    pets.splice(0, pets.length, ...seed.map(pet => new Pet(pet)));
}
