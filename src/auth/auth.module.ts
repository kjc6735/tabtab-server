import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [
    AuthService,
    {
      provide: 'SALT_VALUE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return Number(configService.get<string>('SALT_VALUE'));
      },
    },
    {
      provide: 'JWT_ACCESS_TOKEN_SECRET',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
      },
    },
    {
      provide: 'JWT_REFRESH_TOKEN_SECRET',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
      },
    },
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
