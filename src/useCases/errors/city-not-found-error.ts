export class CityNotFoundError extends Error {
  constructor() {
    super("City not provided or invalid");
  }
}
