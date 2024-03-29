import { beforeEach, describe, expect, test } from "vitest";
import { FinishBid } from ".";
import { InMemoAuctionRepo } from "../../../../tests/repositories/in-memo-auction-repo";
import { makeAuction } from "../../../../tests/factories";

describe("FinishBid [UseCase]", () => {
  let inMemoAuctionRepo = new InMemoAuctionRepo();
  let sut: FinishBid;

  beforeEach(() => {
    sut = new FinishBid(inMemoAuctionRepo);
  });

  test("Should finish a bid if input is greater or equal max offer ", async () => {
    const a = makeAuction({
      bidders: [
        {
          name: "John",
          lastname: "Doe",
          offer: 500000,
          email: "john.doe@gmail.com",
        },
      ],
    });
    await inMemoAuctionRepo.create(a);

    const result = await sut.execute({
      licensePlate: a.car.licensePlate,
    });

    expect(result.winner?.offer).toBe(a.maxOffer);
  });
});
