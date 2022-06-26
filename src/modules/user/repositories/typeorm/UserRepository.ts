import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from '../IUserRepository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: Partial<UserEntity>) {
    const user = this.usersRepository.create(data);

    await this.usersRepository.save(user);

    return user;
  }

  async findById(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async save(data: UserEntity) {
    const user = await this.usersRepository.save(data);

    return user;
  }
}
