import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { PrismaClient, User } from 'generated/prisma/client';

type UserUniqueKeyField = 'id' | 'email';
type CreateUserField = 'nickname' | 'email' | 'password';
type UpdateUserField =
  | 'nickname'
  | 'profileImageUrl'
  | 'bio'
  | 'phoneNumber'
  | 'emailVerified'
  | 'phoneVerified';

type UserUniqueKey = User[UserUniqueKeyField];
type CreateUserDto = Pick<User, CreateUserField>;
type UpdateUserDto = Partial<Pick<User, UpdateUserField>>;

// Prisma Transactional 타입 alias
type PrismaTransactionalAdapter = TransactionalAdapterPrisma<PrismaClient>;
