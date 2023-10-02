// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "../db/client";
import requestIp from "request-ip";

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = Record<string, never>;

/** Use this helper for:
 * - testing, where we dont have to Mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
import { NextApiRequest, NextApiResponse } from "next";

export const createContextInner = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const ip = requestIp.getClientIp(req);
  return {
    prisma,
    ip,
    req, 
    res,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  return await createContextInner(opts.req, opts.res);
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
