import { NextFunction, Request, Response } from "express";

class HttpError extends Error {
  statusCode: number;
  errors?: string[];
  constructor(message: string, statusCode: number, errors: string[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof HttpError ? err.statusCode : 500;

  const errorResponse = {
    message: err.message || "Internal Server Error",
    statusCode,
    errors: err instanceof HttpError ? err.errors : [],
  };

  res.status(statusCode).json(errorResponse);
};
