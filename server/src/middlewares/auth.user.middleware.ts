import { NextFunction,Request,Response } from "express";
import { UnauthorizedError } from "../utils/errors";
import { ERROR_CODES, MESSAGES } from "../constants/MESSAGES";
import { verifyAccessToken } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}
export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  
  const token = req.cookies.token;
  if (!token) {
    return next(
      new UnauthorizedError(
        MESSAGES.AUTH.NO_ACCESS_TOKEN,
        ERROR_CODES.INVALID_TOKEN
      )
    );
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;

    next();
  } catch {
    return next(
      new UnauthorizedError(
        MESSAGES.AUTH.NO_ACCESS_TOKEN,
        ERROR_CODES.INVALID_TOKEN
      )
    );
  }
};