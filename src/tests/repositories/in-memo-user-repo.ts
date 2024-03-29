import { UserRepository } from "../../app/contracts/user-contract";
import { User } from "../../entity/User";

export class InMemoUserRepo implements UserRepository {
  private users: Array<User> = [];

  get user() {
    return this.users;
  }

  async create(c: User): Promise<void> {
    await this.users.push(c);
  }
  async findByEmail(email: string): Promise<User> {
    const found = await this.users.find((user) => user.email === email);
    return found;
  }
}
