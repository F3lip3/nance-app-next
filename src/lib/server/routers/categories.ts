import { getCategories } from '@/lib/api/categories/queries';
import { protectedProcedure, router } from '../trpc';

export const categoriesRouter = router({
  getCategories: protectedProcedure.query(async ({ ctx }) => {
    return getCategories(ctx.session.user.id);
  })
});
