import { Car } from "../../entity/Car";

export abstract class CarRepository {
  abstract create(c: Car): Promise<void>;
  abstract findByPlate(licensePlate: string): Promise<Car | null>;
}
