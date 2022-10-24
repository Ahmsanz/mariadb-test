import { Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local.guard';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async logInLegacy(
    @Req() req: any,
  ): Promise<{ [key: string]: boolean | string }> {
    try {
      const { user } = req;
      const login: { [key: string]: boolean | string } =
        await this.authService.login(user);

      if (!login) {
        throw new Error('You are not allowed here');
      }
      return login;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
