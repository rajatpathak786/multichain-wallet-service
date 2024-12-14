import { UserRole } from '@lib/enum';
import { IJwtTokenResponse, IRequest } from '@lib/interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@user/entities/user.entity';
import { UserRepositoryService } from '@user/entities/user.repository.service';
import { Request } from 'express';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepositoryService: UserRepositoryService,
  ) {}

  private jwtExpiry = this.configService.get<string>('JWT_EXPIRY');
  private accessSecretKey = this.configService.get<string>('ACCESS_SECRET_KEY');
  private refreshSecretKey =
    this.configService.get<string>('REFRESH_SECRET_KEY');
  private jwtRefreshExpiry =
    this.configService.get<string>('JWT_REFRESH_EXPIRY');

  async generateToken(
    userId: string,
    userRole: UserRole,
    walletAddress?: string,
  ): Promise<IJwtTokenResponse> {
    const accessToken = this.jwtService.sign(
      { id: userId, walletAddress, userRole },
      {
        secret: this.accessSecretKey,
        expiresIn: Number(this.jwtExpiry),
      },
    );
    const refreshToken = this.jwtService.sign(
      { id: userId, walletAddress, userRole, token: accessToken },
      {
        secret: this.refreshSecretKey,
        expiresIn: Number(this.jwtRefreshExpiry),
      },
    );
    return { accessToken, refreshToken };
  }

  async decodeToken(request: Request): Promise<any> {
    const authHeader = request.headers?.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Invalid or missing authorization header',
      );
    }
    const token = authHeader.split(' ')[1];

    try {
      return this.jwtService.verify(token, {
        secret: this.accessSecretKey,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validateTokenWeb(request: Request): Promise<boolean> {
    try {
      const decoded = await this.decodeToken(request);
      const user = await this.userRepositoryService.findById(decoded.id);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      (request as IRequest).userId = user.userId;
      (request as IRequest).walletAddress = decoded.walletAddress;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validateTokenAdmin(request: Request): Promise<boolean> {
    const decoded = await this.decodeToken(request);
    const user = await this.userRepositoryService.findById(decoded.id);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    if (decoded.userRole != UserRole.Admin) {
      throw new UnauthorizedException('User is not admin');
    }
    (request as IRequest).userId = user.userId;
    (request as IRequest).walletAddress = decoded.walletAddress;
    return true;
  }
}
