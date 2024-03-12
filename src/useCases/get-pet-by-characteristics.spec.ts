import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { GetPetByCharacteristicsUseCase } from "./get-pet-by-characteristics";

let petRepository: InMemoryPetsRepository;
let getPetByCharacteristics: GetPetByCharacteristicsUseCase;
let orgRepository: InMemoryOrgsRepository;

describe("Get pet by characteristics Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository();
    petRepository = new InMemoryPetsRepository(orgRepository);
    getPetByCharacteristics = new GetPetByCharacteristicsUseCase(petRepository);
  });

  it("Should be able to get a pet by characteristics", async () => {
    const org = await orgRepository.create({
      addres: "Rua ingás",
      email: "Giovanni Mota de Oliveira",
      name: "Anjos da guarda",
      state: "SP",
      city: "Americana",
      password: "123456",
      latitude: 45.3232,
      longitude: 43.3232,
      whatsapp: "19 98921-8480",
    });

    await petRepository.create({
      name: "Eve",
      age: "5 years",
      breed: "undefined",
      characteristics: {
        color: "black",
        height: 5,
        weight: 3,
      },
      description: "Gotosa dms",
      orgId: org.id,
      sex: "female",
      species: "dog",
    });

    await petRepository.create({
      name: "Evo",
      age: "5 years",
      breed: "undefined",
      characteristics: {
        color: "black",
        height: 5,
        weight: 3,
      },
      description: "Gotoso dms",
      orgId: org.id,
      sex: "male",
      species: "dog",
    });

    await petRepository.create({
      name: "Eve",
      age: "5 years",
      breed: "undefined",
      characteristics: {
        color: "rajada",
        height: 5,
        weight: 3,
      },
      description: "Gotosa dms",
      orgId: org.id,
      sex: "female",
      species: "cat",
    });

    await petRepository.create({
      name: "Yummi",
      age: "2 years",
      breed: "undefined",
      characteristics: {
        color: "rajada",
        height: 5,
        weight: 3,
      },
      description: "Gotosa dms",
      orgId: org.id,
      sex: "female",
      species: "cat",
    });

    const pets = await getPetByCharacteristics.execute({
      characteristics: "rajada",
    });

    expect(pets.pets).toHaveLength(2);
    expect(pets.pets).toEqual(
      expect.arrayContaining([expect.any(Object), expect.any(Object)])
    );
  });
});
