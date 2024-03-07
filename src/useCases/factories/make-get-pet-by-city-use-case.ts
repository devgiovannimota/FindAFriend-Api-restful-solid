import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetsByCityUseCase } from "../get-pet-by-city";

export function makeGetPetByCityUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const getPetByCityUseCase = new GetPetsByCityUseCase(petsRepository);
  return getPetByCityUseCase;
}
