import { Prisma } from "@prisma/client";
import { IOrgsRepository } from "../orgs-repository";
import { prisma } from "@/lib";

export class PrismaOrgsRepository implements IOrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });
    return org;
  }
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email: email,
      },
    });
    return org;
  }
  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id: id,
      },
    });
    return org;
  }
}
