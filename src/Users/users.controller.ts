import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { Users } from "./users.entity"


@Controller('Users')
export class UsersController {}