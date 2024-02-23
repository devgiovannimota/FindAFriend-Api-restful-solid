import { OrgNotFoundError } from "@/errors/org-not-found-error";
import { makeRegisterPetUseCase } from "@/useCases/factories/make-register-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const petSchema = z.object({
    name: z.string(),
    species: z.string(),
    breed: z.string().optional(),
    age: z.string(),
    sex: z.enum(["male", "female"]),
    characteristics: z.object({
      color: z.string(),
      height: z.coerce.number(),
      weight: z.coerce.number(),
    }),
    description: z.string(),
    orgId: z.string(),
  });

  const {
    name,
    species,
    breed,
    age,
    sex,
    characteristics,
    description,
    orgId,
  } = petSchema.parse(request.body);

  try {
    const registerPetUseCase = makeRegisterPetUseCase();
    await registerPetUseCase.execute({
      name,
      species,
      breed,
      age,
      sex,
      characteristics,
      description,
      orgId,
    });
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      reply.status(400).send({ message: error.message });
    }
  }
  reply.status(201).send();
}
