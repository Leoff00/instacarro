//@ts-nocheck
import { EntityNotFound } from "../../../../entity/errors/entity-not-found";
import { AuctionRepository } from "../../../contracts/auction-contract";

type Input = {
  licensePlate: string;
};

type Output = {
  bids: number;
  bidders: Array<{ name: string; lastname: string }>;
  totalSum: number;
};

export class ListVehicleBids {
  constructor(private readonly auctionRepository: AuctionRepository) {}

  async execute(input: Input): Promise<Output> {
    const collection = await this.auctionRepository.listVehicleBids(
      input.licensePlate
    );

    if (!collection) {
      throw new EntityNotFound("Auction not found to submit a bid", 404);
    }

    const somatory = collection.auction.bidders.reduce(
      (acc, curr) => acc + curr.offer,
      0
    );

    return {
      totalSum: somatory,
      bids: collection?.auction.bid,
      bidders: collection?.auction.bidders!,
    };
  }
}
