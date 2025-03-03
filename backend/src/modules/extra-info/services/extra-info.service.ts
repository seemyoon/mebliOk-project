import { ConflictException, Injectable } from '@nestjs/common';

import { PaymentInfoEntity } from '../../../infrastructure/postgres/entities/payment-info.entity';
import { ShippingInfoEntity } from '../../../infrastructure/postgres/entities/shipping-info.entity';
import { FileTypeEnum } from '../../file-storage/enum/file-type.enum';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { PaymentInfoRepository } from '../../../infrastructure/repository/services/payment-info.repository';
import { ShippingInfoRepository } from '../../../infrastructure/repository/services/shipping-info.repository';
import { UpdatePaymentInfoReqDto } from '../dto/req/update-payment-info.req.dto';
import { UpdateShippingInfoReqDto } from '../dto/req/update-shipping-info.req.dto';

@Injectable()
export class ExtraInfoService {
  constructor(
    private readonly shippingInfoRepository: ShippingInfoRepository,
    private readonly paymentInfoRepository: PaymentInfoRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  public async getShippingInfo(): Promise<ShippingInfoEntity> {
    const count = await this.shippingInfoRepository.count();

    if (count > 1) {
      throw new ConflictException('Shipping info must be only one!');
    }

    let shippingInfo = await this.shippingInfoRepository.findOne({ where: {} });

    if (!shippingInfo) {
      shippingInfo = await this.shippingInfoRepository.save(
        this.shippingInfoRepository.create({
          title: 'Shipping Info',
          description: 'Shipping Info Description',
          body: 'Shipping Info Body',
        }),
      );
    }

    return shippingInfo;
  }

  public async editShippingInfo(
    dto: UpdateShippingInfoReqDto,
  ): Promise<ShippingInfoEntity> {
    const count = await this.shippingInfoRepository.count();

    if (count > 1) {
      throw new ConflictException('Shipping info must be only one!');
    }
    const shippingInfo = await this.shippingInfoRepository.findOne({
      where: {},
    });

    if (!shippingInfo) {
      throw new ConflictException('Shipping info not found!');
    }
    shippingInfo.title = dto?.title;
    shippingInfo.description = dto?.description;
    shippingInfo.body = dto?.body;

    await this.shippingInfoRepository.save(shippingInfo);

    return shippingInfo;
  }

  public async uploadPhotosShippingInfo(
    file: Express.Multer.File,
  ): Promise<void> {
    const count = await this.shippingInfoRepository.count();

    if (count > 1) {
      throw new ConflictException('Shipping info must be only one!');
    }
    const shippingInfo = await this.shippingInfoRepository.findOne({
      where: {},
    });

    if (!shippingInfo) {
      throw new ConflictException('Shipping info not found!');
    }

    const filePath = await this.fileStorageService.uploadFile(
      file,
      FileTypeEnum.IMAGE,
      shippingInfo.id,
    );

    await this.shippingInfoRepository.save({
      ...shippingInfo,
      photos: [...(shippingInfo.photos || []), filePath],
    });
  }

  public async getPaymentInfo(): Promise<PaymentInfoEntity> {
    const count = await this.paymentInfoRepository.count();

    if (count > 1) {
      throw new ConflictException('Payment info must be only one!');
    }

    let paymentInfo = await this.paymentInfoRepository.findOne({ where: {} });

    if (!paymentInfo) {
      paymentInfo = await this.paymentInfoRepository.save(
        this.paymentInfoRepository.create({
          title: 'Payment Info',
          description: 'Payment Info Description',
        }),
      );
    }

    return paymentInfo;
  }

  public async editPaymentInfo(
    dto: UpdatePaymentInfoReqDto,
  ): Promise<PaymentInfoEntity> {
    const count = await this.paymentInfoRepository.count();

    if (count > 1) {
      throw new ConflictException('Payment info must be only one!');
    }
    const paymentInfo = await this.paymentInfoRepository.findOne({
      where: {},
    });

    if (!paymentInfo) {
      throw new ConflictException('Payment info not found!');
    }
    paymentInfo.title = dto?.title;
    paymentInfo.description = dto?.description;

    await this.paymentInfoRepository.save(paymentInfo);

    return paymentInfo;
  }
}
