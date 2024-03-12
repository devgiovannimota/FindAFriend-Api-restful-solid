import { PetsNotFound } from "@/useCases/errors/pets-not-found-error";
import { MakeGetPetByTheCharacteristicsUseCase } from "@/useCases/factories/make-get-pet-by-characteristics-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetByCharacteristics(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getPetQuerySchema = z.object({
    characteristics: z.string(),
  });

  const { characteristics } = getPetQuerySchema.parse(request.query);

  try {
    const getPetByCharacteristics = MakeGetPetByTheCharacteristicsUseCase();

    const { pets } = await getPetByCharacteristics.execute({ characteristics });
    return reply.status(200).send(pets);
  } catch (er) {
    if (er instanceof PetsNotFound) {
      return reply.status(409).send({ message: er.message });
    }
  }
}
