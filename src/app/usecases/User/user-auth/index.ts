import { sign } from "jsonwebtoken";
import { EntityNotFound } from "../../../../entity/errors/entity-not-found";
import { UserRepository } from "../../../contracts/user-contract";

export class AuthUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(name: string, email: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new EntityNotFound("User not found", 404);
    }

    const token = sign(
      {
        email: user.email,
      },
      "mysupersecretsecret",
      {
        subject: user.id,
        expiresIn: "1h",
      }
    );

    return token;
  }
}
