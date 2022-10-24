import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { UsersService } from '../service/users.service';
import { UsersModule } from '../users.module';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, User],
      imports: [CacheModule.register()],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersRepository = module.get(Repository<User>);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
