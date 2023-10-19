
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new NotAuthorizedError('JWR token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    verify(token, process.env.SECRET_KEY!);
    return next();
  } catch {
    throw new NotAuthorizedError('Invalid Jwt token');
  }
}