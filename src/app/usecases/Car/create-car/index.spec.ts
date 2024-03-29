import { describe, expect, test } from "vitest";
import { makeCar } from "../../../../tests/factories";

describe("CreateCar [UseCase]", () => {
  test("Should create a car with VALID car plate", () => {
    const c = makeCar({ licensePlate: "ABC1234" });
    const validPlate = c.availableCarPlate();
    expect(validPlate).toBe(true);
  });

  test("Should create a car with INVALID car plate", () => {
    const c = makeCar({ licensePlate: "KWY1234" });
    const invalidPlate = c.availableCarPlate();
    expect(invalidPlate).toBe(true);
  });
});
