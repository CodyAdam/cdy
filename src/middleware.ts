import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // const url = encodeURI(req.nextUrl.href);
  // const slug = url.split("/").pop();

  // const fetchedData = await fetch(`${req.nextUrl.origin}/api/url/${slug}`);
  // if (fetchedData.status === 404)
  //   return NextResponse.next();

  // const data = await fetchedData.json();
  // if (data?.url)
  //   return NextResponse.redirect(data.url);

  // Redirect all path to /
  if (req.nextUrl.pathname !== "/") return NextResponse.redirect(req.nextUrl.origin + "/");
  else return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}