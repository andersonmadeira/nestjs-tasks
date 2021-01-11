import { Body, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserRepository) private repo: UserRepository) {}

  async register(dto: AuthCredentialsDto): Promise<void> {
    return this.repo.createUser(dto)
  }
}