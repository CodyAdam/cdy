import { env } from "../../env/server.mjs";
import { createRouter } from "./context";
import { z } from "zod";

export const shortLinkRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return ctx.prisma.shortLink
        .findMany()
        .then((links) =>
          links.map((link) => ({ ...link, slug: decodeURI(link.slug) }))
        );
    },
  })
  .query("getAllPublic", {
    async resolve({ ctx }) {
      return ctx.prisma.shortLink
        .findMany({ where: { isPublic: true } })
        .then((links) =>
          links.map((link) => ({ ...link, slug: decodeURI(link.slug) }))
        );
    },
  })
  .mutation("create", {
    input: z.object({
      slug: z.string(),
      url: z.string(),
      isPublic: z.boolean(),
      token: z.string(),
    }),
    async resolve({ input, ctx }) {
      console.log(ctx.ip);
      console.log(input);
      if (ctx.ip === null) {
        throw new Error("Invalid IP address");
      }
      // Validate the token by calling the
      // "/siteverify" API endpoint.
      const formData = new FormData();
      formData.append("secret", env.SECRET_TURNSTILE);
      formData.append("response", input.token);
      formData.append("remoteip", ctx.ip);
      const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
      const result = await fetch(url, {
        body: formData,
        method: "POST",
      });

      const outcome = await result.json();
      if (outcome.success) {
        return ctx.prisma.shortLink.create({
          data: {
            url: input.url,
            isPublic: input.isPublic,
            slug: encodeURI(input.slug),
          },
        });
      } else {
        throw new Error("Invalid captcha token");
      }
    },
  })
  .mutation("isValidSlug", {
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
    },
  });
