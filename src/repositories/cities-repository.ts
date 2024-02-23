import { City, Prisma } from "@prisma/client";

export interface ICitiesRepository {
  create(data: Prisma.CityCreateInput): Promise<City>;
}
