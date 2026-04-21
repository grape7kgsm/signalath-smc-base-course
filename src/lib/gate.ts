// Edge-runtime-safe: uses Web Crypto (SubtleCrypto) instead of node:crypto
// so the same module works in middleware (edge) and API routes.

export const GATE_COOKIE = "smc_gate";
export const GATE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

function bufferToBase64url(buf: Uint8Array): string {
  let str = "";
  for (let i = 0; i < buf.length; i++) str += String.fromCharCode(buf[i]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(data: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return bufferToBase64url(new Uint8Array(sigBuf));
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function issueToken(
  discordId: string,
  secret: string,
  maxAge: number = GATE_MAX_AGE,
): Promise<{ value: string; maxAge: number }> {
  const exp = Math.floor(Date.now() / 1000) + maxAge;
  const payload = `${discordId}.${exp}`;
  const sig = await sign(payload, secret);
  return { value: `${payload}.${sig}`, maxAge };
}

export async function verifyToken(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [id, expStr, sig] = parts;
  if (!/^\d{17,20}$/.test(id)) return false;
  const exp = parseInt(expStr, 10);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = await sign(`${id}.${expStr}`, secret);
  return constantTimeEqual(expected, sig);
}
