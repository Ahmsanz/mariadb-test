import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/service/users.service';

interface LogInLegacy {
  logInLegacy: boolean;
  cookies?: string[];
}

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(user: User): Promise<{ [key: string]: boolean | string }> {
    try {
      const { logInLegacy, cookies } = await this.logInLegacy();
      if (!logInLegacy) return { logInLegacy };

      const payload = { ...user, loggedIn: logInLegacy, cookies };
      const access_token: string = this.jwtService.sign(payload);

      return { user: user.email, logInLegacy, access_token };
    } catch (error) {}
  }

  // could take the user from the guard to sophisticate the login
  async logInLegacy(): Promise<LogInLegacy> {
    try {
      const responseFromLegacy = await this.httpService.axiosRef.post(
        'http://localhost:3000/auth/login',
      );
      const cookies = responseFromLegacy.headers['set-cookie'];

      return { logInLegacy: true, cookies };
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findUserByEmail(username);
      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
      throw new HttpException(
        'Cannot pass, try again!',
        HttpStatus.UNAUTHORIZED,
      );
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
