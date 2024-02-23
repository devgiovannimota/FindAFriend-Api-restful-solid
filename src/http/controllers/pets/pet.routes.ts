import { FastifyInstance } from "fastify";

import { registerPet } from "./register-pet";

export async function petRoutes(app: FastifyInstance) {
  app.post("/register/pet", registerPet);
}
