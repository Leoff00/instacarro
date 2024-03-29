import { Model } from "mongoose";
import { CarInterfaceDoc, CarModel } from "../../shared/mongoose/car-schema";
import { CarRepository } from "../../app/contracts/car-contract";
import { Car } from "../../entity/Car";

export class MongoCarRepository extends CarRepository {
  readonly #repository: Model<CarInterfaceDoc> = CarModel;

  async create(car: Car): Promise<void> {
    await this.#repository.create(car);
  }
  async findByPlate(licensePlate: string): Promise<Car | null> {
    const found = await this.#repository.findOne({
      licensePlate,
    });

    if (!found) return null;

    const map = new Car(
      found.carModel,
      found.licensePlate,
      found.name,
      found.manufacture,
      found.price
    );

    return map;
  }
}
