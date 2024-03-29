import { afterEach, beforeEach, describe, expect, test, vitest } from "vitest";
import { SubmitBid } from ".";
import { InMemoAuctionRepo } from "../../../../tests/repositories/in-memo-auction-repo";
import { InMemoUserRepo } from "../../../../tests/repositories/in-memo-user-repo";
import { InMemoCarRepo } from "../../../../tests/repositories/in-memo-car-repo";
import { makeCar, makeUser, makeAuction } from "../../../../tests/factories";

describe("SubmitBid [UseCase]", () => {
  let inMemoUserRepo = new InMemoUserRepo();
  let inMemoCarRepo = new InMemoCarRepo();
  let inMemoAuctionRepo = new InMemoAuctionRepo();
  let sut: SubmitBid;

  beforeEach(() => {
    sut = new SubmitBid(inMemoUserRepo, inMemoCarRepo, inMemoAuctionRepo);
  });

  afterEach(() => {
    inMemoAuctionRepo.empty = [];
  });

  test("Should NOT submit a bid in a action out of date ", async () => {
    const u = makeUser();
    const c = makeCar();
    const a = makeAuction({
      startDate: new Date("01/05/2024"),
      endDate: new Date("01/04/2024"),
    });

    await inMemoUserRepo.create(u);
    await inMemoCarRepo.create(c);
    await inMemoAuctionRepo.create(a);

    expect(
      async () =>
        await sut.execute({
          id: a.id!,
          bidder: {
            email: a.user.email,
            offer: a.bidders![0].offer,
            name: a.bidders![0].name,
            lastname: a.bidders![0].lastname,
          },
          licensePlate: c.licensePlate,
        })
    ).rejects.toThrow("Can't submit a bid because this auction is out of date");
  });

  test.skip("Should submit a bid ", async () => {
    const u = makeUser();
    const c = makeCar();
    const a = makeAuction({
      startDate: new Date("01/04/2024"),
      endDate: new Date("01/05/2024"),
    });

    await inMemoUserRepo.create(u);
    await inMemoCarRepo.create(c);
    await inMemoAuctionRepo.create(a);

    const findByEmailSpy = vitest.spyOn(inMemoUserRepo, "findByEmail");
    const findByPlateSpy = vitest.spyOn(inMemoCarRepo, "findByPlate");

    const result = await sut.execute({
      id: a.id!,
      bidder: {
        email: a.user.email,
        offer: 5000,
        name: a.bidders![0].name,
        lastname: a.bidders![0].lastname,
      },
      licensePlate: c.licensePlate,
    });

    expect(result.bid).toBe(1);
    expect(findByEmailSpy).toHaveBeenCalled();
    expect(findByPlateSpy).toHaveBeenCalled();
    expect(inMemoAuctionRepo.auction[0].currentOffer).toBe(5000);
  });

  test("Should NOT submit a bid less than 200 ", async () => {
    const u = makeUser();
    const c = makeCar();
    const a = makeAuction({
      startDate: new Date("01/04/2024"),
      endDate: new Date("01/05/2024"),
    });

    const limitMinOffer = 200;

    await inMemoUserRepo.create(u);
    await inMemoCarRepo.create(c);
    await inMemoAuctionRepo.create(a);

    expect(
      async () =>
        await sut.execute({
          id: a.id!,
          bidder: {
            email: a.user.email,
            offer: 150,
            name: a.bidders![0].name,
            lastname: a.bidders![0].lastname,
          },
          licensePlate: c.licensePlate,
        })
    ).rejects.toThrow(`Can't submit an offer less than ${limitMinOffer}`);
  });
});
