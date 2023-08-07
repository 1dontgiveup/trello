import { BaseEntity, Column, Entity, Unique, CreateDateColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Members } from '../Members/members.entity'
import { Boards } from '../Boards/boards.entity'

@Entity()
@Unique(['uid']) // userId 고유값 지정
export class Users extends BaseEntity{

    @PrimaryGeneratedColumn()
    uid: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    nickname: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    // 관계설정 따로 수정해주셔야 합니다.
    // // Users-Members : 1:N 관계
    // @OneToMany(type => Members, board => Members.user, {eager: true})
    // members: Members[]

    // // Users-Boards : 1:N관계
    // @OneToMany(type => Boards, board => Boards.user, {eager: true})
    // boards: Boards[]

}
