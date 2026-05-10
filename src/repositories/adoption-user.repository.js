const users = [];

export class AdoptionUserRepository {
    findById(id) {
        return users.find(user => user.id === id);
    }

    update(id, data) {
        const user = this.findById(id);
        if (!user) return null;
        Object.assign(user, data);
        return user;
    }
}

export function resetAdoptionUsers(seed = []) {
    users.splice(0, users.length, ...seed.map(user => ({
        pets: [],
        ...user,
        pets: Array.isArray(user.pets) ? [...user.pets] : []
    })));
}
