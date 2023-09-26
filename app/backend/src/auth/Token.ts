import { log } from 'console';
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
    const bearerToken = token.replace('Bearer ', '');
    log(bearerToken);
    const data = jwt.verify(bearerToken, this.secret, (err, decoded) => {
      if (err) return null;
      return decoded;
    }) as unknown as TokenPayload;
    return data;
  }
}
