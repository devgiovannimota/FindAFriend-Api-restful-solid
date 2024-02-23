import { OrgAlreadyExistsError } from "@/errors/org-already-exists-error";
import { IOrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";

interface RegisterUseCaseRequest {
  addres: string;
  name: string;
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
    email,
    whatsapp,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const orgAlreadyExists = await this.orgRepository.findByEmail(email);
    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError();
    }
    const org = await this.orgRepository.create({
      addres,
      email,
      name,
      whatsapp,
    });
    return { org };
  }
}
