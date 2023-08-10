import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardsRepository } from './cards.repository';
// import { MemberModule } from '../Members/members.module';

import { Cards } from './cards.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardsRepository]),
    // MemberModule // 인증유저만 게시글 보고 쓸수있음
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
