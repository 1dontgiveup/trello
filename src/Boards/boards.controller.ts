import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { Boards } from "./boards.entity"


@Controller('Boards')
export class BoardsController {}