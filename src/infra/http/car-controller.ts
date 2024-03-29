import { Request, Response } from "express";
import { CreateCar } from "../../app/usecases/Car/create-car";
import { CreateCarBody } from "../validations";
import { carContainer } from "../container/car-container";

export class CarController {
  async createCarRoute(request: Request, response: Response) {
    const body = request.body as CreateCarBody;
    const createCarUseCase = carContainer.resolve<CreateCar>("CreateCar");
    await createCarUseCase.execute(body);

    return response
      .status(201)
      .json({ statusCode: 201, message: "Car registered" });
  }
}
