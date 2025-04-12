import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PasswordService } from '../auth/services/password.service';
import { AwsS3Module } from '../../infrastructure/aws-s3/aws-s3.module';
import { UserController } from './controllers/users.controllers';
import { UserService } from './services/user.service';

@Module({
  imports: [AuthModule, AwsS3Module],
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule {}
