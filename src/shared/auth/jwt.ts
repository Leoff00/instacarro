import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type Payload = {
  sub: string;
};

export class JWTGuard {
  static verify(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
      return response
        .status(401)
        .json({ statusCode: 401, message: "Unauthorized!" });
    }

    const [, token] = authToken.split(" ");

    try {
      const { sub } = verify(token, "mysupersecretsecret") as Payload;
      request.body.id = sub;

      return next();
    } catch (err) {
      return response
        .status(401)
        .json({ statusCode: 401, message: "Unauthorized" });
    }
  }
}
