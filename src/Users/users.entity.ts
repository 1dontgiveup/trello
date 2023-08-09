import { BaseEntity, Column, Entity, Unique, Index, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Members } from '../Members/members.entity'
import { Boards } from '../Boards/boards.entity'

@Entity()
@Unique(['nickname']) // userId 고유값 지정
export class Users extends BaseEntity{

    @PrimaryGeneratedColumn()
    uid: number;

    @Index({ unique: true })
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    confirmPassword: string;

    @Column()
    nickname: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null;

    // // Relationship
    // // Users-Members : 1:N 관계
    // @OneToMany(() => Members, members => members.users)
    // members: Members[]

    // // Users-Boards : 1:N관계
    // @OneToMany(() => Boards, boards => boards.users)
    // boards: Boards[]

}
