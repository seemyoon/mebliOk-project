import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PasswordService } from '../auth/services/password.service';
import { UserController } from './controllers/users.controllers';
import { UserService } from './services/user.service';
import { FileStorageModule } from '../file-storage/file-storage.module';

@Module({
  imports: [AuthModule, FileStorageModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule {}
