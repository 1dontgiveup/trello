import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class typeORMConfig implements TypeOrmOptionsFactory {
  constructor(private readonly ConfigService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.ConfigService.get<string>('DATABASE_HOST'),
      port: this.ConfigService.get<number>('DATABASE_PORT'),
      username: this.ConfigService.get<string>('DATABASE_USERNAME'),
      password: this.ConfigService.get<string>('DATABASE_PASSWORD'),
      database: this.ConfigService.get<string>('DATABASE_NAME'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: this.ConfigService.get<boolean>('DATABASE_SYNCHRONIZE'),
    };
  }
}
