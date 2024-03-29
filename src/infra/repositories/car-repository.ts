import { Model } from "mongoose";
import { AuctionRepository } from "../../app/contracts/auction-contract";
import { CarInterfaceDoc, CarModel } from "../../shared/mongoose/car-schema";
import { Auction } from "../../entity/Auction";
import { CarRepository } from "../../app/contracts/car-contract";
import { Car } from "../../entity/Car";

export class MongoCarRepository extends CarRepository {
  readonly #repository: Model<CarInterfaceDoc> = CarModel;

  async create(c: Car): Promise<void> {
    await this.#repository.create(c);
  }
  async findByPlate(licensePlate: string): Promise<Car | null> {
    const found = await this.#repository.findOne({ licensePlate });

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
