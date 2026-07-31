import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { signUpDTO } from './DTO/signUp.dto';
import { userDocument } from '../DB/models/user.model';
import { signInDto } from './DTO/login.dto';
import { AuthGuard } from './../Guards/user.guard';
import type { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly _UsersService: UsersService) {}

  @Post('signUp')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async signUp(@Body() body: signUpDTO): Promise<userDocument> {
    return this._UsersService.signUp(body);
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  async signin(@Body() body: signInDto): Promise<userDocument> {
    return this._UsersService.signin(body);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async profile(@Req() req: Request): Promise<any> {
    const user = req['user'];

    return { user };
  }
}
