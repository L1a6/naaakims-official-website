'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────────────────────
   STATS — key NAAKIMS numbers (numeric + suffix for counter)
   ──────────────────────────────────────────────────────────── */
const STATS = [
  { end: 15, suffix: '+', label: 'Years of Legacy' },
  { end: 20, suffix: '+', label: 'Global Chapters' },
  { end: 5000, suffix: '+', label: 'Members Worldwide' },
  { end: 100, suffix: '+', label: 'Events Hosted' },
];

/* ────────────────────────────────────────────────────────────
   PILLARS — three core pillars (premium horizontal layout)
   ──────────────────────────────────────────────────────────── */
const PILLARS = [
  {
    num: '01',
    title: 'Academic Excellence',
    description: 'Mentorship programs, medical symposiums, and cross-chapter knowledge exchange that push boundaries.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    alt: 'Medical students in a laboratory studying together',
  },
  {
    num: '02',
    title: 'Global Unity',
    description: 'Connecting Akwa Ibom medical students across Nigeria and beyond into one powerful, united voice.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    alt: 'Diverse group of students united together',
  },
  {
    num: '03',
    title: 'Community Impact',
    description: 'Healthcare outreach, community service, and public health advocacy driven by compassion.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    alt: 'Healthcare community outreach program',
  },
];

/* ────────────────────────────────────────────────────────────
   CountUp — animated counting component using GSAP
   ──────────────────────────────────────────────────────────── */
function CountUp({ end, suffix, started }: { end: number; suffix: string; started: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    if (!started || counted.current || !spanRef.current) return;
    counted.current = true;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: end,
      duration: end > 1000 ? 2.2 : 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        if (spanRef.current) {
          spanRef.current.textContent =
            (end >= 1000 ? Math.floor(obj.val).toLocaleString() : Math.floor(obj.val).toString()) + suffix;
        }
      },
    });
  }, [started, end, suffix]);

  return <span ref={spanRef}>0{suffix}</span>;
}

/* ────────────────────────────────────────────────────────────
   useInView — lightweight IntersectionObserver hook
   ──────────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ════════════════════════════════════════════════════════════
   AboutPreview — first section after the Hero
   ════════════════════════════════════════════════════════════ */
export default function AboutPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRow = useInView(0.3);
  const pillarsRow = useInView(0.15);

  /* ── GSAP entrance for main about block ─────────────────── */
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Overline + heading + paragraphs + CTA stagger
      const textEls = textRef.current?.querySelectorAll('.gsap-fade-up');
      if (textEls && textEls.length) {
        gsap.fromTo(
          textEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: undefined, // no ScrollTrigger needed, we use IntersectionObserver timing
          },
        );
      }

      // Image reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 50, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, delay: 0.3, ease: 'power3.out' },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── GSAP for pillars ───────────────────────────────────── */
  useEffect(() => {
    if (!pillarsRow.visible) return;

    const cards = document.querySelectorAll('.pillar-card');
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      },
    );
  }, [pillarsRow.visible]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">
      {/* ─── STATS STRIP (compact + counting) ────────────── */}
      <div className="relative bg-[#f8faf9] border-b border-gray-100">
        <div
          ref={statsRow.ref}
          className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col items-center justify-center py-5 sm:py-6 relative',
                'transition-all duration-700 ease-out',
                statsRow.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                i === 1 && 'delay-100',
                i === 2 && 'delay-200',
                i === 3 && 'delay-300',
              )}
            >
              {i > 0 && (
                <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gray-200" />
              )}
              <span
                className="text-[clamp(1.35rem,3vw,1.85rem)] font-bold tracking-tight text-[#008751]"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                <CountUp end={stat.end} suffix={stat.suffix} started={statsRow.visible} />
              </span>
              <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium uppercase tracking-[0.12em] mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── MAIN ABOUT BLOCK ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT — Text content */}
          <div ref={textRef}>
            {/* Overline */}
            <div className="gsap-fade-up flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-[#00D084]" />
              <span
                className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00D084]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Who We Are
              </span>
            </div>

            {/* Heading */}
            <h2
              className="gsap-fade-up text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.02em] text-gray-900 mb-5"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Preserving Our Legacy,{' '}
              <span className="text-[#008751]">Empowering</span> Our Future
            </h2>

            {/* Body */}
            <p className="gsap-fade-up text-gray-600 text-[15px] leading-[1.75] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
              The <strong className="text-gray-800 font-semibold">National Association of Akwa Ibom State Medical Students (NAAKIMS) Worldwide</strong> unites
              medical students from Akwa Ibom State studying across universities in Nigeria and beyond. Since our founding, we have been a
              beacon of academic excellence, cultural pride, and professional solidarity.
            </p>
            <p className="gsap-fade-up text-gray-500 text-[14px] leading-[1.75] mb-7" style={{ fontFamily: 'var(--font-inter)' }}>
              Through mentorship, community health outreach, inter-chapter events, and a shared commitment to service,
              we are shaping the next generation of world-class healthcare leaders — one student at a time.
            </p>

            {/* CTA */}
            <div className="gsap-fade-up flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/about"
                className={cn(
                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-md',
                  'bg-[#008751] text-white text-[13px] font-semibold tracking-wide',
                  'shadow-sm hover:bg-[#006d41] active:scale-[0.98]',
                  'transition-all duration-300',
                )}
              >
                Learn Our Story
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/chapters"
                className="text-[13px] font-medium text-[#008751] hover:text-[#006d41] transition-colors inline-flex items-center gap-1.5 group"
              >
                Discover Our Chapters
                <svg
                  width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                >
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* RIGHT — Visual */}
          <div ref={imageRef} className="relative">
            {/* Decorative frame */}
            <div className="absolute -top-3 -right-3 w-full h-full rounded-xl border-2 border-[#00D084]/20 pointer-events-none" />

            {/* Main image */}
            <div className="relative rounded-xl overflow-hidden shadow-xl aspect-4/3">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                alt="NAAKIMS students collaborating together"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top right, rgba(0,80,42,0.25) 0%, transparent 60%)' }}
              />
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white rounded-lg shadow-lg px-5 py-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00D084]/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#008751]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-bold leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                    20+ Chapters
                  </p>
                  <p className="text-gray-500 text-[11px] leading-snug">Across Nigeria & Beyond</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── PILLARS — Premium image cards with GSAP reveal ── */}
      <div className="relative bg-[#fafbfa] overflow-hidden">
        {/* Subtle decorative accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00D084]/3 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#008751]/3 rounded-full blur-3xl pointer-events-none" />

        <div
          ref={pillarsRow.ref}
          className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28"
        >
          {/* Section header — centered */}
          <div className="text-center mb-14 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-6 bg-[#00D084]" />
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00D084]" style={{ fontFamily: 'var(--font-inter)' }}>
                Our Pillars
              </span>
              <span className="h-px w-6 bg-[#00D084]" />
            </div>
            <h2
              className="text-[clamp(1.4rem,3vw,2.1rem)] font-bold leading-[1.15] tracking-[-0.02em] text-gray-900"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              What Drives <span className="text-[#008751]">NAAKIMS</span> Forward
            </h2>
          </div>

          {/* Pillar cards */}
          <div className="grid sm:grid-cols-3 gap-5 lg:gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="pillar-card group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-500 opacity-0"
              >
                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
                  {/* Green accent overlay on hover */}
                  <div className="absolute inset-0 bg-[#00D084]/0 group-hover:bg-[#00D084]/10 transition-colors duration-500" />
                  {/* Number badge */}
                  <span className="absolute top-4 left-4 text-white/60 text-[11px] font-mono tracking-widest bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                    {pillar.num}
                  </span>
                </div>

                {/* Content */}
                <div className="px-5 py-5 sm:px-6 sm:py-6">
                  {/* Green accent line */}
                  <div className="w-6 group-hover:w-10 h-0.5 bg-[#00D084] mb-3.5 transition-all duration-500 ease-out rounded-full" />

                  <h3
                    className="text-gray-900 text-[15px] sm:text-base font-bold mb-2 tracking-[-0.01em] group-hover:text-[#008751] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    className="text-gray-500 text-[13px] leading-[1.7]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
