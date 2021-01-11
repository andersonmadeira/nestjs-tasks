import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { LoginSuccessDto } from './dto/login-success.dto'
import { User } from './user.entity'
import { GetUser } from './get-user.decorator'
import { UserDto } from './dto/user.dto'

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('/register')
  signUp(@Body(ValidationPipe) dto: AuthCredentialsDto): Promise<void> {
    return this.service.register(dto)
  }

  @Post('/login')
  login(
    @Body(ValidationPipe) dto: AuthCredentialsDto,
  ): Promise<LoginSuccessDto> {
    return this.service.login(dto)
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  getUser(@GetUser() user: User): UserDto {
    const { id, username } = user
    return { id, username }
  }
}
