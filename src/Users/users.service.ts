import { Injectable, ConflictException, NotFoundException, HttpException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from "./dto/auth-credential.dto"
import { UsersRepository } from './users.repository';
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { Users } from './users.entity'
import _ from "lodash";
import * as bcrypt from 'bcryptjs'


@Injectable()
export class UsersService{
    
  constructor(
      @InjectRepository(Users) 
      private usersRepository: Repository<Users>,
      private jwtService: JwtService
  ) {}

  // 1. 회원가입
  public async signup(signupData: AuthCredentialsDto): Promise<Users> {
    try{
    const { email, nickname, password, confirmPassword } = signupData;
    const existUser = await this.getUserByEmail(email)
    
    if (!email || !nickname || !password || !confirmPassword){
      throw new BadRequestException('미기입된 항목이 있습니다. 모두 입력해주세요.')
    } else if (password !== confirmPassword){
      throw new ConflictException('비밀번호가 확인 비밀번호와 일치하지 않습니다.')
    }
    
    // 유효성 검사
    if(existUser){
      throw new ConflictException(`동일한 이메일의 회원이 이미 존재합니다. email: ${email}`)
    } 

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10) 

    // 이거 로그인에서!
    const insertResult = await this.usersRepository.insert({email, nickname, password: hashedPassword})
    const payload = { id: insertResult.identifiers[0].id };
    const accessToken = await this.jwtService.signAsync(payload);

    const user = this.usersRepository.create({email, nickname, password: hashedPassword})
    return this.usersRepository.save(user);

  }catch(error){
    console.log(error)
    throw new UnauthorizedException('회원가입에 실패하였습니다.')
  }
  }

  // 이메일 중복검사
  public async getUserByEmail(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({where: {email}});
  }

  // 유저아이디 중복검사
  public async getUserById(uid: number): Promise<Users | undefined> {
    return this.usersRepository.findOne({where: {uid}});
  }

  
}