import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config.service';
import { BoardsModule } from './Boards/boards.module';
import { CardsModule } from './Cards/cards.module';
import { CommentsModule } from './Comments/comments.module';
import { ListsModule } from './Lists/lists.module';
import { MembersModule } from './Members/members.module';
import { UsersModule } from './Users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {} from './configs/typeorm.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: typeORMConfig,
      inject: [ConfigService],
    }),
    BoardsModule,
    CardsModule,
    CommentsModule,
    ListsModule,
    MembersModule,
    UsersModule,
  ],
})
export class AppModule {}
