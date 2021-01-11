import { IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class AuthCredentialsDto {
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  username: string

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  // at least 1 uppercase letter and 1 lowercase letter, at least one number or special character
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must be stronger',
  })
  password: string
}
