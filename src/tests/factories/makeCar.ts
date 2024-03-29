import { Car } from "../../entity/Car";

export function makeCar(opts: Partial<Car> = {}): Car {
  return new Car(
    opts.carModel || "sedan",
    opts.licensePlate || "ABC1234",
    opts.name || "Honda Civic",
    opts.manufacture || "Honda",
    opts.price || 20000
  );
}
