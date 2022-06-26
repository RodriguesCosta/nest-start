import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { IUserRepository } from './repositories/IUserRepository';

@Injectable()
export class UserService {
  @Inject('UserRepository')
  private userRepository: IUserRepository;

  async create(data: CreateUserDto) {
    const checkEmail = await this.userRepository.findByEmail(data.email);

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

    const user = await this.userRepository.create(data);

    return user;
  }
}
