import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateOrg } from "@/utils/create-and-authenticate-org";

describe("Get pet by city use case", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to search pet by city", async () => {
    const { token, id } = await createAndAuthenticateOrg(app);

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
      .get("/search/pet")
      .set("Authorization", `Bearer ${token}`)
      .query({
        city: "Americana",
      });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Yummi",
        }),
      ])
    );
  });
});
