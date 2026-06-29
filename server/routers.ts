import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  products: router({
    getAll: publicProcedure.query(async () => {
      return db.getAllProducts();
    }),
    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      return db.getProductById(input);
    }),
    getByCategory: publicProcedure.input(z.number()).query(async ({ input }) => {
      return db.getProductsByCategory(input);
    }),
  }),

  categories: router({
    getAll: publicProcedure.query(async () => {
      return db.getAllCategories();
    }),
  }),
});

export type AppRouter = typeof appRouter;
