import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  readonly email: string;

  @Length(6, 20)
  readonly phone: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly firstname: string;

  @IsNotEmpty()
  readonly lastname: string;
}
