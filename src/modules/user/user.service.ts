import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto) {
    const checkEmail = await this.usersRepository.findOne({
      where: { email: data.email },
      select: ['id'],
    });

    if (checkEmail) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Email already exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    data.password = await hash(data.password, 10);

    const user = this.usersRepository.create(data);

    return await this.usersRepository.save(user);
  }
}
