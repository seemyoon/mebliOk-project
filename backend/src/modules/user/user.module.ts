import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PasswordService } from '../auth/services/password.service';
import { UserController } from './controller/users.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule {}
