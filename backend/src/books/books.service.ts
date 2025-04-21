import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Book, CreateBookInput } from '../../../shared/schemas';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  findAll(page = 1, limit = 10, q?: string) {
    let items = this.books;
    if (q) {
      const term = q.toLowerCase();
      items = items.filter(
        (b) =>
          b.title.toLowerCase().includes(term) ||
          b.author.toLowerCase().includes(term),
      );
    }
    const start = (page - 1) * limit;
    return {
      data: items.slice(start, start + limit),
      total: items.length,
    };
  }

  findOne(id: string) {
    const book = this.books.find((b) => b.id === id);
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }

  create(dto: CreateBookInput) {
    const newBook: Book = { id: uuid(), ...dto };
    this.books.push(newBook);
    return newBook;
  }

  update(id: string, dto: Partial<CreateBookInput>) {
    const book = this.findOne(id);
    Object.assign(book, dto);
    return book;
  }

  delete(id: string) {
    const idx = this.books.findIndex((b) => b.id === id);
    if (idx === -1) throw new NotFoundException(`Book with id ${id} not found`);
    this.books.splice(idx, 1);
    return { deleted: true };
  }
}
