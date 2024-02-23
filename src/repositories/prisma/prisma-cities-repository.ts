import { Prisma } from "@prisma/client";
import { ICitiesRepository } from "../cities-repository";
import { prisma } from "@/lib";

export class PrismaCitiesRepository implements ICitiesRepository {
  async create(data: Prisma.CityCreateInput) {
    const user = await prisma.city.create({
      data,
    });
    return user;
  }
}
