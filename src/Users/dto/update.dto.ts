import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from "class-validator";

export class UpdateDto {

    @IsNotEmpty({ message: '기존 비밀번호를 입력해주세요.'})
    @IsString()
    password: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/, {
        message: "비밀번호는 최소 4자 이상의 영문 대소문자 및 숫자로 이루어져야 합니다."
    })
    newPassword: string;

    @IsString()
    newNickname: string;
}