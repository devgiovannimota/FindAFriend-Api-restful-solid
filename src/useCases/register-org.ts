import { OrgAlreadyExistsError } from "@/errors/org-already-exists-error";
import { IOrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  addres: string;
  name: string;
  city: string;
  state: string;
  password: string;
  latitude: number;
  longitude: number;
  whatsapp: string;
  email: string;
}
interface RegisterUseCaseResponse {
  org: Org;
}

export class RegisterOrgUseCase {
  constructor(private orgRepository: IOrgsRepository) {}
  async execute({
    addres,
    name,
    city,
    password,
    latitude,
    longitude,
    state,
    email,
    whatsapp,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const orgAlreadyExists = await this.orgRepository.findByEmail(email);

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const org = await this.orgRepository.create({
      addres,
      email,
      latitude,
      longitude,
      password: passwordHash,
      name,
      city,
      state,
      whatsapp,
    });

    return { org };
  }
}
