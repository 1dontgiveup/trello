import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { Boards } from './boards.entity';
import { BoardsService } from './boards.service';

@Controller('api')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Get('/board/:bid')
  getBoard(@Param('bid') bid: number) {
    return this.boardService.getBoard(bid);
  }

  @Post('/board')
  createBoard(@Body() data: Boards) {
    return this.boardService.createBoard(data.name, data.color, data.explanation);
  }

  @Patch('/board/:bid')
  updateBoard(@Param('bid') bid: number, @Body() data: Boards) {
    return this.boardService.updateBoard(bid, data.name, data.explanation, data.color);
  }

  @Delete('board/:bid')
  deleteBoard(@Param('bid') bid: number) {
    return this.boardService.deleteBoard(bid);
  }
}
