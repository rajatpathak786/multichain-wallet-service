import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtAuthService } from '@helpers/jwt.helpers.service';

@Injectable()
export class WebAuthGuard implements CanActivate {
  constructor(private jwtWebAuthService: JwtAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    return this.jwtWebAuthService.validateTokenWeb(req);
  }
}
