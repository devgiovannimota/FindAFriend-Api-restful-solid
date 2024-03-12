import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalide-credentials-error";

let orgRepository: InMemoryOrgsRepository;
let authenticateUseCase: AuthenticateUseCase;

describe("Authenticate use case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository();
    authenticateUseCase = new AuthenticateUseCase(orgRepository);
  });

  it("Should be able to authenticate", async () => {
    await orgRepository.create({
      addres: "Rua ingás",
      email: "giovaniname@hotmail.com",
      name: "Anjos da guarda",
      state: "SP",
      city: "Americana",
      password: await hash("123456", 6),
      latitude: 45.3232,
      longitude: 43.3232,
      whatsapp: "19 98921-8480",
    });

    const { org } = await authenticateUseCase.execute({
      email: "giovaniname@hotmail.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("Should not be able to authenticate with wrong email", async () => {
    await orgRepository.create({
      addres: "Rua ingás",
      email: "giovaniname@hotmail.com",
      name: "Anjos da guarda",
      state: "SP",
      city: "Americana",
      password: await hash("123456", 6),
      latitude: 45.3232,
      longitude: 43.3232,
      whatsapp: "19 98921-8480",
    });

    await expect(() =>
      authenticateUseCase.execute({
        email: "giovaninam@hotmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
