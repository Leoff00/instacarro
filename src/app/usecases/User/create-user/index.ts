import { User } from "../../../../entity/User";
import { DomainError } from "../../../../entity/errors/domain-error";
import { UserRepository } from "../../../contracts/user-contract";

type Input = {
  name: string;
  lastname: string;
  email: string;
};

type Output = void;

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<Output> {
    const user = new User(input.name, input.lastname, input.email);

    if (!user.validateEmailFormat()) {
      throw new DomainError("Incorrect email format", 422);
    }

    await this.userRepository.create(user);
  }
}
