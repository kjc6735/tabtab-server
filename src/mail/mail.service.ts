import { TransactionHost } from '@nestjs-cls/transactional';
import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { randomInt } from 'crypto';
import { PrismaTransactionalAdapter } from 'src/types/types';
import { UserService } from 'src/user/user.service';
import { MailRepository } from './mail.repository';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
    private readonly mailRepository: MailRepository,
    private readonly txHost: TransactionHost<PrismaTransactionalAdapter>,
  ) {}

  async sendEmail({ email }: { email: string }) {
    const user = await this.userService.findOne({ unique: email });

    if (!user) throw new BadRequestException('이메일을 다시 확인해주세요.');

    const code = this.genCode(6);

    const expiredAt = new Date();
    expiredAt.setMinutes(expiredAt.getMinutes() + 3);

    await this.mailRepository.upsert({ email, code, expiredAt });

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'TABTAB 서비스 이메일 인증 코드',
        html: `<p>TABTAB 이메일 인증 코드는 ${code} 입니다.</p>`,
      });
    } catch (e) {
      throw new InternalServerErrorException(
        '이메일 전송하는데 오류가 발생했습니다.',
      );
    }
  }

  async verifyCode({ email, code }: { email: string; code: string }) {
    const savedVerifyCode = await this.mailRepository.findByEmail(email);

    if (!savedVerifyCode || savedVerifyCode.code !== code)
      throw new BadRequestException('잘못된 정보입니다. 다시 입력해주세요.');
    if (savedVerifyCode.expiredAt > new Date())
      throw new BadRequestException('잘못된 정보입니다. 다시 입력해주세요.');

    await this.txHost.withTransaction(async () => {
      await this.mailRepository.delete(email);
      await this.userService.update(email, { emailVerified: true });
    });
  }

  genCode(len: number): string {
    let code = '';
    for (let i = 0; i < len; i++) {
      code += randomInt(0, 10);
    }
    return code;
  }
}
