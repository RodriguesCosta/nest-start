import { Body, Controller, Post } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async store(@Body() body: CreateUserDto) {
    const createdUser = await this.usersService.create(body);

    return instanceToPlain(createdUser);
  }
}
