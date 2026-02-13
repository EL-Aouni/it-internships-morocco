import { router } from './trpc';
import { companiesRouter } from './routers/companies';

export const appRouter = router({
  companies: companiesRouter,
});

export type AppRouter = typeof appRouter;
