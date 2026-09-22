'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import type { TeamMember } from '@/lib/team';

const ease = [0.16, 1, 0.3, 1] as const;
const TICKS_BETWEEN = 16;

const timeline = [
  {
    year: '1974',
    title: 'Fair Fasteners founded',
    body: 'Started with a simple mandate: get the right industrial hardware to the job site—documented, consistent, and on time.',
  },
  {
    year: '1986',
    title: 'Specification-grade programs',
    body: 'Expanded into coated and high-strength lines for regulated commercial and OEM assemblies.',
  },
  {
    year: '1998',
    title: 'Distributor partnerships',
    body: 'Built regional supply relationships so plants and contractors could stock reliably without excess risk.',
  },
  {
    year: '2008',
    title: 'Traceable supply systems',
    body: 'Introduced tighter lot control, inspection packs, and documentation for audit-ready projects.',
  },
  {
    year: '2016',
    title: 'Technical field support',
    body: 'Added engineering support for torque guidance, joint design, and material substitutions.',
  },
  {
    year: '2024',
    title: 'North America focus',
    body: 'Scaled catalog depth and response times for infrastructure, manufacturing, energy, and marine.',
  },
] as const;

const capabilities = [
  {
    title: 'Full-range catalog',
    body: 'Rivets, bolts, screws, nuts, washers, and specialty fasteners—from stock standards to made-to-order runs.',
    image: '/images/manufacturing.jpg',
    href: '/products',
  },
  {
    title: 'Quality & documentation',
    body: 'Sourcing, inspection, and paperwork aligned to load, corrosion class, and coating requirements.',
    image: '/images/energy.jpg',
    href: '/products',
  },
] as const;

type Props = {
  story: string;
  members: TeamMember[];
};

export default function AboutPageContent({ story, members }: Props) {
  const reduce = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  const updateTimelineProgress = useCallback(() => {
    const el = timelineRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setTimelineProgress(max <= 0 ? 1 : el.scrollLeft / max);
  }, []);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    updateTimelineProgress();
    el.addEventListener('scroll', updateTimelineProgress, { passive: true });
    window.addEventListener('resize', updateTimelineProgress);
    return () => {
      el.removeEventListener('scroll', updateTimelineProgress);
      window.removeEventListener('resize', updateTimelineProgress);
    };
  }, [updateTimelineProgress]);

  const scrollTimeline = useCallback(
    (dir: -1 | 1) => {
      const el = timelineRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>('[data-timeline-card]');
      const step = card ? card.offsetWidth : 280;
      el.scrollBy({
        left: dir * step,
        behavior: reduce === true ? 'auto' : 'smooth',
      });
    },
    [reduce],
  );

  return (
    <main className="bg-brand-secondary font-sans text-white">
      {/* Hero — two-line headline; full image, half visible until scroll */}
      <section>
        <div className="mx-auto flex h-[50dvh] w-full max-w-[1600px] flex-col justify-end px-6 pb-8 pt-24 md:px-8 md:pb-10 md:pt-28 lg:px-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.85, ease }}
              className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-white"
            >
              Hardware built for
              <br />
              the real world.
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.85, delay: reduce ? 0 : 0.1, ease }}
              className="max-w-md text-sm text-white/65 md:leading-normal lg:justify-self-end lg:pb-1"
            >
              Fair Fasteners takes on the fastening challenges that slow projects down—applying
              decades of supply and technical discipline to industries where failure is not an
              option.
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.15, ease }}
          className="mx-auto w-full max-w-[1600px] px-6 md:px-8 lg:px-10"
        >
          {/* Full-height image; first viewport only shows the top half */}
          <div className="relative h-[100dvh] w-full overflow-hidden">
            <Image
              src="/images/manufacturing.jpg"
              alt="Fair Fasteners team and operations"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-primary/20 mix-blend-multiply" />
          </div>
        </motion.div>
      </section>

      {/* Mission — staggered images + copy */}
      <section className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-6 py-16 md:px-8 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reduce ? 0 : 0.7, ease }}
          className="relative min-h-[420px] md:min-h-[520px]"
        >
          <div className="absolute top-0 left-0 z-10 aspect-square w-[42%] overflow-hidden bg-white/5">
            <Image
              src="/images/shailesh_patel.png"
              alt=""
              fill
              sizes="220px"
              className="object-cover"
            />
          </div>
          <div className="absolute top-[12%] right-0 z-0 aspect-[3/4] w-[58%] overflow-hidden bg-white/5">
            <Image
              src="/images/energy.jpg"
              alt=""
              fill
              sizes="320px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-secondary/25" />
          </div>
          <div className="absolute bottom-0 left-[8%] z-20 aspect-[4/3] w-[55%] overflow-hidden bg-white/5 shadow-2xl">
            <Image
              src="/images/infrastructure.jpg"
              alt=""
              fill
              sizes="280px"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.08, ease }}
          className="flex flex-col justify-center lg:pl-6"
        >
          <span className="mb-6 block h-px w-10 bg-brand-primary" aria-hidden />
          <h2 className="text-[clamp(1.35rem,2.6vw,1.85rem)] font-semibold leading-snug tracking-tight text-white">
            Fair Fasteners is built on a mission to make industrial hardware predictable—so the
            part on the truck matches the part on the drawing.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-white/60 md:text-[0.975rem] md:leading-[1.7]">
            {story ||
              'We support commercial builders, OEMs, and industrial teams with traceable sourcing, responsive technical support, and specification-grade product from quote through installation.'}
          </p>
          <div className="mt-8 border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-sm">
            <Link
              href="#story"
              className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-white/70"
            >
              Where we come from
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="mx-auto w-full max-w-[1600px] px-6 py-16 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reduce ? 0 : 0.65, ease }}
          className="max-w-xl text-[clamp(1.5rem,3vw,2.35rem)] font-semibold leading-[1.15] tracking-tight text-white"
        >
          The people behind the hardware.
        </motion.h2>

        <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {members.map((member, i) => (
            <motion.li
              key={member.id}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: reduce ? 0 : 0.55,
                delay: reduce ? 0 : 0.05 * i,
                ease,
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(120% 95% at 10% 15%, color-mix(in srgb, var(--brand-primary) 22%, transparent) 0%, transparent 55%), radial-gradient(120% 95% at 85% 70%, color-mix(in srgb, white 8%, transparent) 0%, transparent 60%)',
                    }}
                    aria-hidden
                  />
                )}
              </div>
              <p className="mt-4 text-lg font-semibold tracking-tight text-white">{member.name}</p>
              <p className="mt-1 text-sm text-white/45">{member.role}</p>
              <a
                href="#"
                className="mt-3 inline-flex items-center gap-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/50 transition-colors hover:text-white"
              >
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
              </a>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Story so far — ruler timeline */}
      <section id="story" className="border-t border-white/5">
        <div className="mx-auto w-full max-w-[1600px] px-6 py-16 md:px-8 md:py-20 lg:px-10 lg:py-24">
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-white">
            The story so far
          </h2>

          <div
            ref={timelineRef}
            className="mt-12 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-14 md:overflow-visible"
            style={{ WebkitOverflowScrolling: 'touch' }}
            aria-label="Company timeline"
          >
            <div className="flex w-full min-w-[720px] md:min-w-0">
              {timeline.map((item, index) => {
                const isLast = index === timeline.length - 1;
                return (
                  <article
                    key={item.year}
                    data-timeline-card
                    className="flex min-w-0 flex-1 flex-col"
                  >
                    <div className="flex items-end">
                      <div className="shrink-0">
                        <p className="text-[11px] font-medium tracking-tight text-white">
                          {item.year}
                        </p>
                        <span
                          className="mt-2 block h-8 w-0.5 bg-[#3d9ea8]"
                          aria-hidden
                        />
                      </div>

                      {!isLast ? (
                        <div
                          className="ml-1 flex h-8 min-w-0 flex-1 items-end justify-between self-end"
                          aria-hidden
                        >
                          {Array.from({ length: TICKS_BETWEEN }, (_, tick) => {
                            const mid = tick === Math.floor(TICKS_BETWEEN / 2);
                            const quarter =
                              tick === Math.floor(TICKS_BETWEEN / 4) ||
                              tick === Math.floor((TICKS_BETWEEN * 3) / 4);
                            return (
                              <span
                                key={tick}
                                className={`w-px bg-white/20 ${
                                  mid ? 'h-4' : quarter ? 'h-3' : 'h-2'
                                }`}
                              />
                            );
                          })}
                        </div>
                      ) : null}
                    </div>

                    <h3 className="mt-5 pr-3 text-[13px] font-semibold leading-snug tracking-tight text-white md:pr-4">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 pr-3 text-[11px] leading-relaxed text-white/45 md:pr-4 md:text-xs">
                      {item.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-6 md:mt-12">
            <div
              className="h-px max-w-[220px] flex-1 bg-white/15 md:max-w-[320px]"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(timelineProgress * 100)}
              aria-label="Timeline scroll progress"
            >
              <div
                className="h-px bg-white transition-[width] duration-150 ease-out"
                style={{ width: `${Math.max(8, timelineProgress * 100)}%` }}
              />
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTimeline(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white/50 hover:bg-white/5"
                aria-label="Previous milestones"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => scrollTimeline(1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white/50 hover:bg-white/5"
                aria-label="Next milestones"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto w-full max-w-[1600px] px-6 py-16 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reduce ? 0 : 0.65, ease }}
          className="max-w-3xl text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold leading-[1.12] tracking-tight text-white"
        >
          Built on specification.
          <br />
          Proven in performance.
        </motion.h2>

        <ul className="mt-12 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-2 md:gap-10">
          {capabilities.map((item, i) => (
            <motion.li
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: reduce ? 0 : 0.6,
                delay: reduce ? 0 : 0.06 * i,
                ease,
              }}
            >
              <Link href={item.href} className="group block outline-none">
                <div className="relative aspect-[16/11] overflow-hidden bg-white/5">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-brand-primary/15 mix-blend-multiply" />
                  <span
                    className="absolute bottom-4 left-4 inline-flex h-11 w-11 translate-y-6 items-center justify-center rounded-full bg-brand-primary text-white opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none"
                    aria-hidden
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55 md:text-[0.9375rem]">
                  {item.body}
                </p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Work with us */}
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/images/infrastructure.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary via-brand-secondary/90 to-brand-primary/40" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-8 px-6 py-20 md:grid-cols-2 md:items-end md:gap-16 md:px-8 md:py-24 lg:px-10 lg:py-28">
          <div>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-tight text-white">
              Work with us
            </h2>
            <a
              href="mailto:info@fairfasteners.com"
              className="mt-8 inline-flex h-12 w-12 items-center justify-center bg-brand-primary text-white transition-colors hover:bg-brand-primary-hover"
              aria-label="Get in touch"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={2} aria-hidden />
            </a>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/65 md:justify-self-end md:text-[0.975rem] md:leading-[1.65]">
            If you have a fastening challenge where performance, reliability, and documentation
            are non-negotiable, we would welcome a conversation.
          </p>
        </div>
      </section>
    </main>
  );
}
