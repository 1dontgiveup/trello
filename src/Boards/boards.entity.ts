import { BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, Column, Entity, Unique, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Members } from '../Members/members.entity';
import { Users } from '../Users/users.entity';
import { Lists } from '../Lists/lists.entity';

@Entity()
@Unique(['bid']) // boardId 고유값 지정
export class Boards extends BaseEntity {
  @PrimaryGeneratedColumn()
  bid: number;

  @Column()
  uid: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  color: string;

  @Column({ type: 'varchar' })
  explanation: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 관계설정 따로 수정해주셔야 합니다.
  // // Boards-Members : 1:N 관계
  // @OneToMany(type => Members, board => Members.board, {eager: true})
  // members: Members

  // // Boards-Users : N:1 관계
  // @ManyToOne(type => Users, users => Users.board, {eager: false})
  // users: Users

  // // Boards-Lists : 1:N 관계
  // @OneToMany(type => Lists, lists => Lists.board, {eager: true})
  // lists: Lists[]
}
