// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { shortLinkRouter } from "./shortLink";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("shortLink.", shortLinkRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
