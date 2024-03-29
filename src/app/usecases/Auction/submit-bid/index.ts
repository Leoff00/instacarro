import { EntityNotFound } from "../../../../entity/errors/entity-not-found";
import { LessThanMinOffer } from "../../../../entity/errors/less-than-min-offer";
import { OutOfDate } from "../../../../entity/errors/out-of-date";
import { AuctionRepository } from "../../../contracts/auction-contract";
import { CarRepository } from "../../../contracts/car-contract";
import { UserRepository } from "../../../contracts/user-contract";

type Bidder = { name: string; lastname: string; offer: number; email: string };

type Input = {
  bidder: Bidder;
  licensePlate: string;
};

type Output = {
  bid: number;
};

export class SubmitBid {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly carRepository: CarRepository,
    private readonly auctionRepository: AuctionRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const MIN_OFFER = 200;

    if (input.bidder.offer < MIN_OFFER) {
      throw new LessThanMinOffer(
        `Can't submit an offer less than ${MIN_OFFER}`,
        422
      );
    }

    const user = await this.userRepository.findByEmail(input.bidder.email);
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

    if (!auction) {
      throw new EntityNotFound("Auction not found to submit a bid", 404);
    }

    if (auction.hasReachedDeadline()) {
      throw new OutOfDate(
        "Can't submit a bid because this auction is out of date",
        422
      );
    }

    const bid = (await this.auctionRepository.submitBid(
      input.bidder,
      input.licensePlate
    )) as number;

    return {
      bid,
    };
  }
}
