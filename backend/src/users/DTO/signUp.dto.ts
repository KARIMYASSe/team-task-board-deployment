import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { customPasswordDecorator } from '../../common/passwordDecorator';

export class signUpDTO {
  @IsString({
    message: 'firstName must be a string',
  })
  @IsNotEmpty({
    message: 'firstName is required',
  })
  @Length(2, 50, {
    message: 'firstName must be between 2 and 50 characters',
  })
  firstName: string;
  @IsString({
    message: 'lastName must be a string',
  })
  @IsNotEmpty({
    message: 'lastName is required',
  })
  @Length(2, 50, {
    message: 'lastName must be between 2 and 50 characters',
  })
  lastName: string;
  @IsNotEmpty({
    message: 'email is required',
  })
  @IsEmail(
    {},
    {
      message: 'email must be a valid email address',
    },
  )
  email: string;
  @IsString({
    message: 'password must be a string',
  })
  @IsNotEmpty({
    message: 'password is required',
  })
  @MinLength(8, {
    message: 'password must be at least 8 characters',
  })
  @MaxLength(64, {
    message: 'password must not exceed 64 characters',
  })
  @IsStrongPassword()
  password: string;
  @customPasswordDecorator({ message: 'password is not match' })
  confirmPassword: string;
}
