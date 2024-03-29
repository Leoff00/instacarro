import { Auction } from "../../../../entity/Auction";
import { AuctionAlreadyExist } from "../../../../entity/errors/auction-already-exist";
import { DomainError } from "../../../../entity/errors/domain-error";
import { EntityNotFound } from "../../../../entity/errors/entity-not-found";
import { AuctionRepository } from "../../../contracts/auction-contract";
import { CarRepository } from "../../../contracts/car-contract";
import { UserRepository } from "../../../contracts/user-contract";

type Input = {
  email: string;
  licensePlate: string;
  maxOffer: number;
  minOffer: number;
  startDate: Date;
  endDate: Date;
};
type Output = void;

export class CreateAuction {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly carRepository: CarRepository,
    private readonly auctionRepository: AuctionRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.findByEmail(input.email);
    const car = await this.carRepository.findByPlate(input.licensePlate);
    const auction = await this.auctionRepository.findByPlate(
      input.licensePlate
    );

    if (!user) {
      throw new EntityNotFound("User not found", 404);
    }

    if (!car) {
      throw new EntityNotFound("Car not found", 404);
    }

    if (auction) {
      throw new AuctionAlreadyExist(
        "Already there is an auction with this car plate.",
        422
      );
    }

    const entity = new Auction(
      0,
      input.minOffer,
      input.maxOffer,
      car!,
      user!,
      input.startDate,
      input.endDate
    );

    if (input.startDate > input.endDate) {
      throw new DomainError(
        "The start date of the bid can't be equal the end date.",
        422
      );
    }

    await this.auctionRepository.create(entity);
  }
}
