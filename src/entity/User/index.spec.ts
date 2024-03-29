import { describe, expect, test } from "vitest";
import { User } from ".";

describe("User Entity", () => {
  test("Should create an user", () => {
    const user = new User("", "foo", "bar", "foo.bar@gmail.com");
    expect(user).toBeInstanceOf(User);
  });
});
