import { CreateCar } from "../../app/usecases/Car/create-car";
import { MongoCarRepository } from "../repositories/car-repository";
import { Container } from "./injection";

const carContainer = new Container();
const carRepository = new MongoCarRepository();
carContainer.register<CreateCar>("CreateCar", new CreateCar(carRepository));

export { carContainer };
