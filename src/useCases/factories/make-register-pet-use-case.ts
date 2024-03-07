import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { RegisterPetUseCase } from "../register-pet";

export function makeRegisterPetUseCase() {
  const orgRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository();
  const registerPetUseCase = new RegisterPetUseCase(
    petsRepository,
    orgRepository
  );
  return registerPetUseCase;
}
