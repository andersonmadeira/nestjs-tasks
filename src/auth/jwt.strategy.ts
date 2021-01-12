import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './dto/jwt-payload.interface'
import { User } from './user.entity'
import { UserRepository } from './user.repository'
import * as config from 'config'
import { JwtConfig } from 'src/config.type'

const jwtConfig = config.get<JwtConfig>('jwt')

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload
    const user = this.userRepository.findOne({ username })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
