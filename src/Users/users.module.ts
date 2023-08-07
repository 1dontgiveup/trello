import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { UsersRepository } from './users.repository';
// import { MemberModule } from '../Members/members.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([UsersRepository]),
    // MemberModule // 인증유저만 게시글 보고 쓸수있음
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}