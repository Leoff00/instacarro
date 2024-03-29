import { Auction } from "../../../../entity/Auction";
import { DomainError } from "../../../../entity/errors/domain-error";
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

    const auction = new Auction(
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

    await this.auctionRepository.create(auction);
  }
}
