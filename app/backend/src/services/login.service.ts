import * as bcrypt from 'bcryptjs';
import ILogin from '../Interfaces/Ilogin';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import Token from '../auth/Token';
import Users from '../database/models/Users';

export default class LoginService {
  private model = Users;
  private decoded = new Token();

  public async checkLogin(body: ILogin): Promise<ServiceResponse<Users>> {
    const { email, password } = body;
    const user = await this.model.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }

    const token = new Token().sign({
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
    });
    return { status: 200, data: { token } };
  }

  public checkToken(token: string): ServiceResponse<Users> {
    const decoded = this.decoded.verify(token);
    if (!decoded) return { status: 401, data: { message: 'Invalid token' } };
    return { status: 200, data: { role: decoded.role } };
  }
}
