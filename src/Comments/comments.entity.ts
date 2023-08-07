import { BaseEntity, CreateDateColumn, ManyToOne, Column, Entity, Unique, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Cards } from '../Cards/cards.entity'

@Entity()
@Unique(['commentId']) // commentId 고유값 지정
export class Comments extends BaseEntity{

    @PrimaryGeneratedColumn()
    commentId: number;

    @Column()
    cid: number;

    @Column()
    comment: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    // 관계설정 따로 수정해주셔야 합니다.
    // // Comments-Cards : N:1 관계
    // @ManyToOne(type => Cards, cards => cards.comments, {eager: false})
    // cards: Cards[]
}
