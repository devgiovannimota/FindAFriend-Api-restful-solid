import { CityNotFoundError } from "@/useCases/errors/city-not-found-error";
import { PetsNotFound } from "@/useCases/errors/pets-not-found-error";
import { makeGetPetByCityUseCase } from "@/useCases/factories/make-get-pet-by-city-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetByCity(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getPetQuerySchema = z.object({
    city: z.string(),
  });

  const { city } = getPetQuerySchema.parse(request.query);

  try {
    const getPetByCityUseCase = makeGetPetByCityUseCase();

    const { pets } = await getPetByCityUseCase.execute({ city });
    return reply.status(200).send(pets);
  } catch (er) {
    if (er instanceof PetsNotFound || er instanceof CityNotFoundError) {
      return reply.status(409).send({ message: er.message });
    }
  }
}
