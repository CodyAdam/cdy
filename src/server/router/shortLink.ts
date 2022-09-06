import { createRouter } from "./context";
import { z } from "zod";

export const shortLinkRouter = createRouter()
  .query("getFromSlug", {
    input: z
      .object({
        slug: z.string(),
      }),
    resolve({ input, ctx }) {
      return ctx.prisma.shortLink.findUnique({
        where: {
          slug: input.slug,
        },
      });
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.shortLink.findMany();
    },
  })
  .query("getAllPublic", {
    async resolve({ ctx }) {
      return await ctx.prisma.shortLink.findMany({ where: { isPublic: true } });
    },
  }).mutation("create", {
    input: z
      .object({
        slug: z.string(),
        url: z.string(),
        isPublic: z.boolean(),
      }),
    resolve({ input, ctx }) {
      return ctx.prisma.shortLink.create({
        data: input,
      });
    }
  });



