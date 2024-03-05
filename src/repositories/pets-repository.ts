import { Pet, Prisma } from "@prisma/client";

export interface IPetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findAll(city: string): Promise<Pet[]>;
}
