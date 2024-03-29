import { Car } from "../../entity/Car";

export abstract class CarRepository {
  abstract create(car: Car): Promise<void>;
  abstract findByPlate(licensePlate: string): Promise<Car | null>;
}
