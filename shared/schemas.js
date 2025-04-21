"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksListSchema = exports.bookSchema = exports.createBookSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.createBookSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    author: zod_1.z.string().min(1),
    description: zod_1.z.string().min(5),
});
exports.bookSchema = exports.createBookSchema.extend({
    id: zod_1.z.string(),
});
exports.booksListSchema = zod_1.z.object({
    data: zod_1.z.array(exports.bookSchema),
    total: zod_1.z.number(),
});
//# sourceMappingURL=schemas.js.map