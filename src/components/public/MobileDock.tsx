import { INSTITUTE } from '@/lib/site-content';

/**
 * Fixed bottom dock, mobile only.
 *
 * Exists because the two things a parent actually wants — call, or book a trial —
 * should never be a scroll away on a phone. It also resolves a real layout bug:
 * keeping the primary CTA in the top bar pushed the menu button off-screen at
 * 320px. Below lg the dock owns that action instead.
 */
export function MobileDock() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-hairline bg-white/[0.94] backdrop-blur-lg shadow-[0_-1px_3px_rgb(0_0_0/0.07)] lg:hidden"
    >
      <a
        href={`tel:${INSTITUTE.phoneE164}`}
        className="px-2 py-3.5 text-center font-display text-[0.97rem] font-bold text-ink no-underline"
      >
        Call the centre
      </a>
      <a
        href="#enquire"
        className="bg-brand-600 px-2 py-3.5 text-center font-display text-[0.97rem] font-bold text-white no-underline active:bg-brand-700"
      >
        Free trial class
      </a>
    </nav>
  );
}
