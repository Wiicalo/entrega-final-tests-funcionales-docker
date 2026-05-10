export class Pet {
    constructor({ id, name, specie = 'dog', adopted = false, owner = null }) {
        this.id = id;
        this.name = name;
        this.specie = specie;
        this.adopted = adopted;
        this.owner = owner;
    }
}
