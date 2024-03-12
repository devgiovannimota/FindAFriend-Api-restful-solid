import fastify from "fastify";
import { ZodError } from "zod";
import { orgRoutes } from "./http/controllers/orgs/org.routes";
import { petRoutes } from "./http/controllers/pets/pet.routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(orgRoutes);
app.register(petRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }
  return reply.status(500).send({ message: "internal server error." });
});
