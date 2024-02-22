import { Pet, Prisma } from "@prisma/client";
import { IPetsRepository } from "../prisma/pets-repository";
import { randomUUID } from "crypto";
import { JsonValue } from "@prisma/client/runtime/library";

export class InMemoryPetsRepository implements IPetsRepository {
  public pets: Pet[] = [];
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
      cityId: data.cityId,
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
}
