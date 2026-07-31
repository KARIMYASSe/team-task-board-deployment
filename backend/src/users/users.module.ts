// import { Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';
// import { userModel } from './../DB/models/user.model';
// import { userRepositoryService } from './../DB/repository/user.repository';
// import { JwtService } from '@nestjs/jwt';
// import { TokenService } from './../common/services/token';
// import { AuthGuard } from './../Guards/user.guard';

// @Module({
//   imports: [userModel],
//   controllers: [UsersController],
//   providers: [
//     UsersService,
//     userRepositoryService,
//     AuthGuard,
//     JwtService,
//     TokenService,
//   ],
//   exports: [AuthGuard],
// })
// export class UsersModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { userModel } from '../DB/models/user.model';
import { userRepositoryService } from '../DB/repository/user.repository';
import { AuthGuard } from '../Guards/user.guard';
import { TokenService } from '../common/services/token';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [userModel, JwtModule.register({})],

  controllers: [UsersController],

  providers: [UsersService, userRepositoryService, TokenService, AuthGuard],

  exports: [AuthGuard, TokenService, userRepositoryService],
})
export class UsersModule {}
