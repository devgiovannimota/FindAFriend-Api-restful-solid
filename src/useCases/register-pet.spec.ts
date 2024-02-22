import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterPetUseCase } from "./register-pet";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";

let orgRepository: InMemoryOrgsRepository;
let petRepository: InMemoryPetsRepository;
let registerPetsUseCase: RegisterPetUseCase;

describe("Register Pet Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository();
    petRepository = new InMemoryPetsRepository();
    registerPetsUseCase = new RegisterPetUseCase(petRepository, orgRepository);
  });
  it("Should be able to register a pet", async () => {
    const organizantion = await orgRepository.create({
      addres: "rua ingas",
      email: "puro talento",
      name: "lalaa",
      whatsapp: "93929329",
    });

    const { pet } = await registerPetsUseCase.execute({
      name: "Eve",
      age: "5 years",
      breed: undefined,
      characteristics: {
        color: "black",
        height: 5,
        weight: 3,
      },
      cityId: "cidadade-01",
      description: "Gotosa dms",
      orgId: organizantion.id,
      sex: "female",
      species: "dog",
    });
    console.log(pet);
    console.log(pet.characteristics);
    expect(pet.id).toEqual(expect.any(String));
  });
});
