import { z } from "zod";

// — Login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type LoginInput = z.infer<typeof loginSchema>;

// — Book input (no ID)
export const createBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  description: z.string().min(5),
});
export type CreateBookInput = z.infer<typeof createBookSchema>;

// — Full Book (with ID)
export const bookSchema = createBookSchema.extend({
  id: z.string(),
});
export type Book = z.infer<typeof bookSchema>;

// — Paginated list response
export const booksListSchema = z.object({
  data: z.array(bookSchema),
  total: z.number(),
});
export type BooksList = z.infer<typeof booksListSchema>;
