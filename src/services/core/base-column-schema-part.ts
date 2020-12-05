import { timestamp } from '../../utils/transformers';

import type { EntitySchemaColumnOptions } from 'typeorm';

export default {
  id: {
    type: 'uuid',
    primary: true,
  } as EntitySchemaColumnOptions,
  createdAt: {
    name: 'created_at',
    type: 'timestamp with time zone',
    createDate: true,
    transformer: timestamp,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: 'updated_at',
    type: 'timestamp with time zone',
    updateDate: true,
    transformer: timestamp,
  } as EntitySchemaColumnOptions,
};
