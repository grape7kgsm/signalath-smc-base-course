import { NextRequest, NextResponse } from "next/server";
import { GATE_COOKIE, issueToken } from "@/lib/gate";

export const runtime = "nodejs";

const GUILD_ID = process.env.DISCORD_GUILD_ID!;
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!;
const GATE_SECRET = process.env.GATE_SECRET!;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const discordId =
    body && typeof body === "object" && "discordId" in body
      ? String((body as { discordId: unknown }).discordId).trim()
      : "";

  if (!/^\d{17,20}$/.test(discordId)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const discordRes = await fetch(
    `https://discord.com/api/v10/guilds/${GUILD_ID}/members/${discordId}`,
    {
      headers: { Authorization: `Bot ${BOT_TOKEN}` },
      cache: "no-store",
    },
  );

  if (discordRes.status !== 200) {
    return NextResponse.json({ ok: false, error: "not_member" }, { status: 403 });
  }

  const { value, maxAge } = await issueToken(discordId, GATE_SECRET);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(GATE_COOKIE, value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return res;
}
