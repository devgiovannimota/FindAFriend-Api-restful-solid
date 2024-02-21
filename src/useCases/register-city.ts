interface IRegisterCityUseCaseRequest {
  name: string;
  state: string;
}

interface IRegisterCityUseCaseRequest

export class RegisterCityUseCase {
  async execute({}: IRegisterCityUseCaseRequest): Promise<> {}
}
