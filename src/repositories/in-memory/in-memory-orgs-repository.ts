import { Org, Prisma } from "@prisma/client";
import { IOrgsRepository } from "../orgs-repository";
import { randomUUID } from "crypto";

export class InMemoryOrgsRepository implements IOrgsRepository {
  public orgs: Org[] = [];
  async create(data: Prisma.OrgCreateInput) {
    const organization = {
      id: randomUUID(),
      name: data.name,
      addres: data.addres,
      whatsapp: data.whatsapp,
      email: data.email,
    };
    this.orgs.push(organization);
    return organization;
  }
  async findByEmail(email: string): Promise<Org | null> {
    const organization = this.orgs.find((item) => item.email === email);
    if (!organization) {
      return null;
    }
    return organization;
  }
  async findById(id: string) {
    const organization = this.orgs.find((item) => item.id === id);
    if (!organization) {
      return null;
    }
    return organization;
  }
}
