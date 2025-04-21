// backend/src/auth/auth.controller.ts
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { LoginInput, loginSchema } from '../../../shared/schemas';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() dto: LoginInput) {
    return this.authService.login(dto.email, dto.password);
  }
}
