import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserRole } from '../../../schemas/user.entity';

export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 1000)
  password: string;

  @IsEnum(UserRole, { each: true })
  roles?: Array<UserRole>;
}
