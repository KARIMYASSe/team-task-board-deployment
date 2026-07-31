import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class signInDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
