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
  async findAll(city: string) {
    const orgsWithPets = await prisma.org.findMany({
      where: {
        city: city,
      },
      include: {
        pets: true,
      },
    });

    const pets = orgsWithPets.map((org) => org.pets).flat();

    if (pets.length === 0) {
      return null;
    }

    return pets;
  }
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data });
    return pet;
  }
  async getPetsByCharacteristics(characteristics: string) {
    const pets = await prisma.pet.findMany();
    const filteredPets = pets.filter((pet) => {
      const characteristicsString = JSON.stringify(pet.characteristics);
      return characteristicsString.includes(characteristics);
    });
    return filteredPets;
  }
}
