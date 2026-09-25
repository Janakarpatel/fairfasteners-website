'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { motion, useReducedMotion } from 'motion/react';
import contactData from '@/data/contact.json';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Sizing mirrored from williamsgptech.com footer CTA:
 * button height clamp(5.75rem → 10rem), width min clamp(13.5rem) / max 20.5rem,
 * panel padding space-5, gap space-9, section pad section-space-main.
 */
export default function WorkWithUsSection() {
  const reduce = useReducedMotion();
  const btnRef = useRef<HTMLAnchorElement>(null);
  const arrowOutRef = useRef<HTMLSpanElement>(null);
  const arrowInRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const out = arrowOutRef.current;
    const inn = arrowInRef.current;
    if (!btn || !out || !inn) return;

    gsap.set(inn, { xPercent: -100 });
    gsap.set(out, { xPercent: 0 });

    if (reduce) return;

    const enter = () => {
      gsap.to(out, { xPercent: 100, duration: 0.4, ease: 'power2.out' });
      gsap.to(inn, { xPercent: 0, duration: 0.4, ease: 'power2.out' });
    };
    const leave = () => {
      gsap.to(out, { xPercent: 0, duration: 0.4, ease: 'power2.out' });
      gsap.to(inn, { xPercent: -100, duration: 0.4, ease: 'power2.out' });
    };

    btn.addEventListener('mouseenter', enter);
    btn.addEventListener('mouseleave', leave);
    btn.addEventListener('focus', enter);
    btn.addEventListener('blur', leave);

    return () => {
      btn.removeEventListener('mouseenter', enter);
      btn.removeEventListener('mouseleave', leave);
      btn.removeEventListener('focus', enter);
      btn.removeEventListener('blur', leave);
      gsap.killTweensOf([out, inn]);
    };
  }, [reduce]);

  return (
    <section
      className="relative isolate flex items-center justify-center overflow-hidden font-sans"
      aria-labelledby="work-with-us-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/manufacturing.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        className="relative z-10 flex w-full items-center justify-center px-[clamp(1rem,0.7857rem+1.0714vw,2.5rem)] py-[clamp(4.5rem,4rem+2.5vw,8rem)]"
      >
        <motion.div
          className="flex w-full max-w-[min(100%,80rem)] flex-col gap-[clamp(4.5rem,4.286rem+1.071vw,6rem)] bg-[#ffffff4d] px-[clamp(1.25rem,1rem+1.25vw,2.25rem)] py-[clamp(1.25rem,1.1rem+0.75vw,1.75rem)] backdrop-blur-[7.5rem]"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reduce ? 0 : 0.7, ease }}
        >
          <div className="grid grid-cols-1 gap-[clamp(0.5rem,0.321rem+0.893vw,1.75rem)] md:grid-cols-[2fr_3fr]">
            <h2
              id="work-with-us-heading"
              className="self-start text-[clamp(1.5rem,1.279rem+1.164vw,3.13rem)] font-semibold leading-[1.15] tracking-tight text-balance text-brand-secondary"
            >
              Work with us
            </h2>
            <p className="text-sm leading-[1.55] text-brand-secondary/60 md:justify-self-end md:text-right">
              <span className="md:block md:whitespace-nowrap">
                If you have a fastening challenge where performance, reliability,
              </span>{' '}
              <span className="md:block md:whitespace-nowrap">
                and documentation are non-negotiable, we would welcome a conversation.
              </span>
            </p>
          </div>

          <a
            ref={btnRef}
            href={contactData.email.href}
            className="inline-flex h-[clamp(5.75rem,5.143rem+3.036vw,10rem)] w-full min-w-[clamp(13.5rem,11.714rem+8.929vw,20.5rem)] max-w-[20.5rem] items-end justify-between rounded-[0.38rem] bg-brand-primary p-[1em] text-[clamp(0.875rem,0.857rem+0.089vw,1rem)] text-white transition-colors duration-300 hover:bg-brand-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span className="font-medium leading-none tracking-wide">Get in touch</span>
            <span className="relative h-[1em] w-[1em] overflow-hidden" aria-hidden>
              <span ref={arrowOutRef} className="absolute inset-0 flex items-center justify-center">
                <ArrowRight className="h-[0.9em] w-[0.9em]" strokeWidth={2} />
              </span>
              <span ref={arrowInRef} className="absolute inset-0 flex items-center justify-center">
                <ArrowRight className="h-[0.9em] w-[0.9em]" strokeWidth={2} />
              </span>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
