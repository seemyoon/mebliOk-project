import { Global, Module } from '@nestjs/common';

import { FurnitureRepository } from './services/furniture.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repository = [
  UserRepository,
  RefreshTokenRepository,
  FurnitureRepository,
];

@Global()
@Module({
  providers: [...repository],
  exports: [...repository],
})
export class RepositoryModule {}
