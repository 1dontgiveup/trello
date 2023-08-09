import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from 'process';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '',
  port: 3306,
  username: '',
  password: '',
  database: '',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
};
