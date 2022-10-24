import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { UsersService } from './users.service';

const repositoryMockFactory = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  // ...
}));

describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    const user = { name: 'Alni', id: '123' };
    repositoryMock.findOne.mockReturnValue(user);

    expect(service).toBeDefined();
    expect(repositoryMock.findOne).toBeCalled();
  });
});
