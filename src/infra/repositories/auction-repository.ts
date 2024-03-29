import { Model } from "mongoose";
import { AuctionRepository } from "../../app/contracts/auction-contract";
import { Auction } from "../../entity/Auction";
import {
  AuctionInterfaceDoc,
  AuctionModel,
} from "../../shared/mongoose/auction-schema";

export class MongoAuctionRepository extends AuctionRepository {
  readonly #repository: Model<AuctionInterfaceDoc> = AuctionModel;

  async create(a: Auction): Promise<void> {
    await this.#repository.create(a);
  }

  async findById(id: string): Promise<Auction | null> {
    const found = await this.#repository.findById(id);

    if (!found) return null;

    const map = new Auction(
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

    return map;
  }

  async submitBid(currentOffer: number, licensePlate: string): Promise<void> {
    const found = await this.#repository.findOne({
      "car.licensePlate": licensePlate,
    });

    if (!found) return;

    found.currentOffer = currentOffer;
    await this.#repository.updateOne({ id: found.id });
  }

  async listVehicleBids(licensePlate: string): Promise<Auction | null> {
    const found = await this.#repository.findOne({
      "car.licensePlate": licensePlate,
    });

    if (!found) return null;

    const map = new Auction(
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

    return map;
  }

  async delete(licensePlate: string): Promise<void> {
    const found = await this.#repository.findOne({
      "car.licensePlate": licensePlate,
    });

    if (!found) return;

    await this.#repository.deleteOne({ id: found.id });
  }
}
