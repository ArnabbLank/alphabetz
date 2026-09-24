/**
 * Site-wide preview gate.
 *
 * WHY THIS EXISTS
 * This app is not fit for public exposure yet. `middleware.ts` trusts a
 * forgeable `alphabetz-role` cookie, and `/results` publishes fabricated student
 * names and marks from dummy data. Both are fixed later (ALZ-27, ALZ-46), but
 * until then the site must not be reachable by a stranger with the URL.
 *
 * Vercel's own Password Protection would do this, but it is a Pro feature and
 * this project is on hobby. Vercel Authentication is available, but requires the
 * viewer to hold a Vercel account on the team — which defeats the point of
 * sharing a link with the institute owner for review.
 *
 * So the gate lives in the app: HTTP Basic Auth over everything, enabled only
 * when PREVIEW_GATE_PASSWORD is set. Unset in local development and in CI, so
 * neither is affected. Delete this module once ALZ-27 and ALZ-46 land.
 */

export const PREVIEW_GATE_REALM = 'Alphabetz preview';

/** Paths that must stay reachable so the gate itself can render and be crawled-blocked. */
const ALWAYS_OPEN = ['/robots.txt', '/favicon.ico'];

export function isGateEnabled(password: string | undefined): password is string {
  return typeof password === 'string' && password.length > 0;
}

export function isAlwaysOpen(pathname: string): boolean {
  return ALWAYS_OPEN.includes(pathname);
}

/**
 * Length-independent comparison. Not cryptographically timing-safe — the edge
 * runtime has no timingSafeEqual — but it avoids the trivial early-return leak
 * of `a === b` on differing prefixes.
 */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/** Decodes a `Basic base64(user:pass)` header. Returns null when unusable. */
export function parseBasicAuth(header: string | null): { user: string; pass: string } | null {
  if (!header) return null;
  const [scheme, encoded] = header.split(' ');
  if (!scheme || scheme.toLowerCase() !== 'basic' || !encoded) return null;

  let decoded: string;
  try {
    decoded = atob(encoded);
  } catch {
    return null;
  }

  const sep = decoded.indexOf(':');
  if (sep === -1) return null;

  return { user: decoded.slice(0, sep), pass: decoded.slice(sep + 1) };
}

/**
 * Decides whether a request may pass the gate.
 * Any username is accepted; only the password is checked, so there is one shared
 * credential to hand out rather than per-person accounts to manage.
 */
export function isAuthorised(header: string | null, expected: string): boolean {
  const creds = parseBasicAuth(header);
  if (!creds) return false;
  return safeEqual(creds.pass, expected);
}
