import { InvalidCredentialsError } from "@/useCases/errors/invalide-credentials-error";
import { makeAuthenticateUseCase } from "@/useCases/factories/make-authenticate-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    const { org } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {
        role: org.role,
      },
      {
        sign: {
          sub: org.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        role: org.role,
      },
      {
        sign: {
          sub: org.id,
          expiresIn: "7d",
        },
      }
    );
    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/token/refresh",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message });
    }
    throw error;
  }
}
