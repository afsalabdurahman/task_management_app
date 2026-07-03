import { NextFunction, Request, Response } from "express";
import { AppError, ValidationError } from "../utils/errors";
import { HTTP_STATUS } from "../constants/HTTP_STATUS_CODE";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err,"error middleware");

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
      errors: err.errors,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
    });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal Server Error",
  });
};