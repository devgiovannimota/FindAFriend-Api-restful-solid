import { FastifyInstance } from "fastify";
import { registerOrg } from "./register-org";

export async function orgRoutes(app: FastifyInstance) {
  app.post("/register/org", registerOrg);
}
