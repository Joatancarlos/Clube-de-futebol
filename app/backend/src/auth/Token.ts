import * as jwt from 'jsonwebtoken';

type TokenPayload = {
  id: number,
  email: string,
  role: string,
  username: string,
};

export default class Token {
  private secret = process.env.JWT_SECRET || 'secret';

  sign(payload: TokenPayload): string {
    const token = jwt.sign(payload, this.secret, { expiresIn: '7d', algorithm: 'HS256' });
    return token;
  }

  verify(token: string): TokenPayload {
    const data = jwt.verify(token, this.secret) as TokenPayload;
    return data;
  }
}
