import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto"
import { Users } from "./users.entity"
import { ConflictException } from "@nestjs/common";
import _ from "lodash";


// EntityRepository : 클래스를 사용자정의(custom)저장소로 선언하는데 사용됨. 사용자 지정 저장소는 일부 특정 엔티티를 관리하거나, 일반 저장소일수 있다.
@EntityRepository(Users) 
export class UsersRepository extends Repository <Users>{

    // 1. 회원가입
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { email, password, nickname } = authCredentialsDto;
        const user = this.create({ email, password, nickname })
        const existUser = await this.findOne({
            where: {email, deletedAt: null}
        })
        
        if(!_.isNil(existUser)){
            throw new ConflictException(`동일한 이메일 회원이 이미 존재합니다. email: ${email}`)
        }
        await this.save(user);
    }

}