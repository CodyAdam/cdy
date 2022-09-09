![Logo](favicon.png)
# [cdy.pw](https://cdy.pw) URL shortener


## What is this?

This is a URL shortener. It's a simple web app that takes a long URL and returns a short one. It's a bit like [bit.ly](https://bit.ly), but open source.

## How 

For the redirections, I used the [Vercel](https://vercel.com) Edge Middleware feature for no cold start and fast cached response. The links are stored in a MySQL [PlanetScale](https://planetscale.com) database.

## Tech Stack

- [Vercel](https://vercel.com)
- [Next.js](https://nextjs.org)
- [PlanetScale](https://planetscale.com)
- [Prisma](https://prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [NextUI](https://nextui.org)
- [tRPC](https://trpc.io) 

# TODO

- [X] Zero space character URL
- [X] Maximize width of card

- [x] Allow digits (0-9), letters(A-Z, a-z), and a few special characters ("-", ".", "_", "~").