'use client';

import { useState } from 'react';
import { INSTITUTE } from '@/lib/site-content';

type Status = 'idle' | 'error' | 'sent';

/**
 * Enquiry form. Client-side validation only — deliberately.
 *
 * The real submission is ALZ-50: a POST to /api/public/leads that validates with
 * Zod, rate-limits, and inserts server-side with the service-role key, because
 * doc 08 requires that anon never holds insert rights on `leads`. ALZ-51 adds OTP
 * verification, ALZ-133 records consent. None of that exists yet, so this does
 * not pretend to send anything.
 */
export function VisitAndEnquire() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const digits = String(form.get('phone') ?? '').replace(/\D/g, '');

    if (!name) {
      setStatus('error');
      setMessage('Please add a name so we know who to ask for.');
      return;
    }
    if (digits.length < 10) {
      setStatus('error');
      setMessage('That number looks short. A 10-digit mobile number, please.');
      return;
    }

    setStatus('sent');
    setMessage('Thank you. We will call you within a day.');
  }

  return (
    <section id="visit" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:py-24">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="text-[clamp(1.9rem,3.8vw,3.1rem)] font-extrabold">Come and see a class</h2>
          <p className="mt-4 max-w-[60ch] text-ink-muted">
            The first class is free and you are welcome to sit through it. Nothing to register,
            nothing to deposit. Turn up, or call and we will tell you what is running that day.
          </p>

          <dl className="mt-6 border-t border-hairline">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-hairline py-3">
              <dt className="text-[0.86rem] text-ink-muted">Address</dt>
              <dd className="text-right font-display font-semibold">
                {INSTITUTE.address.line1},<br />
                {INSTITUTE.address.line2}
              </dd>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-hairline py-3">
              <dt className="text-[0.86rem] text-ink-muted">Phone</dt>
              <dd>
                <a
                  href={`tel:${INSTITUTE.phoneE164}`}
                  className="font-display font-bold tabular-nums text-ink no-underline hover:text-brand-700"
                >
                  {INSTITUTE.phone}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-hairline py-3">
              <dt className="text-[0.86rem] text-ink-muted">WhatsApp</dt>
              <dd>
                <a
                  href={INSTITUTE.whatsapp}
                  target="_blank"
                  rel="noopener"
                  className="font-display font-bold text-ink no-underline hover:text-brand-700"
                >
                  Message the centre
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-hairline py-3">
              <dt className="text-[0.86rem] text-ink-muted">Email</dt>
              <dd>
                <a
                  href={`mailto:${INSTITUTE.email}`}
                  className="font-display font-bold text-ink no-underline hover:text-brand-700"
                >
                  {INSTITUTE.email}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-hairline py-3">
              <dt className="text-[0.86rem] text-ink-muted">Teaching since</dt>
              <dd className="font-display font-bold">{INSTITUTE.establishedLabel}</dd>
            </div>
          </dl>
        </div>

        <form
          id="enquire"
          onSubmit={onSubmit}
          noValidate
          className="scroll-mt-24 rounded-[14px] bg-brand-50 p-6 shadow-[inset_0_0_0_1px_var(--color-brand-100)] sm:p-8"
        >
          <h3 className="text-[clamp(1.15rem,1.4vw,1.4rem)] font-bold">Book a free trial class</h3>
          <p className="mb-5 mt-1 text-[0.95rem] text-ink-muted">
            Tell us the class and the board. We call back within a day.
          </p>

          <div className="mb-3.5">
            <label htmlFor="name" className="mb-1.5 block font-display text-[0.83rem] font-bold">
              Student or parent name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Full name"
              className="w-full rounded-[9px] border border-hairline bg-white px-3.5 py-3 text-base text-ink placeholder:text-ink-muted focus:border-brand-400 focus:outline-none focus:ring-[3px] focus:ring-brand-400/20"
            />
          </div>

          <div className="mb-3.5">
            <label htmlFor="phone" className="mb-1.5 block font-display text-[0.83rem] font-bold">
              Mobile number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="10 digits"
              className="w-full rounded-[9px] border border-hairline bg-white px-3.5 py-3 text-base text-ink placeholder:text-ink-muted focus:border-brand-400 focus:outline-none focus:ring-[3px] focus:ring-brand-400/20"
            />
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2">
            <div>
              <label htmlFor="grade" className="mb-1.5 block font-display text-[0.83rem] font-bold">
                Class
              </label>
              <select
                id="grade"
                name="grade"
                className="w-full rounded-[9px] border border-hairline bg-white px-3.5 py-3 text-base text-ink focus:border-brand-400 focus:outline-none focus:ring-[3px] focus:ring-brand-400/20"
              >
                <option>Classes 1 to 4</option>
                <option>Classes 5 to 8</option>
                <option>Classes 9 to 10</option>
                <option>Classes 11 to 12</option>
              </select>
            </div>
            <div>
              <label htmlFor="board" className="mb-1.5 block font-display text-[0.83rem] font-bold">
                Board
              </label>
              <select
                id="board"
                name="board"
                className="w-full rounded-[9px] border border-hairline bg-white px-3.5 py-3 text-base text-ink focus:border-brand-400 focus:outline-none focus:ring-[3px] focus:ring-brand-400/20"
              >
                <option>West Bengal Board</option>
                <option>CBSE</option>
                <option>ICSE</option>
                <option>Not decided</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'sent'}
            className="mt-4 w-full rounded-[10px] bg-brand-600 px-5 py-3.5 font-display font-bold text-white transition-colors hover:bg-brand-700 disabled:bg-brand-900"
          >
            {status === 'sent' ? 'Thank you. We will call you.' : 'Request a callback'}
          </button>

          <p
            role="status"
            aria-live="polite"
            className={
              status === 'error'
                ? 'mt-3 text-[0.88rem] font-semibold text-brand-800'
                : 'mt-3 text-[0.84rem] leading-relaxed text-ink-muted'
            }
          >
            {status === 'idle'
              ? 'Placeholder form. A live build verifies the number by OTP and records consent before anything is stored.'
              : message}
          </p>
        </form>
      </div>
    </section>
  );
}
