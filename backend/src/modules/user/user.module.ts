import { Module } from '@nestjs/common';

import { AwsS3Module } from '../../infrastructure/aws/aws-s3.module';
import { PasswordService } from '../auth/services/password.service';
import { UserController } from './controllers/users.controllers';
import { UserService } from './services/user.service';

@Module({
  imports: [AwsS3Module],
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule {}
