import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";

export function filterRequest(schema: z.ZodObject<any, any, any>) {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const combine = { ...request.body, ...request.params };
      schema.parse(combine);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        response.status(400).json({
          statusCode: 400,
          error: "Invalid data",
          details: errorMessages,
        });
      } else {
        response
          .status(500)
          .json({ statusCode: 500, error: "Internal Server Error" });
      }
    }
  };
}
