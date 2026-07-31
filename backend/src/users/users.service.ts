import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { userDocument } from '../DB/models/user.model';
import { signUpDTO } from './DTO/signUp.dto';
import { userRepositoryService } from './../DB/repository/user.repository';
import { compareHashing, Hash } from './../security/hashPassword';
import { signInDto } from './DTO/login.dto';
import { TokenService } from './../common/services/token';

@Injectable()
export class UsersService {
  constructor(
    private readonly _userRepositoryService: userRepositoryService,
    private readonly _TokenService: TokenService,
  ) {}
  async signUp(body: signUpDTO): Promise<userDocument> {
    const { firstName, lastName, email, password, confirmPassword } = body;
    const userExsist = await this._userRepositoryService.findOne({ email });
    if (userExsist) {
      throw new ConflictException('email is already exsist');
    }
    const user = await this._userRepositoryService.create({
      firstName,
      lastName,
      email,
      passwordHash: Hash(password),
    });
    return user;
  }

  async signin(body: signInDto): Promise<any> {
    const { email, password } = body;
    const userExsist =
      await this._userRepositoryService.findOneWithPassword(email);
    if (!userExsist) {
      throw new ConflictException('email is not exsist');
    }
    if (!compareHashing(password, userExsist.passwordHash)) {
      throw new ForbiddenException('password is not correct');
    }
    const token = this._TokenService.generateToken(
      {
        email,
        id: userExsist._id.toString(),
        role: userExsist.role,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      },
    );

    return {
      accessToken: token,
    };
  }
}
