import { IPetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

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
    return { pets };
  }
}
