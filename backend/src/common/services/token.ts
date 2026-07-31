import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly _JwtService: JwtService) {}

  generateToken(
    payload: Record<string, unknown>,
    options: JwtSignOptions,
  ): string {
    return this._JwtService.sign(payload, options);
  }

  verifyToken(token: string, options: JwtVerifyOptions): any {
    return this._JwtService.verify(token, options);
  }
}
