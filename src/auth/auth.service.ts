import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { JwtPayload } from './dto/jwt-payload.interface'
import { LoginSuccessDto } from './dto/login-success.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private repo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(dto: AuthCredentialsDto): Promise<void> {
    return this.repo.createUser(dto)
  }

  async login(dto: AuthCredentialsDto): Promise<LoginSuccessDto> {
    const authorized = await this.repo.validateCredentials(dto)

    if (!authorized) {
      throw new UnauthorizedException()
    }

    const payload: JwtPayload = { username: dto.username }
    const accessToken = this.jwtService.sign(payload)

    return { accessToken }
  }
}
