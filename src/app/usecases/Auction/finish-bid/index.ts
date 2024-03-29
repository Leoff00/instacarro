//@ts-nocheck
import { EntityNotFound } from "../../../../entity/errors/entity-not-found";
import { AuctionRepository } from "../../../contracts/auction-contract";

type Input = {
  licensePlate: string;
};

type Output = {
  message: string;
  winner: { name: string; lastname: string; offer: number } | null;
};

export class FinishBid {
  constructor(private readonly auctionRepository: AuctionRepository) {}

  async execute(input: Input): Promise<Output> {
    const { auction } = await this.auctionRepository.listVehicleBids(
      input.licensePlate
    );

    if (!auction) {
      throw new EntityNotFound("Auction not found", 422);
    }

    if (auction.hasFinishedAuction()) {
      const winner = auction?.bidders?.find(
        (bid) => bid.offer === auction.maxOffer
      );

      await this.auctionRepository.delete(input.licensePlate);

      return {
        message: "Bid finished",
        winner: winner!,
      };
    }

    return {
      message: "Auction still avaiable",
      winner: null,
    };
  }
}
