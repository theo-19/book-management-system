import { z } from "zod";
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type LoginInput = z.infer<typeof loginSchema>;
export declare const createBookSchema: z.ZodObject<{
    title: z.ZodString;
    author: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    author: string;
    description: string;
}, {
    title: string;
    author: string;
    description: string;
}>;
export type CreateBookInput = z.infer<typeof createBookSchema>;
export declare const bookSchema: z.ZodObject<{
    title: z.ZodString;
    author: z.ZodString;
    description: z.ZodString;
} & {
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    author: string;
    description: string;
}, {
    id: string;
    title: string;
    author: string;
    description: string;
}>;
export type Book = z.infer<typeof bookSchema>;
export declare const booksListSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        author: z.ZodString;
        description: z.ZodString;
    } & {
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        author: string;
        description: string;
    }, {
        id: string;
        title: string;
        author: string;
        description: string;
    }>, "many">;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        title: string;
        author: string;
        description: string;
    }[];
    total: number;
}, {
    data: {
        id: string;
        title: string;
        author: string;
        description: string;
    }[];
    total: number;
}>;
export type BooksList = z.infer<typeof booksListSchema>;
