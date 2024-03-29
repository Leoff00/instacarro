import { Request, Response } from "express";
import { CreateUserBody } from "../validations/user-validations";
import { CreateUser } from "../../app/usecases/User/create-user";
import { userContainer } from "../container/user-container";

export class UserController {
  async createUserRoute(request: Request, response: Response) {
    const body = request.body as CreateUserBody;
    const createUserUseCase = userContainer.resolve<CreateUser>("createUser");
    await createUserUseCase.execute(body);

    return response
      .status(201)
      .json({ statusCode: 201, message: "User created" });
  }
}
