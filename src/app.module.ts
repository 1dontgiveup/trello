import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardsModule } from './Boards/boards.module';
import { CardsModule } from './Cards/cards.module';
import { CommentsModule } from './Comments/comments.module';
import { ListsModule } from './Lists/lists.module';
import { MembersModule } from './Members/members.module';
import { UsersModule } from './Users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: () => typeORMConfig }),
    BoardsModule,
    CardsModule,
    CommentsModule,
    ListsModule,
    MembersModule,
    UsersModule,
  ],
})
export class AppModule {}
console.log(typeORMConfig, '앱에서 확인');
