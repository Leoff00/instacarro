import { CarRepository } from "../../app/contracts/car-contract";
import { Car } from "../../entity/Car";

export class InMemoCarRepo implements CarRepository {
  private cars: Array<Car> = [];

  get car() {
    return this.cars;
  }
  async create(car: Car): Promise<void> {
    await this.car.push(car);
  }
  async findByPlate(licensePlate: string): Promise<Car | null> {
    const found = await this.cars.find(
      (car) => car.licensePlate === licensePlate
    );
    if (!found) return null;
    return found;
  }
}
