import { User } from "../../entity/User";

export function makeUser(opts: Partial<Omit<User, "id">> = {}): User {
  return new User(
    opts.name || "Foo",
    opts.lastname || "Bar",
    opts.email || "foo.bar@gmail.com"
  );
}
