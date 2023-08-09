import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from 'process';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'express-database.cglnarldwxvs.ap-northeast-2.rds.amazonaws.com',
  port: 3306,
  username: 'powercom92',
  password: 'tkddn2648',
  database: 'Trello',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
};
