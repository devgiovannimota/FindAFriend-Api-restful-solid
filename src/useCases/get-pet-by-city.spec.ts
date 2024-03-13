import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetPetsByCityUseCase } from "./get-pet-by-city";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { PetsNotFound } from "./errors/pets-not-found-error";
import { CityNotFoundError } from "./errors/city-not-found-error";

let petRepository: InMemoryPetsRepository;
let getpetbyCityUseCase: GetPetsByCityUseCase;
let orgRepository: InMemoryOrgsRepository;

describe("get pet by city use case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository();
    petRepository = new InMemoryPetsRepository(orgRepository);
    getpetbyCityUseCase = new GetPetsByCityUseCase(petRepository);
  });

  it("Should be able to get a pet by city", async () => {
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

    const org2 = await orgRepository.create({
      addres: "Rua ingás",
      email: "Giovanni Mota de Oliveira",
      name: "Anjos da guarda",
      state: "SP",
      city: "Santa barbara",
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
      name: "yummi",
      age: "5 years",
      breed: "undefined",
      characteristics: {
        color: "black",
        height: 5,
        weight: 3,
      },
      description: "Gotosa dms",
      orgId: org2.id,
      sex: "female",
      species: "cat",
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

    const pets = await getpetbyCityUseCase.execute({ city: org2.city });
    expect(pets.pets).toHaveLength(1);
    expect(pets.pets).toEqual([expect.objectContaining({ name: "yummi" })]);
  });

  it("Should not be able to search for cities with no registered pets", async () => {
    await expect(() =>
      getpetbyCityUseCase.execute({ city: "americana" })
    ).rejects.toBeInstanceOf(PetsNotFound);
  });

  it("Should not be able to search with no city mentioned", async () => {
    await expect(() =>
      getpetbyCityUseCase.execute({ city: "" })
    ).rejects.toBeInstanceOf(CityNotFoundError);
  });
});
