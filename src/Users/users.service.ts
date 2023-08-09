import { Injectable, ConflictException, NotFoundException, HttpException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from "./dto/signup.dto"
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { Users } from './users.entity'
import { UserDto } from './dto/user.dto';
import { UpdateDto } from './dto/update.dto'
import _ from "lodash";
import * as bcrypt from 'bcryptjs'


@Injectable()
export class UsersService{
    
  constructor(
      @InjectRepository(Users) 
      private usersRepository: Repository<Users>,
      private jwtService: JwtService
  ) {}


  // < 1. 회원가입 >
  async signup(signupData: AuthCredentialsDto): Promise<Users> {
    try{
    const { email, nickname, password, confirmPassword } = signupData;
    const existUser = await this.getUserByEmail(email)

    // 유효성 검사
    if(existUser){
      throw new ConflictException(`동일한 이메일의 회원이 이미 존재합니다. email: ${email}`)
    } 

    // 조건문
    if (!email || !nickname || !password || !confirmPassword){
      throw new BadRequestException('미기입된 항목이 있습니다. 모두 입력해주세요.')
    } else if (password !== confirmPassword){
      throw new UnauthorizedException('비밀번호가 확인 비밀번호와 일치하지 않습니다.')
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = this.usersRepository.create({email, nickname, password: hashedPassword})
    return this.usersRepository.save(user);

  }catch(error){
    console.log(error)
    throw new UnauthorizedException('회원가입에 실패하였습니다.')
  }
  }

  // 이메일 중복검사
  async getUserByEmail(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({where: {email, deletedAt: null}});
  }
  // hash저장된 비밀번호를 입력한 비밀번호와 비교
  async comparePasswords(inputPassword: string, storedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedPassword)
  }

  // < 2. 로그인 >
  async login(userDto: UserDto): Promise<{accessToken: string}> {
    const {email, password} = userDto;
    const user = await this.usersRepository.findOne({
      where: {email, deletedAt: null},
    });
    console.log("user", user)
    // 유효성 검사
    if(user.email !== email){
      throw new UnauthorizedException('이메일이 일치하지 않습니다.')
    } 
    // else if (!await this.comparePasswords(password, user.password)){
    //   throw new UnauthorizedException('비밀번호가 일치하지 않습니다.')
    // }

    // user가 존재하고 비밀번호가 일치할 경우 로그인 성공 -> 토큰 생성 (Secret + Payload)
    if(user && (await bcrypt.compare(password, user.password))){
      const payload = { email: user.email }
      const accessToken = await this.jwtService.signAsync(payload);
      return {accessToken: accessToken}
    } else {
      throw new UnauthorizedException('로그인에 실패하였습니다.')
    }
  };
  

  // < 3. 회원정보 조회 >
  async getUserById(uid: number): Promise<Users | undefined> {
    const user = this.usersRepository.findOne({where: {uid, deletedAt: null}});
    if(!user){
      throw new NotFoundException('회원조회에 실패하였습니다.')
    }
    return user // controller에서 특정값만 조회하도록 설정
  }


  // < 4. 회원정보 수정 >
  async updateUser(uid: number, updateDto: UpdateDto): Promise<Users>{
try{
  const { password, newPassword, newNickname } = updateDto;
  const user = await this.usersRepository.findOne({where: {uid, deletedAt: null}});
  
  // 조건문
  if(!password) {
    throw new UnauthorizedException('본인 확인을 위해 기존 비밀번호를 다시 한번 입력해주세요.')
  } else if (!newPassword || !newNickname){
    throw new BadRequestException('미기입된 항목을 모두 입력해주세요. 새로운 비밀번호와, 새로운 닉네임은 기존 비밀번호 및 기존 닉네임과 동일해도 괜찮습니다.')
  }

  // 새로운 비밀번호와 닉네임이 Users 엔터티의 속성을 포함하지 않고 있으므로, 해당 속성을 직접 업데이트해야 함.

  console.log("newPassword", user.password)
  console.log("newNickname", user.nickname)
  console.log("user:", user)
  console.log("P:", await bcrypt.compare(password, user.password))

  if(user && (await bcrypt.compare(password, user.password))){
    user.password = newPassword;
    user.nickname = newNickname;

    const updateUser = this.usersRepository.save(user);

    console.log("updateUser:", updateUser)
    return updateUser;
  };

  // const updateUser = this.usersRepository.update({uid}, {password: newPassword, nickname: newNickname})
  // return this.usersRepository.save(updateUser);

  }catch(error){
    console.log(error)
    throw new UnauthorizedException('회원정보 수정에 실패하였습니다.')
  }
}
};
