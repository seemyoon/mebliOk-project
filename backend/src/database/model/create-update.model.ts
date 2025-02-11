import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateUpdateModel {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
