import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config"



export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'express-database.cglnarldwxvs.ap-northeast-2.rds.amazonaws.com', // database
    port: 3306,
    username: 'powercom92',
    password: 'tkddn2648',
    database: 'Trello',
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
    synchronize: false
}

