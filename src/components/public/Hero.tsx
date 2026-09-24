import Image from 'next/image';
import { STATS, SUBJECTS } from '@/lib/site-content';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-900 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-56 h-[34rem] w-[34rem] rounded-full bg-brand-500 opacity-50 blur-[70px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-56 -left-32 h-[26rem] w-[26rem] rounded-full bg-brand-400 opacity-[0.35] blur-[70px]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-14 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 font-display text-[0.8rem] font-bold shadow-[inset_0_0_0_1px_rgb(255_255_255/0.2)]">
            <span aria-hidden className="h-2 w-2 flex-none rounded-full bg-spark shadow-[0_0_0_3px_rgb(255_207_92/0.25)]" />
            Admissions open · Durgapur
          </span>

          <h1 className="mt-5 max-w-[19ch] text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold text-white">
            Every subject gets a <span className="text-spark">specialist.</span>
          </h1>

          <p className="mt-6 max-w-[46ch] text-[clamp(1.1rem,1.4vw,1.35rem)] leading-[1.5] text-brand-100">
            Classes 1 to 12 for West Bengal Board, CBSE and ICSE. Fifteen teachers, each one
            qualified in what they actually teach.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#enquire"
              className="rounded-xl bg-spark px-7 py-4 font-display text-[1.05rem] font-bold text-spark-ink no-underline transition-colors hover:bg-[#ffc23d]"
            >
              Book a free trial class
            </a>
            <a
              href="#fees"
              className="rounded-xl px-7 py-4 font-display text-[1.05rem] font-bold text-white no-underline shadow-[inset_0_0_0_1px_rgb(255_255_255/0.28)] transition-colors hover:bg-white/10"
            >
              See classes &amp; fees
            </a>
          </div>

          <dl className="mt-11 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/[0.14] sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-brand-900 px-4 pb-4 pt-[1.1rem]">
                <dd className="font-display text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold leading-none tracking-[-0.04em] tabular-nums text-white">
                  {s.value}
                </dd>
                <dt className="mt-1.5 font-display text-[0.78rem] font-medium text-brand-200">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <figure className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[14px] bg-brand-800">
            <Image
              src="/images/centre/index1.jpeg"
              alt="Alphabetz teachers and students together at the Durgapur centre"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              priority
            />
            <figcaption className="absolute bottom-3 left-3 rounded-[7px] bg-[rgb(16_26_43/0.7)] px-2.5 py-1.5 font-display text-[0.74rem] font-bold backdrop-blur-sm">
              The centre · B1 More
            </figcaption>
          </figure>
          <figure className="relative aspect-square overflow-hidden rounded-[14px] bg-brand-800">
            <Image
              src="/images/centre/index0.jpeg"
              alt="Students at work in class"
              fill
              sizes="20vw"
              className="object-cover"
            />
          </figure>
          <figure className="relative aspect-square overflow-hidden rounded-[14px] bg-brand-800">
            <Image
              src="/images/centre/index2.jpg"
              alt="A class in progress"
              fill
              sizes="20vw"
              className="object-cover"
            />
          </figure>
        </div>
      </div>

      {/* Duplicated once so the -50% translate loops seamlessly. */}
      <div aria-hidden className="ticker-host relative overflow-hidden border-y border-white/[0.14] bg-white/[0.035]">
        <div className="flex w-max gap-10 py-3.5 animate-ticker">
          {[...SUBJECTS, ...SUBJECTS].map((s, i) => (
            <span
              key={`${s.name}-${i}`}
              className="inline-flex items-center gap-2.5 whitespace-nowrap font-display text-[0.95rem] font-bold text-brand-200"
            >
              <span className="h-[0.34rem] w-[0.34rem] rounded-full bg-brand-300" />
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
