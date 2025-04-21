import { Module } from '@nestjs/common';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';

@Module({
  providers: [ZodValidationPipe],
  exports: [ZodValidationPipe],
})
export class CommonModule {}
