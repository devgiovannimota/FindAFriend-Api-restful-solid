import { IPetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { PetsNotFound } from "./errors/pets-not-found-error";

interface GetPetUseCaseRequest {
  id: string;
}

interface GetPetUseCaseResponse {
  pet: Pet;
}

export class GetPetUseCase {
  constructor(private orgRepository: IPetsRepository) {}
  async execute({ id }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.orgRepository.findById(id);
    if (!pet) {
      throw new PetsNotFound();
    }
    return { pet };
  }
}
