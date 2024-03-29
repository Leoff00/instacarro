import crypto from "node:crypto";
import { Auction } from "../../entity/Auction";
import { makeCar, makeUser } from ".";

export function makeAuction(opts: Partial<Auction> = {}): Auction {
  const c = makeCar();
  const u = makeUser();
  return new Auction(
    opts.currentOffer || 20000,
    opts.minOffer || 1000,
    opts.maxOffer || 500000,
    c,
    u,
    opts.startDate || new Date(),
    opts.endDate || new Date(),
    opts.bidders || [
      { name: "John", lastname: "Doe" },
      { name: "Mary", lastname: "Ann" },
    ]
  );
}
