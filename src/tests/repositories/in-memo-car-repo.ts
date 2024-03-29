import { CarRepository } from "../../app/contracts/car-contract";
import { Car } from "../../entity/Car";

export class InMemoCarRepo implements CarRepository {
  private cars: Array<Car> = [];

  get car() {
    return this.cars;
  }
  async create(c: Car): Promise<void> {
    await this.car.push(c);
  }
  async findByPlate(licensePlate: string): Promise<Car> {
    const found = await this.cars.find(
      (car) => car.licensePlate === licensePlate
    );
    return found;
  }
}
