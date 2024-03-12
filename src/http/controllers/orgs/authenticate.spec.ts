import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { hash } from "bcryptjs";

describe("Authenticate e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able to authenticate org", async () => {
    await request(app.server).post("/register/org").send({
      addres: "Rua ingás",
      email: "giovaniname@hotmail.com",
      name: "Anjos da guarda",
      state: "SP",
      city: "Americana",
      password: "123456",
      latitude: 45.3232,
      longitude: 43.3232,
      whatsapp: "19 98921-8480",
    });

    const response = await request(app.server).post("/org/authenticate").send({
      email: "giovaniname@hotmail.com",
      password: "123456",
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
