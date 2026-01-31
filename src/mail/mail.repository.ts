import { TransactionHost } from '@nestjs-cls/transactional';
import { Injectable } from '@nestjs/common';
import { PrismaTransactionalAdapter } from 'src/types/types';

@Injectable()
export class MailRepository {
  constructor(
    private readonly txHost: TransactionHost<PrismaTransactionalAdapter>,
  ) {}

  async upsert({
    email,
    code,
    expiredAt,
  }: {
    email: string;
    code: string;
    expiredAt: Date;
  }) {
    return this.txHost.tx.verificationCode.upsert({
      where: { email },
      create: { email, code, expiredAt },
      update: { code, expiredAt },
    });
  }

  findByEmail(email: string) {
    return this.txHost.tx.verificationCode.findUnique({
      where: { email },
    });
  }

  async delete(email: string) {
    return this.txHost.tx.verificationCode.delete({
      where: { email },
    });
  }
}
