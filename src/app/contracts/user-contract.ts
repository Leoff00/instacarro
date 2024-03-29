import { User } from "../../entity/User";

export abstract class UserRepository {
  abstract create(c: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
}
