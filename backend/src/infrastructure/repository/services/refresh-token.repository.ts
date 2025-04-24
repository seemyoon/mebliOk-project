import { Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository } from 'typeorm';

import { RefreshTokenEntity } from '../../postgres/entities/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RefreshTokenEntity, dataSource.manager);
  }

  public async isRefreshTokenExist(refreshToken: string): Promise<boolean> {
    return await this.existsBy({ refreshToken });
  }

  public async deleteExpiredTokens(): Promise<DeleteResult> {
    // const now = Date;
    return await this.createQueryBuilder()
      .delete()
      .from('refresh_tokens')
      // .where('createdAt < :now', { now }) // used, if we need to delete 30-day or one-day tokens
      .execute();
  }
}
