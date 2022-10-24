import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create.user.dto';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async createUser(newUser: CreateUserDto): Promise<User> {
    try {
      return this.usersRepository.save(newUser);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async findUsers(): Promise<User[]> {
    try {
      return this.usersRepository.find();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async findUserById(id: string): Promise<User> {
    try {
      return this.usersRepository.findOneBy({ id });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.usersRepository.findOneBy({ email });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
