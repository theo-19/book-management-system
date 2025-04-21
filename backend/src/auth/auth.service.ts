import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      const { passwordHash, ...safeUser } = user;
      return safeUser;
    }
    return null;
  }

  async login(email: string, pass: string) {
    const validUser = await this.validateUser(email, pass);
    if (!validUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      sub: validUser.id,
      email: validUser.email,
      role: validUser.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
