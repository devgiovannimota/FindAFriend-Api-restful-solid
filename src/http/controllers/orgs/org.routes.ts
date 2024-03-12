import { FastifyInstance } from "fastify";
import { registerOrg } from "./register-org";
import { authenticate } from "./authenticate";

export async function orgRoutes(app: FastifyInstance) {
  app.post("/register/org", registerOrg);
  app.post("/org/authenticate", authenticate);
}
