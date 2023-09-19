import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { Context } from '../trpc/context';

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const trpc = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null
      }
    };
  }
});

/**
 * Check if the user is signed in, otherwise through a UNAUTHORIZED CODE
 */
const isAuthed = trpc.middleware(({ next, ctx }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      session: ctx.session
    }
  });
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = trpc.router;
export const publicProcedure = trpc.procedure;
export const protectedProcedure = trpc.procedure.use(isAuthed);
