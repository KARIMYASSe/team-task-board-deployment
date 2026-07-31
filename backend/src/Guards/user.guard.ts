import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from './../common/services/token';
import { userRepositoryService } from './../DB/repository/user.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _TokenService: TokenService,
    private readonly _userRepositoryService: userRepositoryService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }
    const token = request.headers.authorization?.split(' ')[1] ?? [];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this._TokenService.verifyToken(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this._userRepositoryService.findById(payload.id);
      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
