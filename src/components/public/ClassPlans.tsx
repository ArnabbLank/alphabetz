'use client';

import { useMemo, useState } from 'react';
import { CLASS_GROUPS, PLANS, type ClassGroupId } from '@/lib/site-content';
import { cn, formatCurrency } from '@/lib/utils';

export function ClassPlans() {
  const [group, setGroup] = useState<ClassGroupId>('all');

  const visible = useMemo(
    () => (group === 'all' ? PLANS : PLANS.filter((p) => p.groups.includes(group))),
    [group],
  );

  return (
    <section id="fees" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:py-24">
      <p className="mb-6 inline-flex items-center gap-2 rounded-lg bg-spark px-3 py-2 font-display text-[0.82rem] font-semibold text-spark-ink">
        Placeholder fees
      </p>

      <h2 className="text-[clamp(1.9rem,3.8vw,3.1rem)] font-extrabold">
        Which class is your child in?
      </h2>
      <p className="mb-7 mt-4 max-w-[60ch] text-ink-muted">
        Pick a class group. Monthly fees, no admission charge, first class free.
      </p>

      <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Filter by class group">
        {CLASS_GROUPS.map((g) => {
          const active = group === g.id;
          return (
            <button
              key={g.id}
              type="button"
              aria-pressed={active}
              onClick={() => setGroup(g.id)}
              className={cn(
                'rounded-full border px-4 py-2.5 font-display text-[0.95rem] font-bold transition-colors',
                active
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-hairline bg-white text-ink-muted hover:border-brand-300 hover:text-brand-700',
              )}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} of {PLANS.length} programmes shown
      </p>

      {visible.length > 0 ? (
        <ul className="grid list-none gap-4 p-0 md:grid-cols-2">
          {visible.map((p) => (
            <li
              key={p.id}
              className="rounded-[14px] bg-white p-6 shadow-[inset_0_0_0_1px_var(--color-hairline)] transition-shadow hover:shadow-[inset_0_0_0_1px_var(--color-brand-200),0_6px_16px_rgb(0_0_0/0.07)]"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="text-[clamp(1.15rem,1.4vw,1.4rem)] font-bold">{p.title}</h3>
                <p className="whitespace-nowrap font-display text-[1.6rem] font-extrabold tracking-[-0.035em] text-brand-700">
                  {formatCurrency(p.feeMonthly)}
                  <span className="block text-[0.66rem] font-semibold tracking-normal text-ink-muted">
                    A MONTH
                  </span>
                </p>
              </div>
              <p className="mb-4 mt-3 max-w-[48ch] text-base text-ink-muted">{p.summary}</p>
              <ul className="flex list-none flex-wrap gap-1.5 p-0">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-md bg-brand-50 px-2.5 py-1 font-display text-[0.74rem] font-semibold text-brand-700"
                  >
                    {t}
                  </li>
                ))}
                {p.freeTag && (
                  <li className="rounded-md bg-spark px-2.5 py-1 font-display text-[0.74rem] font-semibold text-spark-ink">
                    {p.freeTag}
                  </li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-8 text-ink-muted">
          Nothing running for that group right now.{' '}
          <a href="#enquire" className="font-semibold text-brand-700 underline">
            Ask us what&apos;s next
          </a>
          .
        </p>
      )}
    </section>
  );
}
