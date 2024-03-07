import { IPetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface GetPetByCharacteristicsUseCaseRequest {
  characteristics: string;
}

interface GetPetByCharacteristicsUseCaseResponse {
  pets: Pet[];
}

export class GetPetByCharacteristicsUseCase {
  constructor(private petsRepository: IPetsRepository) {}
  async execute({
    characteristics,
  }: GetPetByCharacteristicsUseCaseRequest): Promise<GetPetByCharacteristicsUseCaseResponse> {
    const pets = await this.petsRepository.getPetsByCharacteristics(
      characteristics
    );

    return { pets };
  }
}
