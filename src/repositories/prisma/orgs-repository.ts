import { Org, Prisma } from "@prisma/client";

export interface IOrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>;
  findByEmail(id: string): Promise<Org | null>;
}
