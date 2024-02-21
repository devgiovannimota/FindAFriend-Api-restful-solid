import { InMemoryCitiesRepository } from "@/repositories/in-memory/in-memory-cities-repository";
import { RegisterCityUseCase } from "./register-city";
import { beforeEach, describe, expect, it } from "vitest";

let citiesRepository: InMemoryCitiesRepository;
let registerCityUseCase: RegisterCityUseCase;

describe("Register City Use Case", () => {
  beforeEach(() => {
    citiesRepository = new InMemoryCitiesRepository();
    registerCityUseCase = new RegisterCityUseCase(citiesRepository);
  });
  it("Should be able to create a city", async () => {
    const { city } = await registerCityUseCase.execute({
      name: "Americana",
      state: "São Paulo",
    });

    expect(city.id).toEqual(expect.any(String));
  });
});
