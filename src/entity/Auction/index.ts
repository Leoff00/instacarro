import crypto from "node:crypto";
import { Car } from "../Car";
import { User } from "../User";

type Bidders = Array<{ name: string; lastname: string }>;

export class Auction {
  private bids: number = 0;
  currentOffer: number;
  minOffer: number;
  maxOffer: number;
  car: Car;
  user: User;
  startDate: Date;
  endDate: Date;
  bidders?: Bidders;
  id?: string;

  constructor(
    currentOffer: number,
    minOffer: number,
    maxOffer: number,
    car: Car,
    user: User,
    startDate: Date,
    endDate: Date,
    bidders?: Bidders,
    id?: string
  ) {
    this.currentOffer = currentOffer;
    this.minOffer = minOffer;
    this.maxOffer = maxOffer;
    this.car = car;
    this.user = user;
    this.startDate = startDate;
    this.endDate = endDate;
    this.bidders = bidders || [];
    this.id = id || crypto.randomUUID();
  }

  public hasFinishedAuction(): boolean {
    if (this.currentOffer >= this.maxOffer) return true;
  }

  public hasReachedDeadline(): boolean {
    return this.startDate > this.endDate;
  }

  public touch() {
    this.bids++;
  }

  get bid() {
    return this.bids;
  }
}
