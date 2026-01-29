import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/types/types';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findOne({ unique }: { unique: number | string }) {
    return this.userRepository.findByUnique({
      unique,
    });
  }

  create(data: CreateUserDto) {
    return this.userRepository.create(data);
  }
}
