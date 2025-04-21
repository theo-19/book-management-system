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

  /** Find user by email */
  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }

  /** Find user by id */
  async findById(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  /** Remove sensitive fields before returning */
  sanitize(user: User) {
    const { passwordHash, ...rest } = user;
    return rest;
  }
}
