import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boards } from './boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards)
    private boardRepository: Repository<Boards>,
  ) {}

  async getBoard(bid: number) {
    if (!bid) {
      throw new NotFoundException('존재하지 않는 보드 입니다.');
    }
    return await this.boardRepository.findOne({ where: { bid } });
  }
  createBoard(name: string, color: string, explanation: string) {
    return this.boardRepository.insert({ name, color, explanation });
  }
  async updateBoard(bid: number, name: string, color: string, explanation: string) {
    await this.checkBoard(bid);
    this.boardRepository.update(bid, { name, color, explanation });
  }

  async deleteBoard(bid: number) {
    this.boardRepository.delete(bid);
  }
  //보드가 존재하는지 확인하는 함수 작성
  private async checkBoard(bid: number) {
    const board = await this.boardRepository.findOne({
      where: { bid },
    });
    if (!board) {
      throw new NotFoundException(`${bid}보드는 존재하지 않는 보드 입니다.`);
    }
  }
}
