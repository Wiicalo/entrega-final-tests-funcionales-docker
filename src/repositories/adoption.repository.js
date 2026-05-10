import { randomUUID } from 'crypto';
import { Adoption } from '../models/adoption.model.js';

const adoptions = [];
const failures = {
    findAll: false,
    findById: false,
    create: false
};

function throwIfRequested(operation) {
    if (!failures[operation]) return;
    failures[operation] = false;
    throw new Error(`Adoption repository ${operation} error`);
}

export class AdoptionRepository {
    findAll() {
        throwIfRequested('findAll');
        return adoptions;
    }

    findById(id) {
        throwIfRequested('findById');
        return adoptions.find(adoption => adoption.id === id);
    }

    create({ owner, pet }) {
        throwIfRequested('create');
        const adoption = new Adoption({
            id: randomUUID(),
            owner,
            pet
        });
        adoptions.push(adoption);
        return adoption;
    }
}

export function resetAdoptions(seed = []) {
    adoptions.splice(0, adoptions.length, ...seed.map(adoption => new Adoption(adoption)));
    failures.findAll = false;
    failures.findById = false;
    failures.create = false;
}

export function failNextAdoptionRepositoryCall(operation) {
    failures[operation] = true;
}
