import { OrgNotFoundError } from "@/errors/org-not-found-error";
import { IOrgsRepository } from "@/repositories/orgs-repository";
import { IPetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface PetCharacteristics {
  [key: string]: string | number;
  color: string;
  height: number;
  weight: number;
}

interface RegisterPetsUseCaseRequest {
  name: string;
  species: string;
  breed?: string;
  age: string;
  sex: string;
  characteristics: PetCharacteristics;
  description: string;
  orgId: string;
}

interface RegisterPetsUseCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(
    private petRepository: IPetsRepository,
    private orgRepository: IOrgsRepository
  ) {}
  async execute({
    name,
    species,
    breed,
    age,
    sex,
    characteristics,
    description,
    orgId,
  }: RegisterPetsUseCaseRequest): Promise<RegisterPetsUseCaseResponse> {
    const org = await this.orgRepository.findById(orgId);
    if (!org) {
      throw new OrgNotFoundError();
    }
    if (!breed?.trim()) {
      breed = "undefined breed";
    }
    const pet = await this.petRepository.create({
      name,
      species,
      breed,
      age,
      sex,
      characteristics,
      description,
      orgId,
    });

    return { pet };
  }
}
