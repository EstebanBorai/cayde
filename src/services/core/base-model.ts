import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';

import { timestamp } from '../../utils/transformers';

class BaseModel {
  @Column({
    name: 'created_at',
    type: 'int',
    width: 11,
    nullable: false,
    readonly: true,
    default: () => '0',
    transformer: timestamp,
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'int',
    width: 11,
    nullable: true,
    default: () => null,
    transformer: timestamp,
  })
  updatedAt?: Date;

  @BeforeInsert()
  updateDateCreation(): void {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateDateUpdate(): void {
    this.updatedAt = new Date();
  }
}

export default BaseModel;
