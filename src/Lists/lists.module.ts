import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { ListsRepository } from './lists.repository';
// import { MemberModule } from '../Members/members.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListsRepository]),
    // MemberModule // 인증유저만 게시글 보고 쓸수있음
  ],
  controllers: [ListsController],
  providers: [ListsService]
})
export class ListsModule {}