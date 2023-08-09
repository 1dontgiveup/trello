import { IsString, IsNotEmpty } from "class-validator";

export class UserDto {
    @IsNotEmpty({ message: '이메일을 입력해주세요.'})
    @IsString()
    email: string;

    @IsNotEmpty({ message: '비밀번호를 입력해주세요.'})
    @IsString()
    password: string;
}