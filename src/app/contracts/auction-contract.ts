import { Auction } from "../../entity/Auction";

export type BidOutput = {
  bid: number;
  bidders: Array<{ name: string; lastname: string }>;
};

export abstract class AuctionRepository {
  abstract create(a: Auction): Promise<void>;
  abstract submitBid(currentOffer: number, licensePlate: string): Promise<void>;
  abstract findById(id: string): Promise<Auction | null>;
  abstract listVehicleBids(licensePlate: string): Promise<Auction | null>;
  abstract delete(licensePlate: string): Promise<void>;
}
