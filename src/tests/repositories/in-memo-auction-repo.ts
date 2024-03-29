import {
  AuctionRepository,
  BidOutput,
} from "../../app/contracts/auction-contract";
import { Auction } from "../../entity/Auction";

export class InMemoAuctionRepo implements AuctionRepository {
  private auctions: Array<Auction> = [];

  get auction() {
    return this.auctions;
  }

  set empty(array) {
    this.auctions = array;
  }

  async create(a: Auction): Promise<void> {
    await this.auctions.push(a);
  }

  async findById(id: string): Promise<Auction> {
    const found = await this.auctions.find((auction) => auction.id === id);
    return found;
  }

  async listVehicleBids(licensePlate: string): Promise<Auction> {
    const found = await this.auctions.find(
      (auction) => auction.car.licensePlate === licensePlate
    );

    return found;
  }

  async submitBid(currentOffer: number, licensePlate: string): Promise<void> {
    const found = await this.auctions.find(
      (auction) => auction.car.licensePlate === licensePlate
    );
    found.currentOffer = currentOffer;
  }

  delete(licensePlate: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
