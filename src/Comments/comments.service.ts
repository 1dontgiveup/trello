import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Members } from 'src/Members/members.entity';
import _ from 'lodash';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
    private membersRepository: Repository<Members>,
  ) {}

  // 1. < 댓글목록 전체 조회 >
  async getAllComments(bid: number, cid: number): Promise<Comments[]> {
    // params 체크
    if (!bid || bid == undefined) {
      throw new NotFoundException('board ID가 존재하지 않습니다.');
    } else if (!cid || cid == undefined) {
      throw new NotFoundException('card ID가 존재하지 않습니다.');
    }

    const comments = this.commentsRepository.find({ where: { cid } });
    if (!comments || comments == undefined) {
      throw new NotFoundException('댓글조회에 실패했습니다.');
    }
    return comments;
  }

  // 2. < 댓글 1개 조회 >
  async GetCommentById(bid: number, cid: number, commentId: number): Promise<Comments> {
    // params 체크
    if (!bid || bid == undefined) {
      throw new NotFoundException('board ID가 존재하지 않습니다.');
    } else if (!cid || cid == undefined) {
      throw new NotFoundException('card ID가 존재하지 않습니다.');
    } else if (!commentId || commentId == undefined) {
      throw new NotFoundException('comment ID가 존재하지 않습니다.');
    }
    const comment = this.commentsRepository.findOne({ where: { commentId } });
    if (!comment || comment == undefined) {
      throw new NotFoundException('댓글조회에 실패했습니다.');
    }
    return comment;
  }

  // 3. < 댓글 생성 >
  async createComment(bid: number, cid: number, createCommentDto: CreateCommentDto): Promise<Comments> {
    try {
      const { comment } = createCommentDto;
      // params 체크
      if (!bid || bid == undefined) {
        throw new NotFoundException('board ID가 존재하지 않습니다.');
      } else if (!cid || cid == undefined) {
        throw new NotFoundException('card ID가 존재하지 않습니다.');
      }
      // 댓글입력
      if (!comment) {
        throw new BadRequestException('댓글을 작성해주세요.');
      }

      const content = this.commentsRepository.create({ comment });
      return this.commentsRepository.save(content);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('댓글 작성에 실패하였습니다.');
    }
  }

  // 4. < 댓글 수정 >
  async updateComment(bid: number, cid: number, commentId: number, updateCommentDto: UpdateCommentDto): Promise<Comments | undefined> {
    try {
      const { comment } = updateCommentDto;

      // params 체크
      if (!bid || bid == undefined) {
        throw new NotFoundException('board ID가 존재하지 않습니다.');
      } else if (!cid || cid == undefined) {
        throw new NotFoundException('card ID가 존재하지 않습니다.');
      } else if (!commentId || commentId == undefined) {
        throw new NotFoundException('comment ID가 존재하지 않습니다.');
      }
      // 댓글수정
      if (!comment) {
        throw new BadRequestException('수정할 댓글을 작성해주세요.');
      }

      // 댓글존재유무
      const content = this.commentsRepository.findOne({ where: { commentId } });
      if (!content || content == undefined) {
        throw new NotFoundException('해당 댓글이 조회되지 않습니다.');
      }

      // 업데이트 및 저장
      (await content).comment = comment;
      const update = this.commentsRepository.save(await content);
      return update;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('댓글 수정에 실패하였습니다.');
    }
  }

  // 5. < 댓글 삭제 >
  async deleteComment(bid: number, cid: number, commentId: number): Promise<void> {
    try {
      // params 체크
      if (!bid || bid == undefined) {
        throw new NotFoundException('board ID가 존재하지 않습니다.');
      } else if (!cid || cid == undefined) {
        throw new NotFoundException('card ID가 존재하지 않습니다.');
      } else if (!commentId || commentId == undefined) {
        throw new NotFoundException('comment ID가 존재하지 않습니다.');
      }
      // 댓글존재유무
      const content = this.commentsRepository.findOne({ where: { commentId } });
      if (!content || content == undefined) {
        throw new NotFoundException('해당 댓글이 조회되지 않습니다.');
      }

      const remove = await this.commentsRepository.delete(commentId);
      if (remove.affected === 0) {
        throw new NotFoundException(`해당 댓글이 조회되지 않습니다. commentId: ${commentId}`);
      }
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('댓글 삭제에 실패하였습니다.');
    }
  }
}
