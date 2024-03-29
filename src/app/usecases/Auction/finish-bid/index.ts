import { AuctionRepository } from "../../../contracts/auction-contract";

type Input = {
  email: string;
  licensePlate: string;
};

type Output = any;

export class FinishBid {
  constructor(private readonly auctionRepository: AuctionRepository) {}

  async execute(input: Input) {
    const auction = await this.auctionRepository.listVehicleBids(
      input.licensePlate
    );

    if (auction.hasFinishedAuction()) {
    }
  }
}
