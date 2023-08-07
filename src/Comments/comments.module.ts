import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
// import { MemberModule } from '../Members/members.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsRepository]),
    // MemberModule // 인증유저만 게시글 보고 쓸수있음
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}