import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/types/types';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne({ unique }: { unique: number | string }) {
    return this.userRepository.findByUnique({
      unique,
    });
  }

  async create(data: CreateUserDto) {
    return this.userRepository.create(data);
  }

  async update(email: string, update: UpdateUserDto) {
    const user = await this.userRepository.findByUnique({
      unique: email,
    });
    if (!user) throw new BadRequestException('이메일을 다시 확인해주세요.');

    return this.userRepository.update(user, update);
  }
}
