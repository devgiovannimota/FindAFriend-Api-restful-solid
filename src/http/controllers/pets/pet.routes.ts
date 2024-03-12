import { FastifyInstance } from "fastify";

import { registerPet } from "./register-pet";
import { getPetByCity } from "./get-pet-by-city";
import { verifyJwt } from "../middlewares/verify-jwt";
import { getPetByCharacteristics } from "./get-pet-by-characteristics";
import { verifyUserRole } from "../middlewares/verify-user-role";

export async function petRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);
  app.post(
    "/register/pet",
    { onRequest: [verifyUserRole("ADMIN")] },
    registerPet
  );

  app.get("/search/pet", getPetByCity);
  app.get("/characteristics/pet", getPetByCharacteristics);
}
