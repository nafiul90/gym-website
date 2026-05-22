import { NextResponse } from "next/server";

const URELAA_DOMAIN = "gyminfo.xyz";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // Strip port for matching
  const host = hostname.split(":")[0];

  // Already on a slug or custom-domain internal route — let it through
  if (
    url.pathname.startsWith("/c-domain/") ||
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  // localhost / bare urelaa.com — no rewrite needed; [slug] routing handles it
  if (
    host === "localhost" ||
    host === "192.168.0.103" ||
    host === URELAA_DOMAIN ||
    host === `www.${URELAA_DOMAIN}`
  ) {
    return NextResponse.next();
  }

  // Subdomain: slug.urelaa.com → rewrite to /slug (preserving the path)
  if (host.endsWith(`.${URELAA_DOMAIN}`)) {
    const slug = host.replace(`.${URELAA_DOMAIN}`, "");
    url.pathname = `/${slug}${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Custom domain — encode hostname in base64url and proxy to /c-domain/[host].
  // NOTE: this path must NOT start with "_" — App Router treats `_folder` as a
  // private (non-routable) folder, which is why an earlier `/_c/` route 404'd.
  const encoded = Buffer.from(host).toString("base64url");
  url.pathname = `/c-domain/${encoded}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Run on all paths except static files and Next internals
    // "/((?!_next/static|_next/image|favicon.ico).*)",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
