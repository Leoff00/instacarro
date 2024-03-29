//@ts-nocheck
import { beforeEach, describe, expect, test, vitest } from "vitest";
import { CreateAuction } from ".";
import { InMemoAuctionRepo } from "../../../../tests/repositories/in-memo-auction-repo";
import { InMemoUserRepo } from "../../../../tests/repositories/in-memo-user-repo";
import { InMemoCarRepo } from "../../../../tests/repositories/in-memo-car-repo";
import { makeAuction, makeCar, makeUser } from "../../../../tests/factories";

describe("CreateAuction [UseCase]", () => {
  let inMemoUserRepo = new InMemoUserRepo();
  let inMemoCarRepo = new InMemoCarRepo();
  let inMemoAuctionRepo = new InMemoAuctionRepo();
  let sut: CreateAuction;
  let error: Error;

  beforeEach(() => {
    sut = new CreateAuction(inMemoUserRepo, inMemoCarRepo, inMemoAuctionRepo);
  });

  test("Should NOT create an auction with start date greater than end date", async () => {
    const u = makeUser();
    const c = makeCar();

    await inMemoUserRepo.create(u);
    await inMemoCarRepo.create(c);

    const findByEmailSpy = vitest.spyOn(inMemoUserRepo, "findByEmail");
    const findByPlateSpy = vitest.spyOn(inMemoCarRepo, "findByPlate");

    try {
      await sut.execute({
        email: u.email,
        licensePlate: c.licensePlate,
        minOffer: 200,
        maxOffer: 1000,
        startDate: new Date("01/05/2024"),
        endDate: new Date("01/04/2024"),
      });
    } catch (err) {
      error = err;
    }

    expect(error.message).toBe(
      "The start date of the bid can't be equal the end date."
    );
    expect(findByEmailSpy).toHaveBeenCalled();
    expect(findByPlateSpy).toHaveBeenCalled();
  });

  test("Should create an auction ", async () => {
    const u = makeUser();
    const c = makeCar();
    const a = makeAuction();

    await inMemoUserRepo.create(u);
    await inMemoCarRepo.create(c);

    const findByEmailSpy = vitest.spyOn(inMemoUserRepo, "findByEmail");
    const findByPlateSpy = vitest.spyOn(inMemoCarRepo, "findByPlate");

    await sut.execute({
      email: u.email,
      licensePlate: c.licensePlate,
      minOffer: 200,
      maxOffer: 1000,
      startDate: new Date(),
      endDate: new Date(),
    });

    expect(findByEmailSpy).toHaveBeenCalled();
    expect(findByPlateSpy).toHaveBeenCalled();
    expect(inMemoAuctionRepo.auction[0]).toBeDefined();
  });
});
