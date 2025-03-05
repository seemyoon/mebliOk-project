import { Global, Module } from '@nestjs/common';

import { ApiModule } from '../api/api.module';
import { BannerRepository } from './services/banner.repository';
import { BrandRepository } from './services/brand.repository';
import { CalculateRateFurnitureRepository } from './services/calculate-rate-furniture.repository';
import { CategoryFurnitureRepository } from './services/category-furniture.repository';
import { ColorRepository } from './services/color.repository';
import { FurnitureRepository } from './services/furniture.repository';
import { FurnitureStatisticRepository } from './services/furniture-statistic.repository';
import { MaterialRepository } from './services/material.repository';
import { OrderRepository } from './services/order.repository';
import { PaymentInfoRepository } from './services/payment-info.repository';
import { QuantityFurnitureInOrderRepository } from './services/quantity-furniture-in-order.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { ShippingInfoRepository } from './services/shipping-info.repository';
import { SizeRepository } from './services/size.repository';
import { SubCategoryFurnitureRepository } from './services/subcategory-furniture.repository';
import { UserRepository } from './services/user.repository';

const repository = [
  UserRepository,
  RefreshTokenRepository,
  ShippingInfoRepository,
  FurnitureRepository,
  OrderRepository,
  CalculateRateFurnitureRepository,
  FurnitureStatisticRepository,
  ColorRepository,
  MaterialRepository,
  SizeRepository,
  PaymentInfoRepository,
  QuantityFurnitureInOrderRepository,
  BrandRepository,
  CategoryFurnitureRepository,
  SubCategoryFurnitureRepository,
  BannerRepository,
];

@Global()
@Module({
  imports: [ApiModule],
  providers: [...repository],
  exports: [...repository],
})
export class RepositoryModule {}
