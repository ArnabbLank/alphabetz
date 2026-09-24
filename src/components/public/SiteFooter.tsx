import { INSTITUTE } from '@/lib/site-content';

/**
 * Brand marks are inline SVG, not lucide icons. lucide-react v1 removed brand
 * glyphs (Facebook / Instagram / Youtube) over trademark concerns, so importing
 * them fails typecheck.
 */
function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
      <path d="M22.7 0H1.3C.6 0 0 .6 0 1.3v21.4c0 .7.6 1.3 1.3 1.3h11.5v-9.3H9.7v-3.6h3.1V8.4c0-3.1 1.9-4.8 4.7-4.8 1.3 0 2.5.1 2.8.1v3.2h-1.9c-1.5 0-1.8.7-1.8 1.8v2.3h3.6l-.5 3.6h-3.1V24h6.1c.7 0 1.3-.6 1.3-1.3V1.3c0-.7-.6-1.3-1.3-1.3z" />
    </svg>
  );
}

function YoutubeMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7 .1 5.7.1 4.8.3 4 .6c-.8.3-1.5.7-2.2 1.4C1.1 2.7.7 3.4.4 4.2.1 5 0 5.9 0 7.2 0 8.5 0 8.9 0 12s0 3.5.1 4.8c0 1.3.2 2.2.5 3 .3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 3 .5C8.5 24 8.9 24 12 24s3.5 0 4.8-.1c1.3 0 2.2-.2 3-.5.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.5-3 .1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c0-1.3-.2-2.2-.5-3-.3-.8-.7-1.5-1.4-2.2C21.3 1.1 20.6.7 19.8.4c-.8-.3-1.7-.5-3-.5C15.5 0 15.1 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.8-10.4a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0z" />
    </svg>
  );
}

const socials = [
  { href: INSTITUTE.social.facebook, label: 'Facebook', Mark: FacebookMark },
  { href: INSTITUTE.social.youtube, label: 'YouTube', Mark: YoutubeMark },
  { href: INSTITUTE.social.instagram, label: 'Instagram', Mark: InstagramMark },
];

const columns = [
  {
    heading: 'Classes',
    links: [
      { href: '#fees', label: 'Classes 1 to 4' },
      { href: '#fees', label: 'Classes 5 to 8' },
      { href: '#fees', label: 'Madhyamik' },
      { href: '#fees', label: 'Higher secondary' },
    ],
  },
  {
    heading: 'The centre',
    links: [
      { href: '#teachers', label: 'Teachers' },
      { href: '#subjects', label: 'Subjects' },
      { href: '#visit', label: 'Visit us' },
      { href: '#enquire', label: 'Free trial class' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink pb-24 pt-16 text-[#9aa6bb] lg:pb-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <h2 className="mb-3.5 font-display text-[0.74rem] font-bold uppercase tracking-[0.07em] text-[#6d7c95]">
              {INSTITUTE.shortName}
            </h2>
            <p className="max-w-[30ch] text-[0.94rem]">
              Coaching for classes 1 to 12 in {INSTITUTE.city}, West Bengal. Teaching since{' '}
              {INSTITUTE.establishedLabel}.
            </p>
            <ul className="mt-5 flex list-none gap-2.5 p-0">
              {socials.map(({ href, label, Mark }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-md border border-white/[0.22] transition-colors hover:border-brand-600 hover:bg-brand-600 hover:text-white"
                  >
                    <Mark />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h2 className="mb-3.5 font-display text-[0.74rem] font-bold uppercase tracking-[0.07em] text-[#6d7c95]">
                {col.heading}
              </h2>
              <ul className="list-none p-0">
                {col.links.map((l) => (
                  <li key={l.label} className="mb-2 text-[0.95rem]">
                    <a href={l.href} className="no-underline hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-[0.83rem]">
          <span>
            © {new Date().getFullYear()} {INSTITUTE.name} · {INSTITUTE.city}, West Bengal
          </span>
          <span>Fees shown are placeholder pending confirmation</span>
        </div>
      </div>
    </footer>
  );
}
