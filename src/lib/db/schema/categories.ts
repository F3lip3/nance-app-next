import { z } from 'zod';

import { sql } from 'drizzle-orm';
import {
  bigint,
  mysqlEnum,
  mysqlTable,
  timestamp,
  unique,
  varchar
} from 'drizzle-orm/mysql-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { generatePublicId } from '@/lib/utils/public-id';

export const categories = mysqlTable(
  'categories',
  {
    id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
    publicId: varchar('public_id', { length: 16 })
      .notNull()
      .$defaultFn(() => generatePublicId())
      .unique(),
    userId: varchar('user_id', { length: 160 }).notNull(),
    name: varchar('name', { length: 80 }).notNull(),
    status: mysqlEnum('status', ['active', 'inactive', 'removed']).default(
      'active'
    ),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow()
      .notNull(),
    removedAt: timestamp('removed_at')
  },
  self => ({
    unq: unique().on(self.userId, self.name)
  })
);

export const createCategorySchema = createInsertSchema(categories);
export const selectCategorySchema = createSelectSchema(categories);
export const updateCategorySchema = selectCategorySchema;
export const categoryIdSchema = selectCategorySchema.pick({ id: true });

export type Category = z.infer<typeof selectCategorySchema>;
export type CategoryId = z.infer<typeof categoryIdSchema>['id'];
export type NewCategory = z.infer<typeof createCategorySchema>;
