import { createRouter } from "./context";
import { z } from "zod";

export const shortLinkRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return ctx.prisma.shortLink.findMany() .then(
        (links) => links.map((link) => ({...link, slug: decodeURI(link.slug)})));
    },
  })
  .query("getAllPublic", {
    async resolve({ ctx }) {
      return ctx.prisma.shortLink.findMany({ where: { isPublic: true } })
        .then(
          (links) => links.map((link) => ({...link, slug: decodeURI(link.slug)})));
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
        data: { ...input, slug: encodeURI(input.slug) },
      });
    }
  }).mutation("isValidSlug", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input, ctx }) {
      const slug = input.slug;
      const shortLink = await ctx.prisma.shortLink.findUnique({
        where: {
          slug: encodeURI(slug),
        },
      });
      return shortLink === null;
    }
  })



