import { User } from 'generated/prisma/client';

export class UserDto {
  static from(user: User) {
    const { password, ...data } = user;
    return data;
  }
}
