import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject('SALT_VALUE') private readonly saltOrRound: number,
    private readonly jwtService: JwtService,
    @Inject('JWT_ACCESS_TOKEN_SECRET')
    private readonly accessTokenScret: string,
    @Inject('JWT_REFRESH_TOKEN_SECRET')
    private readonly refreshTokenSecret: string,
  ) {}
  async signIn({ email, password }: { email: string; password: string }) {
    const user = await this.userService.findOne({
      unique: email,
    });
    if (user == null)
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');

    // create jwt token

    const accessToken = await this.issueToken(user, false);
    const refreshToken = await this.issueToken(user, true);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp({
    email,
    password,
    nickname,
  }: {
    email: string;
    password: string;
    nickname: string;
  }): Promise<void> {
    const existingUser = await this.userService.findOne({
      unique: email,
    });

    if (existingUser)
      throw new ConflictException('이미 존재하는 이메일입니다.');

    const hashedPassword = await bcrypt.hash(password, this.saltOrRound);

    await this.userService.create({
      email,
      password: hashedPassword,
      nickname,
    });
  }

  async issueToken(user: User, isRefreshToken: boolean) {
    return this.jwtService.signAsync(
      {
        sub: user.id.toString(),
        email: user.email,
        type: isRefreshToken ? 'refresh' : 'access',
      },
      {
        secret: isRefreshToken
          ? this.refreshTokenSecret
          : this.accessTokenScret,
        expiresIn: isRefreshToken ? '14d' : '1h',
      },
    );
  }
}
