import { Body, Controller, Delete, Get, Put, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { Users } from "./users.entity"
import { UsersService } from './users.service'
import { AuthCredentialsDto } from './dto/auth-credential.dto';


@Controller('api')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    // 1. 회원가입 : localhost:3000/api/signup
    @Post('/signup')
    async signup(@Body() authCredentialsDto: AuthCredentialsDto) { // req.body로 받아와야함
        return await this.usersService.signup(authCredentialsDto);
    }

//     // 2. 로그인 : localhost:3000/api/login
//     @Post('/login')
//     async login() {
//         return await this.usersService.login(email, password);
//     }

//     // 3. 회원정보 조회 : localhost:3000/api/user/:uid (userId)
//     @Get('/user/:uid')
//     async getUserInfo() {
//         return await this.usersService.getUserInfo(uid)
//     }

//     // 4. 회원정보 수정 : localhost:3000/api/user/:uid (userId)
//     @Patch("/user/:uid")
//     async updateUser() {
//         return await this.usersService.updateUser(password, nickname);
//   }


}