import { NextRequest, NextResponse } from "next/server";
import { GATE_COOKIE, verifyToken } from "@/lib/gate";

const GATE_SECRET = process.env.GATE_SECRET!;

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(GATE_COOKIE)?.value;
  const ok = await verifyToken(token, GATE_SECRET);
  if (ok) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/courses", "/courses/:path*", "/chapter-:id"],
};
