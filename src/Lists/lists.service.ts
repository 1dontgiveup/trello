import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lists } from './lists.entity'


@Injectable()
export class ListsService {
    constructor(
        @InjectRepository(Lists)
        private listsRepository: Repository<Lists>
    ){}


    // 리스트 전체 조회
   async getLists(bid: number, lid: number): Promise<Lists[]> {

        if (!bid || bid == undefined) {
            throw new NotFoundException('보드 ID가 존재하지 않습니다.')
        } else if (!lid || lid == undefined) {
            throw new NotFoundException('리스트 ID가 존재하지 않습니다.')
        }
   
    const lists = this.listsRepository.find({where: {lid}})
    if (!lists || lists == undefined) {
        throw new NotFoundException('리스트 조회에 실패했습니다.')
    }
    return lists    
   }

   // 리스트 생성
   async createList(bid: number, lid: number, title:string): Promise<Lists> {
    try {
const content = this.listsRepository.create({ title });
      return this.listsRepository.save(content);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('리스트 생성에 실패하였습니다.');
    }
  }

    } 
   
