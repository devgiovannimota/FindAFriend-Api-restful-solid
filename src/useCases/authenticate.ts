import { IOrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalide-credentials-error";

interface AuthenticateRequest {
  email: string;
  password: string;
}

interface AuthenticateResponse {
  org: Org;
}

export class AuthenticateUseCase {
  constructor(private orgRepository: IOrgsRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const org = await this.orgRepository.findByEmail(email);
    if (!org) {
      throw new InvalidCredentialsError();
    }
    const doesPasswordMatches = await compare(password, org.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      org,
    };
  }
}
