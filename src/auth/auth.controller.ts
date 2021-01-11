import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('/register')
  async signUp(@Body() dto: AuthCredentialsDto): Promise<void> {
    return this.service.register(dto)
  }
}
