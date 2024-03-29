import mongoose, { Document, Schema } from "mongoose";
import { Car } from "../../entity/Car";
import { User } from "../../entity/User";

type Bidder = { name: string; lastname: string; offer: Number; email: string };

const Bidders = new Schema<Bidder>({
  name: { type: String },
  lastname: { type: String },
  offer: { type: Number },
  email: { type: String, unique: true },
});

export interface AuctionInterfaceDoc extends Document {
  bid: number;
  bidders: Array<{
    name: string;
    lastname: string;
    offer: number;
    email: string;
  }>;
  currentOffer: number;
  minOffer: number;
  maxOffer: number;
  car: Car;
  user: User;
  startDate: Date;
  endDate: Date;
}

export const AuctionSchema = new Schema<AuctionInterfaceDoc>({
  bid: { type: Number },
  currentOffer: { type: Number },
  minOffer: { type: Number },
  maxOffer: { type: Number },
  car: { type: Object, ref: "Car", required: true },
  user: { type: Object, ref: "User", required: true },
  bidders: [Bidders],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const AuctionModel = mongoose.model<AuctionInterfaceDoc>(
  "Auction",
  AuctionSchema
);
