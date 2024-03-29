import { beforeEach, describe, expect, test } from "vitest";
import { makeUser } from "../../../../tests/factories";
import { CreateUser } from ".";
import { InMemoUserRepo } from "../../../../tests/repositories/in-memo-user-repo";

describe("CreateUser [UseCase]", () => {
  let inMemoUserRepo = new InMemoUserRepo();
  let sut: CreateUser;

  beforeEach(() => {
    sut = new CreateUser(inMemoUserRepo);
  });

  test("Should not create user with INVALID email", async () => {
    const u = makeUser({ email: "test@foo.bar.b" });

    expect(async () => await sut.execute(u)).rejects.toThrow(
      "Incorrect email format"
    );
    expect(inMemoUserRepo.user[0]).not.toBeDefined();
  });

  test("Should create user with VALID email", async () => {
    const u = makeUser();
    const validEmail = u.validateEmailFormat();

    await sut.execute(u);

    expect(validEmail).toBe(true);
    expect(inMemoUserRepo.user[0]).toBeDefined();
  });
});
