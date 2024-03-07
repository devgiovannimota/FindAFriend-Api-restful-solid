import { IPetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { PetsNotFound } from "./errors/pets-not-found-error";

interface GetPetsByCityUseCaseRequest {
  city: string;
}

interface GetPetsByCityUseCaseResponse {
  pets: Pet[];
}

export class GetPetsByCityUseCase {
  constructor(private orgRepository: IPetsRepository) {}
  async execute({
    city,
  }: GetPetsByCityUseCaseRequest): Promise<GetPetsByCityUseCaseResponse> {
    const pets = await this.orgRepository.findAll(city);
    if (pets === null || pets.length === 0) {
      throw new PetsNotFound();
    }
    return { pets };
  }
}
