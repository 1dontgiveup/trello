import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
// import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { MembersRepository } from './members.repository';
// import { MemberModule } from '../Members/members.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MembersRepository]),
    // MemberModule // 인증유저만 게시글 보고 쓸수있음
  ],
//   controllers: [MembersController],
  providers: [MembersService]
})
export class MembersModule {}