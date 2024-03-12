import { FastifyInstance } from "fastify";

import { registerPet } from "./register-pet";
import { getPetByCity } from "./get-pet-by-city";
import { verifyJwt } from "../middlewares/verify-jwt";
import { getPetByCharacteristics } from "./get-pet-by-characteristics";

export async function petRoutes(app: FastifyInstance) {
  app.post("/register/pet", { onRequest: [verifyJwt] }, registerPet);

  app.get("/search/pet", { onRequest: [verifyJwt] }, getPetByCity);
  app.get(
    "/characteristics/pet",
    { onRequest: [verifyJwt] },
    getPetByCharacteristics
  );
}
