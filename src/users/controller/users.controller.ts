import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateUserDto } from '../dtos/create.user.dto';
import { User } from '../entities/users.entity';
import { UsersService } from '../service/users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
@UseInterceptors(CacheInterceptor)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@Body() newUser: CreateUserDto): Promise<User> {
    try {
      return this.userService.createUser(newUser);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }

  @Get()
  async getUsers(): Promise<User[]> {
    try {
      return this.userService.findUsers();
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }

  @Get('/:id')
  async getSingleUser(@Param('id') id: string): Promise<User> {
    try {
      return this.userService.findUserById(id);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }
}
