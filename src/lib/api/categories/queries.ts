import { db } from '@/lib/db';
import {
  CategoryId,
  categories,
  categoryIdSchema
} from '@/lib/db/schema/categories';
import { eq } from 'drizzle-orm';

export const getCategories = async (userId: string) => {
  const entities = await db
    .select()
    .from(categories)
    .where(eq(categories.userId, userId));

  return { categories: entities };
};

export const getCategoryById = async (id: CategoryId) => {
  const { id: categoryId } = categoryIdSchema.parse({ id });
  const [entity] = await db
    .select()
    .from(categories)
    .where(eq(categories.id, categoryId));

  return { category: entity };
};
