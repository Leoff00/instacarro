import { Request, Response, NextFunction } from "express";

interface ErrorProps extends Error {
  statusCode?: number;
  message: string;
}

export function filterException(
  error: ErrorProps,
  req: Request,
  response: Response,
  next: NextFunction
) {
  const statusCode = error.statusCode || 500;
  const message =
    error.message || "Something went wrong, Internal Server Error.";

  if (error.statusCode) {
    return response.status(statusCode).json({
      statusCode,
      message,
    });
  } else {
    console.error(error);
    return response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
