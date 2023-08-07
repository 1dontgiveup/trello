import { BaseEntity, Column, Entity, Unique, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Boards } from '../Boards/boards.entity'
import { Users } from '../Users/users.entity'

@Entity()
@Unique(['mid']) // memberId 고유값 지정
export class Members extends BaseEntity{

    @PrimaryGeneratedColumn()
    mid: number;

    @Column()
    uid: number;

    @Column()
    bid: number;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    // 관계설정 따로 수정해주셔야 합니다.
    // // Members-Boards : N:1 관계
    // @ManyToOne(type => Board, board => board.user, {eager: true})
    // boards: Board[]

    // // Members-Users : N:1 관계
    // @ManyToOne(type => Users, board => Users.user, {eager: true})
    // users: Users

}
