import { Prisma } from "@prisma/client";
import { IPetsRepository } from "../pets-repository";
import { prisma } from "@/lib";

export class PrismaPetsRepository implements IPetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id: id,
      },
    });
    return pet;
  }
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });
    return pet;
  }
}
