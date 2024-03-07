import { Pet, Prisma } from "@prisma/client";
import { IPetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";
import { JsonValue } from "@prisma/client/runtime/library";
import { InMemoryOrgsRepository } from "./in-memory-orgs-repository";

export class InMemoryPetsRepository implements IPetsRepository {
  public pets: Pet[] = [];
  constructor(private orgRepository: InMemoryOrgsRepository) {}
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      species: data.species,
      breed: data.breed !== undefined ? data.breed : "Undefined breed", // Verifica se breed é undefined
      age: data.age,
      sex: data.sex,
      characteristics: data.characteristics as JsonValue,
      description: data.description,
      orgId: data.orgId,
    };
    this.pets.push(pet);
    return pet;
  }
  async findById(id: string) {
    const pet = this.pets.find((item) => item.id === id);
    if (!pet) {
      return null;
    }
    return pet;
  }
  async findAll(city: string) {
    const allPets: Pet[] = [];

    const orgsByCities = this.orgRepository.orgs.filter(
      (item) => item.city === city
    );

    orgsByCities.forEach((org) => {
      const petsInOrg = this.pets.filter((pet) => pet.orgId === org.id);
      allPets.push(...petsInOrg);
    });

    if (allPets.length === 0) {
      return null;
    }
    return allPets;
  }
  async getPetsByCharacteristics(characteristics: string) {
    const pets = this.pets.filter((pets) => {
      const petCharacteristics = JSON.stringify(pets.characteristics);
      return petCharacteristics.includes(characteristics);
    });
    return pets;
  }
}
