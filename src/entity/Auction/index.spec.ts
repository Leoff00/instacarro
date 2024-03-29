import { describe, expect, test } from "vitest";
import { makeCar, makeUser } from "../../tests/factories";
import { Auction } from ".";

describe("Auction Entity", () => {
  test("Should create an Auction", () => {
    const c = makeCar();
    const u = makeUser();
    const auction = new Auction(
      20000,
      100,
      50000,
      c,
      u,
      new Date(),
      new Date()
    );
    expect(auction).toBeInstanceOf(Auction);
  });
});
