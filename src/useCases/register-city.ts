import { ICitiesRepository } from "@/repositories/cities-repository";
import { City } from "@prisma/client";

interface IRegisterCityUseCaseRequest {
  name: string;
  state: string;
}

interface IRegisterCityUseCaseResponse {
  city: City;
}

export class RegisterCityUseCase {
  constructor(private citiesRepository: ICitiesRepository) {}
  async execute({
    name,
    state,
  }: IRegisterCityUseCaseRequest): Promise<IRegisterCityUseCaseResponse> {
    const city = await this.citiesRepository.create({
      name,
      state,
    });
    return { city };
  }
}
