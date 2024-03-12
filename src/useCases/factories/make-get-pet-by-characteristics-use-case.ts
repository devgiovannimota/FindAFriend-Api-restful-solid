import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetByCharacteristicsUseCase } from "../get-pet-by-characteristics";

export function MakeGetPetByTheCharacteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const getPetByCharacteristicsUseCase = new GetPetByCharacteristicsUseCase(
    petsRepository
  );
  return getPetByCharacteristicsUseCase;
}
