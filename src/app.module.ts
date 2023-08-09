import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardsModule } from './Boards/boards.module';
import { CardsModule } from './Cards/cards.module';
import { CommentsModule } from './Comments/comments.module';
import { ListsModule } from './Lists/lists.module';
import { MembersModule } from './Members/members.module';
import { UsersModule } from './Users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthMiddleware } from "../src/auth/auth.middlewares";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ConfigModule.forRoot({isGlobal: true}),
    BoardsModule,
    CardsModule,
    CommentsModule,
    ListsModule,
    MembersModule,
    UsersModule,
  ],
})
export class AppModule {}
