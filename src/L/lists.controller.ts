import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { Lists } from "./lists.entity"


@Controller('Lists')
export class ListsController {}