import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PasswordService } from '../auth/services/password.service';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { UserController } from './controllers/users.controllers';
import { UserService } from './services/user.service';

@Module({
  imports: [AuthModule, FileStorageModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule {}
