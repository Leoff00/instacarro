import { CreateUser } from "../../app/usecases/User/create-user";
import { AuthUser } from "../../app/usecases/User/user-auth";
import { MongoUserRepository } from "../repositories/user-repository";
import { Container } from "./injection";

const userContainer = new Container();
const userRepository = new MongoUserRepository();

userContainer.register<CreateUser>(
  "createUser",
  new CreateUser(userRepository)
);
userContainer.register<AuthUser>("AuthUser", new AuthUser(userRepository));

export { userContainer };
