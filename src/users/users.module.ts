import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { User } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CacheModule.register()],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
