import { City, Prisma } from "@prisma/client";
import { ICitiesRepository } from "../prisma/cities-repository";
import { randomUUID } from "crypto";

export class InMemoryCitiesRepository implements ICitiesRepository {
  public cities: City[] = [];
  async create(data: Prisma.CityCreateInput) {
    const city = {
      id: randomUUID(),
      name: "Americana",
      state: "São Paulo",
    };
    this.cities.push(city);
    return city;
  }
}
