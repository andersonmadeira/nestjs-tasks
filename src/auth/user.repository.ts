import { EntityRepository, Repository } from 'typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { User } from './user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: AuthCredentialsDto) {
    const { username, password } = dto
  }
}