import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateOrg } from "@/utils/create-and-authenticate-org";

describe("Get pet by characteristics e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able to get pet by characteristics", async () => {
    const { token, id } = await createAndAuthenticateOrg(app, true);
    console.log(token);

    await request(app.server)
      .post("/register/pet")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Yummi",
        age: "2 years",
        breed: "undefined",
        characteristics: {
          color: "rajada",
          height: 5,
          weight: 3,
        },
        description: "Gotosa dms",
        orgId: id,
        sex: "female",
        species: "cat",
      });

    const response = await request(app.server)
      .get("/characteristics/pet")
      .set("Authorization", `Bearer ${token}`)
      .query({
        characteristics: "rajada",
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Yummi",
        }),
      ])
    );
  });
});
