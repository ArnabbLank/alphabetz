import type { MetadataRoute } from 'next';

/**
 * While the preview gate is on, nothing should be indexed — the site still
 * serves fabricated results and a forgeable admin panel.
 *
 * Once the gate is removed (ALZ-27, ALZ-46) this falls through to the real rules:
 * public pages allowed, portals disallowed. Full SEO work is ALZ-124.
 */

// Must be evaluated per request, not at build. Statically generated, this read
// PREVIEW_GATE_PASSWORD at build time — where it is unset — and shipped
// "Allow: /" on a gated deployment. Verified, then fixed.
export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
  const gated = Boolean(process.env.PREVIEW_GATE_PASSWORD);

  if (gated) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/student/', '/dashboard', '/api/'],
      },
    ],
  };
}
