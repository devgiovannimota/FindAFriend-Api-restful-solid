import { OrgAlreadyExistsError } from "@/errors/org-already-exists-error";
import { makeRegisterOrgUseCase } from "@/useCases/factories/make-register-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerOrg(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerOrgSchema = z.object({
    name: z.string(),
    addres: z.string(),
    whatsapp: z.string(),
    city: z.string(),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
    password: z.string().min(6),
    state: z.string(),
    email: z.string().email(),
  });
  const {
    name,
    addres,
    whatsapp,
    city,
    state,
    email,
    latitude,
    longitude,
    password,
  } = registerOrgSchema.parse(request.body);
  try {
    const registerOrgUseCase = makeRegisterOrgUseCase();
    await registerOrgUseCase.execute({
      name,
      addres,
      city,
      email,
      latitude,
      longitude,
      password,
      state,
      whatsapp,
    });
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(400).send({
        message: error.message,
      });
    }
  }
  return reply.status(201).send();
}
