import { UserRepository } from "../../app/contracts/user-contract";
import { User } from "../../entity/User";

export class InMemoUserRepo implements UserRepository {
  private users: Array<User> = [];

  get user() {
    return this.users;
  }

  async create(user: User): Promise<void> {
    await this.users.push(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    const found = await this.users.find((user) => user.email === email);
    if (!found) return null;
    return found;
  }
}
