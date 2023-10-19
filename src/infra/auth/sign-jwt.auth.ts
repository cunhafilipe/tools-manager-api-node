import jwt from 'jsonwebtoken';

export class JwtAuth {
  sign(email: string, id: number): string {
    return jwt.sign({ email, id }, process.env.SECRET_KEY!)
  }
}