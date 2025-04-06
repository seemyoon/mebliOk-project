import { randomUUID } from 'node:crypto';
import * as path from 'node:path';

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AWSConfig, Config } from '../../../configs/config.type';
import { LoggerService } from '../../../modules/logger/services/logger.service';
import { FileTypeEnum } from '../enum/file-type.enum';

@Injectable()
export class FileStorageService {
  private readonly awsConfig: AWSConfig;
  private readonly s3Client: S3Client;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.awsConfig = this.configService.get<AWSConfig>('aws');
    this.s3Client = new S3Client({
      forcePathStyle: true,
      endpoint: this.awsConfig.endpoint,
      region: this.awsConfig.region,
      credentials: {
        accessKeyId: this.awsConfig.accessKey,
        secretAccessKey: this.awsConfig.secretKey,
      },
    });
  }

  public async uploadFile(
    file: Express.Multer.File,
    fileType: FileTypeEnum,
    userId: string,
  ): Promise<string | undefined> {
    if (!file) {
      this.loggerService.error('File is not provided');
      return;
    }
    try {
      const filePath = this.buildPath(fileType, userId, file.originalname);
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.awsConfig.bucket_name,
          Key: filePath,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: this.awsConfig.ACL,
        }),
      );
      return filePath;
    } catch (error) {
      this.loggerService.error(error);
    }
  }

  public async deleteFile(filePath: string): Promise<void> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.awsConfig.bucket_name,
          Key: filePath,
        }),
      );
    } catch (error) {
      this.loggerService.error(error);
    }
  }

  // public async getPresignedUrl(
  //   filePath: string,
  //   expiresInSeconds: number = 36000000,
  // ): Promise<string> {
  //   try {
  //     const command = new GetObjectCommand({
  //       Bucket: this.awsConfig.bucket_name,
  //       Key: filePath,
  //     });
  //
  //     return await getSignedUrl(this.s3Client, command, {
  //       expiresIn: expiresInSeconds,
  //     });
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  private buildPath(
    fileType: FileTypeEnum,
    userId: string,
    fileName: string,
  ): string {
    return `${fileType}/${userId}/${randomUUID()}${path.extname(fileName)}`;
  }
}
