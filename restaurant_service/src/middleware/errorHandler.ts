import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = "statusCode" in err ? (err as any).statusCode : 500;

  const errorResponse = {
    message: err.message || "Internal Server Error",
    statusCode,
    errors: "errors" in err ? (err as any).errors : [],
    success: false,
  };

  res.status(statusCode).json(errorResponse);
};
