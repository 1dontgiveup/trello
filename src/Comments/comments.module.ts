import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comments } from './comments.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Repository } from 'typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([Comments]),

  ],
  controllers: [CommentsController],
  providers: [CommentsService, Repository]
})
export class CommentsModule {}