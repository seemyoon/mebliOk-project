import { Global, Module } from '@nestjs/common';

import { BrandRepository } from './services/brand.repository';
import { CategoryFurnitureRepository } from './services/category-furniture.repository';
import { FurnitureRepository } from './services/furniture.repository';
import { OrderRepository } from './services/order.repository';
import { QuantityFurnitureInOrderRepository } from './services/quantity-furniture-in-order.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { SubCategoryFurnitureRepository } from './services/subcategory-furniture.repository';
import { UserRepository } from './services/user.repository';

const repository = [
  UserRepository,
  RefreshTokenRepository,
  FurnitureRepository,
  OrderRepository,
  QuantityFurnitureInOrderRepository,
  BrandRepository,
  CategoryFurnitureRepository,
  SubCategoryFurnitureRepository,
];

@Global()
@Module({
  providers: [...repository],
  exports: [...repository],
})
export class RepositoryModule {}
