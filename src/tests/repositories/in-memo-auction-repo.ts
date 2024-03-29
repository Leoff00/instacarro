import { AuctionRepository } from "../../app/contracts/auction-contract";
import { Auction } from "../../entity/Auction";

type Bidder = {
  name: string;
  lastname: string;
  offer: number;
  email: string;
};

export class InMemoAuctionRepo implements AuctionRepository {
  private auctions: Array<Auction> = [];

  get auction() {
    return this.auctions;
  }

  set empty(array: []) {
    this.auctions = array;
  }

  async create(a: Auction): Promise<void> {
    await this.auctions.push(a);
  }

  async findByPlate(licensePlate: string): Promise<Auction | null> {
    const found = await this.auctions.find(
      (auction) => auction.car.licensePlate === licensePlate
    );
    if (!found) return null;

    return found;
  }

  async findById(id: string): Promise<Auction | null> {
    const found = await this.auctions.find((auction) => auction.id === id);
    if (!found) return null;
    return found;
  }

  async listVehicleBids(
    licensePlate: string
  ): Promise<{ auction: Auction; bid: number } | null> {
    const found = await this.auctions.find(
      (auction) => auction.car.licensePlate === licensePlate
    );
    if (!found) return null;

    return {
      auction: found,
      bid: found.bid,
    };
  }

  async submitBid(
    bidder: Bidder,
    licensePlate: string
  ): Promise<number | null> {
    const found = await this.auctions.find(
      (auction) => auction.car.licensePlate === licensePlate
    );

    if (!found) return null;

    found.bidders?.push(bidder);
    return found.bid;
  }

  async delete(licensePlate: string): Promise<void> {
    await this.auctions.filter((auction) => {
      if (auction.car.licensePlate === licensePlate) {
        this.auctions.pop();
      }
    });
  }
}
