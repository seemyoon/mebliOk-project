import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor() {}

  public async hashPassword(
    password: string,
    rounds?: number,
  ): Promise<string> {
    return await bcrypt.hash(password, rounds);
  }

  public async comparePassword(
    passwordDto: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(passwordDto, hashedPassword);
  }
}
