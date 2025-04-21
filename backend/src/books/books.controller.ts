import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { bookSchema, createBookSchema } from '../../../shared/schemas';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { BooksService } from './books.service';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Public: anyone can list & view
  @Get()
  getAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('q') q?: string,
  ) {
    return this.booksService.findAll(+page, +limit, q);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  // Protected: only authenticated users with role=admin
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post()
  @UsePipes(new ZodValidationPipe(createBookSchema))
  create(@Body() dto: Omit<typeof bookSchema._type, 'id'>) {
    return this.booksService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(
      new ValidationPipe({
        whitelist: true, // strip any unexpected props
        skipMissingProperties: true, // allow partial updates
        forbidNonWhitelisted: true, // throw on any extra props
      }),
    )
    dto: UpdateBookDto,
  ) {
    return this.booksService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.delete(id);
  }
}
