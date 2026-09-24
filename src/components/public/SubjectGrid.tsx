import { SUBJECTS } from '@/lib/site-content';

export function SubjectGrid() {
  return (
    <section id="subjects" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:py-24">
      <h2 className="text-[clamp(1.9rem,3.8vw,3.1rem)] font-extrabold">
        Twelve subjects, twelve specialists
      </h2>
      <p className="mb-8 mt-4 max-w-[60ch] text-ink-muted">
        Every subject belongs to someone who studied it. Nobody here teaches outside their degree.
      </p>

      <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))] gap-3 p-0">
        {SUBJECTS.map((s) => (
          <li
            key={s.name}
            className="group rounded-xl bg-brand-50 px-4 pb-4 pt-[1.1rem] shadow-[inset_0_0_0_1px_var(--color-brand-100)] transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:bg-brand-600 hover:shadow-[inset_0_0_0_1px_var(--color-brand-600)]"
          >
            <p className="font-display text-[1.02rem] font-bold tracking-[-0.018em] transition-colors group-hover:text-white">
              {s.name}
            </p>
            <p className="mt-0.5 text-[0.82rem] text-ink-muted transition-colors group-hover:text-brand-100">
              {s.taughtBy}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
