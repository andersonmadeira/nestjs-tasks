import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Task } from 'src/tasks/task.entity'
import { Exclude } from 'class-transformer'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  @Exclude()
  password: string

  @Column()
  @Exclude()
  salt: string

  @OneToMany(
    type => Task,
    task => task.user,
    { eager: true },
  )
  @Exclude()
  tasks: Task[]

  async validatePassword(password: string): Promise<boolean> {
    return (await bcrypt.hash(password, this.salt)) === this.password
  }
}
