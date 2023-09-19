import { db } from '@/lib/db';
import {
  CategoryId,
  NewCategory,
  categories,
  categoryIdSchema,
  createCategorySchema
} from '@/lib/db/schema/categories';
import { eq } from 'drizzle-orm';

export const createCategory = async (Category: NewCategory) => {
  const newCategory = createCategorySchema.parse(Category);
  try {
    await db.insert(categories).values(newCategory);
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    return { error: message };
  }
};

export const updateCategory = async (id: CategoryId, Category: NewCategory) => {
  const { id: CategoryId } = categoryIdSchema.parse({ id });
  const newCategory = createCategorySchema.parse(Category);
  try {
    await db
      .update(categories)
      .set(newCategory)
      .where(eq(categories.id, CategoryId!));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    return { error: message };
  }
};

export const deleteCategory = async (id: CategoryId) => {
  const { id: CategoryId } = categoryIdSchema.parse({ id });
  try {
    await db.delete(categories).where(eq(categories.id, CategoryId!));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    return { error: message };
  }
};
