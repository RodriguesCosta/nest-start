import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from '../IUserRepository';

@Injectable()
export class UserMemoryRepository implements IUserRepository {
  private data: UserEntity[];

  constructor() {
    this.data = [];
  }

  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const user = new UserEntity();

    Object.assign(user, data);

    user.id = randomUUID();
    user.createdAt = new Date();
    user.updatedAt = new Date();

    this.data.push(user);

    return user;
  }

  async findById(id: string): Promise<UserEntity> {
    const user = this.data.find((user) => user.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = this.data.find((user) => user.email === email);

    return user;
  }

  async save(data: UserEntity): Promise<UserEntity> {
    const userIndex = this.data.findIndex((user) => user.id === data.id);

    if (!userIndex) {
      throw new Error('User not found');
    }

    data.updatedAt = new Date();

    this.data[userIndex] = data;

    return data;
  }
}
