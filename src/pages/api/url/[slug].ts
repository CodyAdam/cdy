import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "Please use a normalized url" }));
    return;
  }

  const data = await prisma.shortLink.findUnique({
    where: {
      slug,
    },
  });

  if (!data) {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "Url not found" }));
    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=10000000, stale-while-revalidate");

  return res.json(data);
}