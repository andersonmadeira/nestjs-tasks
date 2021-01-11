import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { User } from './user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: AuthCredentialsDto): Promise<void> {
    const { username, password } = dto

    const user = new User()
    user.username = username
    user.salt = await bcrypt.genSalt()
    user.password = await this.hashPassword(password, user.salt)

    try {
      await user.save()
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username already taken!')
      }

      throw new InternalServerErrorException()
    }
  }

  async validateCredentials(dto: AuthCredentialsDto): Promise<boolean> {
    const { username, password } = dto
    const user = await this.findOne({ username })

    return user && (await user.validatePassword(password))
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
