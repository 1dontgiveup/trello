import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardRepository } from './boards.repository';
// import { MemberModule } from '../Members/members.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository]),
    // MemberModule // 인증유저만 게시글 보고 쓸수있음
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}