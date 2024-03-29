import { Model } from "mongoose";
import { UserRepository } from "../../app/contracts/user-contract";
import { User } from "../../entity/User";
import { UserInterfaceDoc, UserModel } from "../../shared/mongoose/user-schema";

export class MongoUserRepository extends UserRepository {
  readonly #repository: Model<UserInterfaceDoc> = UserModel;

  async create(c: User): Promise<void> {
    await this.#repository.create(c);
  }
  async findByEmail(email: string): Promise<User | null> {
    const found = await this.#repository.findOne({ email });

    if (!found) return null;

    const map = new User(found.name, found.lastname, found.email, found.id);
    return map;
  }
}
