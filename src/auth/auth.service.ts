import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginUserInput, LoginUserOutput } from './dto/login-user';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login({ email, password }: LoginUserInput): Promise<LoginUserOutput> {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (await this.validatePassword(password, user.password)) {
      return {
        accessToken: `Bearer ${this.createToken({
          email: user.email,
          active: user.active,
        })}`,
      };
    }
  }

  private async validatePassword(
    candidatePassword: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, hash);
  }

  private createToken(user: Partial<User>): string {
    return this.jwtService.sign(user, {
      secret: this.configService.get<string>('SECRET_PHRASE'),
    });
  }
}
