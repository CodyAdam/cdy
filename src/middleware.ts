import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/󠁮󠁳󠁰󠁬

export async function middleware(req: NextRequest) {  
  const url = encodeURI(req.nextUrl.href);
  const slug = url.split("/").pop();

  const fetchedData = await fetch(`${req.nextUrl.origin}/api/url/${slug}`);
  if (fetchedData.status === 404)
    return NextResponse.next();

  const data = await fetchedData.json();
  if (data?.url)
    return NextResponse.redirect(data.url);

}

export const config = {
  matcher: "/:path/",
};
