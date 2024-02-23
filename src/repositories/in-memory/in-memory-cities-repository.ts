import { City, Prisma } from "@prisma/client";
import { ICitiesRepository } from "../cities-repository";
import { randomUUID } from "crypto";

export class InMemoryCitiesRepository implements ICitiesRepository {
  public cities: City[] = [];
  async create(data: Prisma.CityCreateInput) {
    const city = {
      id: randomUUID(),
      name: data.name,
      state: data.state,
    };
    this.cities.push(city);
    return city;
  }
}
