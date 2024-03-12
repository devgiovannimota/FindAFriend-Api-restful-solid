import { prisma } from "@/lib";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const org = await prisma.org.create({
    data: {
      id: randomUUID(),
      addres: "Rua ingás",
      email: "giovaniname@hotmail.com",
      name: "Anjos da guarda",
      state: "SP",
      city: "Americana",
      password: await hash("123456", 6),
      latitude: 45.3232,
      longitude: 43.3232,
      whatsapp: "19 98921-8480",
    },
  });

  const AuthResponse = await request(app.server)
    .post("/org/authenticate")
    .send({
      email: "giovaniname@hotmail.com",
      password: "123456",
    });
  const { token } = AuthResponse.body;
  const { id } = org;
  return { token, id };
}
