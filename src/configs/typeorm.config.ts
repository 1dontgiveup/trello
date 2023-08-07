import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: '',
    port: 3000,
    username: '',
    password: '',
    database: '',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}

