import mongoose, { Document, Schema } from "mongoose";
import { UserInterfaceDoc } from "./user-schema";
import { CarInterfaceDoc } from "./car-schema";

type Bidders = { name: string; lastname: string };

const Bidder = new Schema<Bidders>({
  name: { type: String },
  lastname: { type: String },
});

export interface AuctionInterfaceDoc extends Document {
  bid: number;
  bidders: Array<Bidders>;
  currentOffer: number;
  minOffer: number;
  maxOffer: number;
  car: CarInterfaceDoc["_id"];
  user: UserInterfaceDoc["_id"];
  startDate: Date;
  endDate: Date;
}

export const AuctionSchema = new Schema<AuctionInterfaceDoc>({
  bid: { type: Number },
  currentOffer: { type: Number },
  minOffer: { type: Number },
  maxOffer: { type: Number },
  car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bidders: { type: [Bidder] },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const AuctionModel = mongoose.model<AuctionInterfaceDoc>(
  "Auction",
  AuctionSchema
);
