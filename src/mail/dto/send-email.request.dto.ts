import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendEmailRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
