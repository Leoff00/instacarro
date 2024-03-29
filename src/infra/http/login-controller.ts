import { Request, Response } from "express";
import { AuthUser } from "../../app/usecases/User/user-auth";
import { LoginBody } from "../validations";
import { userContainer } from "../container/user-container";

export class LoginController {
  async loginRoute(request: Request, response: Response) {
    const { name, email } = request.body as LoginBody;

    const authUserUseCase = userContainer.resolve<AuthUser>("AuthUser");

    const token = await authUserUseCase.execute(name, email);

    if (!token) {
      return response
        .status(498)
        .json({ statusCode: 498, message: "Invalid Token" });
    }

    return response.status(200).json({ statusCode: 200, message: token });
  }
}
