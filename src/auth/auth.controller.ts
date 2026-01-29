import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/sign-in.request.dto';
import { SignUpRequestDto } from './dto/sign-up.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() signInRequestDto: SignInRequestDto) {
    return this.authService.signIn(signInRequestDto);
  }

  @Post('sign-up')
  signUp(@Body() signUpRequestDto: SignUpRequestDto) {
    return this.authService.signUp(signUpRequestDto);
  }
}
