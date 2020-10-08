import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import AuthConfig from "../config/Auth";
import AppError from "../errors/AppError";
interface TokenPayload {
  iad: number;
  exp: number;
  sub: string;
}
export default function ensureAuthenticaded(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }
  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, AuthConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;
    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError("Invalid JWT token", 401);
  }
}
