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
      role: data.role || "MEMBMER",
      whatsapp: data.whatsapp,
      city: data.city,
      state: data.state,
      email: data.email,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      password: data.password,
    };
    this.orgs.push(organization);
    return organization;
  }
  async findByEmail(email: string) {
    const organization = this.orgs.find((item) => item.email === email);
    if (!organization) {
      return null;
    }
    return organization;
  }
  async findById(id: string) {
    const org = this.orgs.find((item) => item.id === id);
    if (!org) {
      return null;
    }
    return org;
  }
}
