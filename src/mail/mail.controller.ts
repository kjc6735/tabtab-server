import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailRequestDto } from './dto/send-email.request.dto';
import { VerificationCodeRequestDto } from './dto/verification-code.request.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(@Body() sendEmailRequestDto: SendEmailRequestDto) {
    await this.mailService.sendEmail(sendEmailRequestDto);
  }

  @Post('verification')
  async verifyCode(
    @Body() verificationCodeRequestDto: VerificationCodeRequestDto,
  ) {
    await this.mailService.verifyCode(verificationCodeRequestDto);
  }
}
