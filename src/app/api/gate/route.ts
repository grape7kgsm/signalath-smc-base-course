import { NextRequest, NextResponse } from "next/server";
import { GATE_COOKIE, issueToken } from "@/lib/gate";

export const runtime = "nodejs";

const GUILD_ID = process.env.DISCORD_GUILD_ID!;
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!;
const GATE_SECRET = process.env.GATE_SECRET!;

// Discord's new unique-username rules: 2-32 chars, lowercase letters/digits/_/.
// Display names (global_name) and server nicknames are NOT used for auth because
// they aren't unique.
const USERNAME_RE = /^[a-z0-9_.]{2,32}$/;

type DiscordMember = {
  user?: { id: string; username: string };
};

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const raw =
    body && typeof body === "object" && "username" in body
      ? String((body as { username: unknown }).username).trim().toLowerCase()
      : "";

  if (!USERNAME_RE.test(raw)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Discord search endpoint matches by prefix against username/nickname.
  // We filter for an exact username match in the response.
  const searchUrl = `https://discord.com/api/v10/guilds/${GUILD_ID}/members/search?query=${encodeURIComponent(raw)}&limit=100`;
  const discordRes = await fetch(searchUrl, {
    headers: { Authorization: `Bot ${BOT_TOKEN}` },
    cache: "no-store",
  });

  if (discordRes.status !== 200) {
    return NextResponse.json({ ok: false, error: "not_member" }, { status: 403 });
  }

  const members = (await discordRes.json()) as DiscordMember[];
  const match = members.find(
    (m) => m.user && m.user.username.toLowerCase() === raw,
  );

  if (!match || !match.user) {
    return NextResponse.json({ ok: false, error: "not_member" }, { status: 403 });
  }

  const { value, maxAge } = await issueToken(match.user.id, GATE_SECRET);
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
