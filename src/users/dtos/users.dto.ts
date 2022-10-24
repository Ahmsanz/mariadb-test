import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { UserInterface } from 'src/shared/interfaces/user.interface';

export class UserDto implements UserInterface {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  isActive: boolean;
}
