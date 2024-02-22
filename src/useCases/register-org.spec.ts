import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterOrgUseCase } from "./register-org";
import { OrgAlreadyExistsError } from "@/errors/org-already-exists-error";

let orgRepository: InMemoryOrgsRepository;
let registerOrgUseCase: RegisterOrgUseCase;

describe("Register Orgs Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository();
    registerOrgUseCase = new RegisterOrgUseCase(orgRepository);
  });

  it("Should be able to register a organization", async () => {
    const { org } = await registerOrgUseCase.execute({
      addres: "Rua ingás",
      email: "Giovanni Mota de Oliveira",
      name: "Anjos da guarda",
      whatsapp: "19 98921-8480",
    });
    expect(org.id).toEqual(expect.any(String));
  });

  it("Should not be able to register a organization with an email that already exits", async () => {
    await registerOrgUseCase.execute({
      addres: "Rua ingás",
      email: "giovaniname@hotmail.com",
      name: "Anjos da guarda",
      whatsapp: "19 98921-8480",
    });
    await expect(() =>
      registerOrgUseCase.execute({
        addres: "Rua ingás",
        email: "giovaniname@hotmail.com",
        name: "Anjos da guarda",
        whatsapp: "19 98921-8480",
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
