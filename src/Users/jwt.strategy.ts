// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { PassportStrategy } from '@nestjs/passport'
// import { InjectRepository } from "@nestjs/typeorm";
// import { ExtractJwt, Strategy } from 'passport-jwt'
// import { ConfigService } from '@nestjs/config';
// import { UsersService } from "src/Users/users.service";
// import { Users } from "src/Users/users.entity";
// // import { MembersService } from "../Members/members.service";
// // import { Members } from '../Members/members.entity'


// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor(
//         @InjectRepository(UsersService)
//         private readonly configService: ConfigService
//         ) {
//             super({  // super: 부모 컴포넌트를 사용
//                 secretOrKey: configService.get('JWT_SECRET'),
//                 jtwFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // Bearer토큰 타입
//             })
//         }
//     async validate(payload){
//         const { email } = payload;
//         const user: Users = await this.usersService.getUserByEmail(email)
//         if (!user){
//             throw new UnauthorizedException();
//         }
//         return user;
//     }
// }