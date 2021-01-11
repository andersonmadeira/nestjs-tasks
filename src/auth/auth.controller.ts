import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('/register')
  async signUp(@Body(ValidationPipe) dto: AuthCredentialsDto): Promise<void> {
    return this.service.register(dto)
  }
}
