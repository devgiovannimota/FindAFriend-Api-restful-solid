import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { GetPetUseCase } from "./get-pet";
import { PetsNotFound } from "./errors/pets-not-found-error";

let petRepository: InMemoryPetsRepository;
let getPetUseCase: GetPetUseCase;
let orgRepository: InMemoryOrgsRepository;

describe("Get Pet Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository();
    petRepository = new InMemoryPetsRepository(orgRepository);
    getPetUseCase = new GetPetUseCase(petRepository);
  });

  it("Should be able to get a pet", async () => {
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

    const pet = await petRepository.create({
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

    const petSearched = await getPetUseCase.execute({ id: pet.id });
    expect(petSearched.pet?.id).toEqual(expect.any(String));
  });
  it("Should not be able to search with wrong ID", async () => {
    await expect(() =>
      getPetUseCase.execute({ id: "lala" })
    ).rejects.toBeInstanceOf(PetsNotFound);
  });
});
