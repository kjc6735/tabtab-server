import { Injectable } from '@nestjs/common';
import { assert } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/types/types';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUnique({ unique }: { unique: number | string }) {
    return this.prisma.user.findUnique({
      where: this.getUnique(unique),
    });
  }

  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async deleteByUnique({ unique }: { unique: number | string }) {
    return this.prisma.user.delete({
      where: this.getUnique(unique),
    });
  }

  getUnique(unique: string | number) {
    if (typeof unique !== 'string' && typeof unique !== 'number') assert();
    return typeof unique === 'number' ? { id: unique } : { email: unique };
  }
}
