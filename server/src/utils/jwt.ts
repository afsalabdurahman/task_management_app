

import jwt from 'jsonwebtoken';


export interface AccessPayload {
  userId: string;
  email: string;
}

export interface RefreshPayload {
  userId: string;
}

export const generateAccessToken = (payload: AccessPayload): string => {
const JWT_SECRET = process.env.JWT_SECRET;
  return jwt.sign(payload, JWT_SECRET??"", {
    expiresIn: '30m',
  });
};

export const generateRefreshToken = (payload: RefreshPayload): string => {
  const JWT_SECRET = process.env.JWT_SECRET;
  return jwt.sign(payload, JWT_SECRET??"", {
    expiresIn: '30d',
  });
};

export const verifyAccessToken = (token: string): AccessPayload => {
  const JWT_SECRET = process.env.JWT_SECRET;
  return jwt.verify(token, JWT_SECRET??"") as AccessPayload;
};

export const verifyRefreshToken = (token: string): RefreshPayload => {
  const JWT_SECRET = process.env.JWT_SECRET;
  return jwt.verify(token, JWT_SECRET??"") as RefreshPayload;
};
