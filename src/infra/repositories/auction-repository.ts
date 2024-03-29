import { Model } from "mongoose";
import { AuctionRepository } from "../../app/contracts/auction-contract";
import { Auction } from "../../entity/Auction";
import {
  AuctionInterfaceDoc,
  AuctionModel,
} from "../../shared/mongoose/auction-schema";

type Bidder = {
  name: string;
  lastname: string;
  offer: number;
  email: string;
};

export class MongoAuctionRepository extends AuctionRepository {
  readonly #repository: Model<AuctionInterfaceDoc> = AuctionModel;

  async create(auction: Auction): Promise<void> {
    await this.#repository.create(auction);
  }

  async findByPlate(licensePlate: string): Promise<Auction | null> {
    const found = await this.#repository.findOne({
      "car.licensePlate": licensePlate,
    });
    if (!found) return null;

    const toDomain = new Auction(
      found.currentOffer,
      found.minOffer,
      found.maxOffer,
      found.car,
      found.user,
      found.startDate,
      found.endDate,
      found.bidders,
      found.id
    );

    return toDomain;
  }

  async findById(id: string): Promise<Auction | null> {
    const found = await this.#repository.findById(id);

    if (!found) return null;

    const toDomain = new Auction(
      found.currentOffer,
      found.minOffer,
      found.maxOffer,
      found.car,
      found.user,
      found.startDate,
      found.endDate,
      found.bidders,
      found.id
    );

    return toDomain;
  }

  async submitBid(
    bidder: Bidder,
    licensePlate: string
  ): Promise<number | null> {
    const found = await this.#repository.findOne({
      "car.licensePlate": licensePlate,
    });

    if (!found) return null;

    found.bid++;
    found.bidders.push(bidder);

    await this.#repository.updateOne({
      $push: { bidders: found.bidders },
      bid: found.bid,
    });

    return found.bid;
  }

  async listVehicleBids(
    licensePlate: string
  ): Promise<{ auction: Auction; bid: number } | null> {
    const found = await this.#repository.findOne({
      "car.licensePlate": licensePlate,
    });

    if (!found) return null;

    const toDomain = new Auction(
      found.currentOffer,
      found.minOffer,
      found.maxOffer,
      found.car,
      found.user,
      found.startDate,
      found.endDate,
      found.bidders,
      found.id
    );

    return {
      auction: toDomain,
      bid: found.bid,
    };
  }

  async delete(licensePlate: string): Promise<void> {
    const found = await this.#repository.findOne({
      "car.licensePlate": licensePlate,
    });

    if (!found) return;

    await this.#repository.deleteOne({ "car.licensePlate": licensePlate });
  }
}
