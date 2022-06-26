import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { passwordRegEx } from '../../../helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx)
  password: string;
}
