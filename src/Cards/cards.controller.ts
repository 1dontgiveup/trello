import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { Cards } from "./cards.entity"


@Controller('Cards')
export class CardsController {}