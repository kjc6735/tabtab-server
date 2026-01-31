import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { MailController } from './mail.controller';
import { MailRepository } from './mail.repository';
import { MailService } from './mail.service';

@Module({
  imports: [
    UserModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          auth: {
            user: configService.get<string>('EMAIL_ADDRESS'),
            pass: configService.get<string>('EMAIL_PASSWORD'),
          },
          secure: true,
        },
        defaults: {
          from: ``,
        },
      }),
    }),
  ],
  providers: [MailService, MailRepository],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
