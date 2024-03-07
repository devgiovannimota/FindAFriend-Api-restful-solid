import { FastifyInstance } from "fastify";

import { registerPet } from "./register-pet";
import { getPetByCity } from "./get-pet-by-city";

export async function petRoutes(app: FastifyInstance) {
  app.post("/register/pet", registerPet);
  app.get("/search/pet", getPetByCity);
}
