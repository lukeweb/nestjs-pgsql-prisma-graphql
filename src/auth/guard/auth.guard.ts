import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const token = request.headers.authorization.split(' ').pop() || '';

    if (!token || token === '') {
      throw new UnauthorizedException('Access token is missing');
    }

    const user = (await this.jwtService.verify(token, {
      secret: this.configService.get<string>('SECRET_PHRASE'),
    })) as Partial<User>;
    if (!user) throw new UnauthorizedException('Invalid access token');

    if (!user.active) throw new UnauthorizedException('Account is not active');

    ctx.getContext().user = user;
    
    return true;
  }
}
