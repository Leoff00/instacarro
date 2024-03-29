import { beforeEach, describe, expect, test } from "vitest";
import { InMemoAuctionRepo } from "../../../../tests/repositories/in-memo-auction-repo";
import { ListVehicleBids } from ".";
import { makeAuction } from "../../../../tests/factories";

describe("ListBidByUser [UseCase]", () => {
  let inMemoAuctionRepo = new InMemoAuctionRepo();
  let sut: ListVehicleBids;

  beforeEach(() => {
    sut = new ListVehicleBids(inMemoAuctionRepo);
  });

  test("Should list given bids in vehicle", async () => {
    const a = makeAuction({});

    await inMemoAuctionRepo.create(a);
    await inMemoAuctionRepo.submitBid(500, a.car.licensePlate);
    await inMemoAuctionRepo.submitBid(600, a.car.licensePlate);
    await inMemoAuctionRepo.submitBid(700, a.car.licensePlate);

    const result = await sut.execute({
      licensePlate: a.car.licensePlate,
    });

    expect(result).toBeDefined();
  });
});
