import { Auction } from "../../entity/Auction";
import { AuctionInterfaceDoc } from "../../shared/mongoose/auction-schema";

type Bidder = {
  name: string;
  lastname: string;
  offer: number;
  email: string;
};

export type BidOutput = {
  bid: number;
  bidders: Array<{ name: string; lastname: string }>;
};

export abstract class AuctionRepository {
  abstract create(a: Auction): Promise<void>;
  abstract submitBid(
    bidder: Bidder,
    licensePlate: string
  ): Promise<number | null>;
  abstract findById(id: string): Promise<Auction | null>;
  abstract findByPlate(licensePlate: string): Promise<Auction | null>;
  abstract listVehicleBids(
    licensePlate: string
  ): Promise<{ auction: Auction; bid: number } | null>;
  abstract delete(licensePlate: string): Promise<void>;
}
