Book Management System

Setup Instructions

Clone the repo

git clone https://github.com/theo-19/book-management-system book-management-system
cd book-management-system

Install dependencies

Backend (NestJS)

cd backend
yarn install

Frontend (Next.js)

cd ../frontend
yarn install

Environment Variables

Create a .env file in both backend and frontend folders with the following keys:

# backend/.env

JWT_SECRET=your_jwt_secret_key
PORT=3001

# frontend/.env.local

NEXT_PUBLIC_API_URL=http://localhost:3001

Run the development servers

Backend

cd backend
yarn start:dev # watch-mode

Frontend

cd frontend
yarn dev

Access the app

Public book catalog: http://localhost:3000/

Admin dashboard: http://localhost:3000/admin (login required)

Architecture & Notes

Frontend

Next.js 13 with the App Router for routing and layouts.

Server-Side Rendering (SSR) for both public catalog and admin list.

React Hook Form + Zod for form handling & validation.

React Query for client-side data caching and mutations.

MUI for styling, with custom theming and consistent design tokens.

Public vs. Admin layouts separated under app/ directory.

AuthContext for JWT token storage and route protection in client components.

Backend

NestJS framework with modular structure (AuthModule, UsersModule, BooksModule).

JWT authentication with Passport.js guards and a simple in-memory user store.

ZodValidationPipe for request validation (or fallback to Nest’s ValidationPipe + DTOs).

In-memory storage for books (no external database). Simple array or JSON file.

Assumptions

Demo users are hardcoded in the backend (e.g., admin@example.com / password).

No persistent database: data resets on server restart.

Single admin role: no granular permissions beyond admin vs. public.

API URL is assumed to be http://localhost:3001; adjust NEXT_PUBLIC_API_URL as needed.

For simplicity, error handling is minimal and focused on happy paths.
