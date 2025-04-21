import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
};

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      email: 'admin@example.com',
      passwordHash: bcrypt.hashSync('password123', 10),
      role: 'admin',
    },
    {
      id: '2',
      email: 'user@example.com',
      passwordHash: bcrypt.hashSync('password123', 10),
      role: 'user',
    },
  ];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  sanitize(user: User) {
    const { passwordHash, ...rest } = user;
    return rest;
  }
}
