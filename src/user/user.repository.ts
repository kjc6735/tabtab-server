import { TransactionHost } from '@nestjs-cls/transactional';
import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import {
  CreateUserDto,
  PrismaTransactionalAdapter,
  UpdateUserDto,
} from 'src/types/types';

@Injectable()
export class UserRepository {
  constructor(
    private readonly txHost: TransactionHost<PrismaTransactionalAdapter>,
  ) {}

  async findByUnique({ unique }: { unique: number | string }) {
    return this.txHost.tx.user.findUnique({
      where: this.getUnique(unique),
    });
  }

  async create(data: CreateUserDto) {
    return this.txHost.tx.user.create({ data });
  }

  async deleteByUnique({ unique }: { unique: number | string }) {
    return this.txHost.tx.user.delete({
      where: this.getUnique(unique),
    });
  }

  getUnique(unique: string | number) {
    return typeof unique === 'number' ? { id: unique } : { email: unique };
  }

  async update(user: User, update: UpdateUserDto) {
    return this.txHost.tx.user.update({
      where: { email: user.email },
      data: {
        ...update,
      },
    });
  }
}
