import { describe, expect, test } from "vitest";
import { Car } from "./";

describe("Car Entity", () => {
  test("Should create a car", () => {
    const car = new Car("Sedan", "ABC1234", "honda civic", "honda", 23000);
    expect(car).toBeInstanceOf(Car);
  });
});
