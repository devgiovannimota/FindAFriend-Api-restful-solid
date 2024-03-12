import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateOrg } from "@/utils/create-and-authenticate-org";

describe("Authenticate e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able to refresh token", async () => {
    const { token, id, cookies } = await createAndAuthenticateOrg(app, true);

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
