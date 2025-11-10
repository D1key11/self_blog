import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getPublishedPosts,
  getPostBySlug,
  getCategories,
  getPostsByCategory,
  getCommentsByPostId,
  createComment,
} from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  // blog router is defined below
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

  blog: router({
    posts: router({
      list: publicProcedure.query(async () => {
        return getPublishedPosts();
      }),
      bySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ input }) => {
          return getPostBySlug(input.slug);
        }),
      byCategory: publicProcedure
        .input(z.object({ categoryId: z.number() }))
        .query(async ({ input }) => {
          return getPostsByCategory(input.categoryId);
        }),
    }),
    categories: router({
      list: publicProcedure.query(async () => {
        return getCategories();
      }),
    }),
    comments: router({
      byPostId: publicProcedure
        .input(z.object({ postId: z.number() }))
        .query(async ({ input }) => {
          return getCommentsByPostId(input.postId);
        }),
      create: protectedProcedure
        .input(
          z.object({
            postId: z.number(),
            content: z.string().min(1).max(5000),
          })
        )
        .mutation(async ({ input, ctx }) => {
          await createComment(input.postId, ctx.user.id, input.content);
          return { success: true };
        }),
    }),
  }),
});

export type AppRouter = typeof appRouter;
