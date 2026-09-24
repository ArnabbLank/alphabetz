'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { INSTITUTE, NAV_LINKS } from '@/lib/site-content';
import { cn } from '@/lib/utils';

export function TopBar() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-white/[0.86] backdrop-blur-xl backdrop-saturate-150',
        'transition-[border-color,box-shadow] duration-300',
        stuck ? 'border-hairline shadow-[0_1px_3px_rgb(0_0_0/0.06)]' : 'border-transparent',
      )}
    >
      <div className="mx-auto flex min-h-[4.4rem] max-w-7xl items-center gap-4 px-5 sm:px-8">
        <Link href="/" className="mr-auto flex items-center gap-2.5 text-ink no-underline">
          <Image
            src="/images/centre/logo.jpg"
            alt=""
            width={95}
            height={30}
            className="h-[30px] w-auto"
            priority
          />
          <span className="font-display text-[1.3rem] font-extrabold tracking-[-0.035em]">
            {INSTITUTE.shortName}
          </span>
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 font-display text-[0.95rem] font-semibold tracking-[-0.01em] text-ink-muted no-underline transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={`tel:${INSTITUTE.phoneE164}`}
          className="hidden font-display text-[0.95rem] font-bold tabular-nums text-ink no-underline hover:text-brand-600 lg:inline"
        >
          {INSTITUTE.phone}
        </a>

        {/* Below lg the dock owns the primary action, so this would only crowd the bar. */}
        <a
          href="#enquire"
          className="hidden rounded-[10px] bg-brand-600 px-5 py-3 font-display text-[0.97rem] font-bold text-white no-underline shadow-[inset_0_1px_0_rgb(255_255_255/0.28)] transition-colors hover:bg-brand-700 lg:inline-flex"
        >
          Free trial class
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid h-10 w-10 place-items-center rounded-[9px] border border-hairline bg-white lg:hidden"
        >
          {open ? <X className="h-[1.1rem] w-[1.1rem]" /> : <Menu className="h-[1.1rem] w-[1.1rem]" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Menu"
          className="border-t border-hairline bg-white px-5 pb-4 sm:px-8 lg:hidden"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-hairline py-3 font-display font-semibold text-ink no-underline"
            >
              {l.label}
            </a>
          ))}
          <a
            href={`tel:${INSTITUTE.phoneE164}`}
            className="mt-4 block rounded-[10px] bg-brand-600 py-3 text-center font-display font-bold text-white no-underline"
          >
            Call {INSTITUTE.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
