import { EntityRepository, Repository } from "typeorm";
import { Cards } from "./cards.entity"


// EntityRepository : 클래스를 사용자정의(custom)저장소로 선언하는데 사용됨. 사용자 지정 저장소는 일부 특정 엔티티를 관리하거나, 일반 저장소일수 있다.
@EntityRepository(Cards) 
export class CardsRepository extends Repository<Cards>{
    
}