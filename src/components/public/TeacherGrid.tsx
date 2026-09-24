import Image from 'next/image';
import { TEACHERS } from '@/lib/site-content';

export function TeacherGrid() {
  return (
    <section id="teachers" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:py-24">
      <h2 className="text-[clamp(1.9rem,3.8vw,3.1rem)] font-extrabold">The fifteen</h2>
      <p className="mb-8 mt-4 max-w-[60ch] text-ink-muted">
        Real teachers with real qualifications. These are the institute&apos;s own photographs, not
        stock.
      </p>

      <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(8.5rem,1fr))] gap-3.5 p-0">
        {TEACHERS.map((t) => (
          <li key={t.name} className="group text-center">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-brand-50">
              <Image
                src={t.photo}
                alt={t.name}
                fill
                sizes="(min-width: 1024px) 12vw, 45vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-2.5 font-display text-[0.95rem] font-bold tracking-[-0.015em]">
              {t.name}
            </p>
            <p className="font-display text-[0.82rem] text-brand-700">{t.subject}</p>
            <p className="mt-1 text-[0.8rem] leading-snug text-ink-muted">{t.qualification}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
