//@ts-nocheck
import { EntityNotFound } from "../../../../entity/errors/entity-not-found";
import { AuctionRepository } from "../../../contracts/auction-contract";

type Input = {
  licensePlate: string;
};

type Output = {
  bids: number;
  bidders: Array<{ name: string; lastname: string }>;
};

export class ListVehicleBids {
  constructor(private readonly auctionRepository: AuctionRepository) {}

  async execute(input: Input): Promise<Output> {
    const auction = await this.auctionRepository.listVehicleBids(
      input.licensePlate
    );

    if (!auction) {
      throw new EntityNotFound("Auction not found to submit a bid", 404);
    }

    return {
      bids: auction.bid,
      bidders: auction.bidders!,
    };
  }
}
