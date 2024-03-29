import { Car } from "../../../../entity/Car";
import { InvalidCarPlate } from "../../../../entity/errors/invalid-car-plate";
import { CarRepository } from "../../../contracts/car-contract";

type Input = {
  model: string;
  licensePlate: string;
  name: string;
  manufacture: string;
  price: number;
};

type Output = void;

export class CreateCar {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(input: Input): Promise<Output> {
    const car = new Car(
      input.model,
      input.licensePlate,
      input.name,
      input.manufacture,
      input.price
    );

    if (car.validateLicensePlate())
      throw new InvalidCarPlate("Invalid car plate format", 422);

    await this.carRepository.create(car);
  }
}
