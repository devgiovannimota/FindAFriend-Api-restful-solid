import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { RegisterPetUseCase } from "../register-pet";

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const orgRepository = new PrismaOrgsRepository();
  const registerPetUseCase = new RegisterPetUseCase(
    petsRepository,
    orgRepository
  );
  return registerPetUseCase;
}
