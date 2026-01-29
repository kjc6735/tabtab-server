import { User } from 'generated/prisma/client';

type UserUniqueKeyField = 'id' | 'email';
type CreateUserField = 'nickname' | 'email' | 'password';
type UpdateUserField = 'nickname' | 'profileImageUrl' | 'bio' | 'phoneNumber';

type UserUniqueKey = User[UserUniqueKeyField];
type CreateUserDto = Pick<User, CreateUserField>;
type UpdateUserDto = Omit<User, UpdateUserField>;
