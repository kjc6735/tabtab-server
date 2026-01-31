import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class VerificationCodeRequestDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(6)
  @IsNotEmpty()
  code: string;
}
