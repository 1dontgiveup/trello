import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { Comments } from "./comments.entity"


@Controller('Comments')
export class CommentsController {}