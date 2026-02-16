'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────────
   STATS — key numbers
   ───────────────────────────────────────────────────────────── */
const STATS = [
  { end: 15,   suffix: '+', label: 'Years'     },
  { end: 20,   suffix: '+', label: 'Chapters'  },
  { end: 5000, suffix: '+', label: 'Members'   },
  { end: 100,  suffix: '+', label: 'Events'    },
];

/* ─────────────────────────────────────────────────────────────
   PILLARS — cinematic image cards
   ───────────────────────────────────────────────────────────── */
const PILLARS = [
  {
    num: '01',
    title: 'Academic Excellence',
    sub: 'Mentorship programs, symposiums, and cross-chapter knowledge exchange that push boundaries in medical education.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '02',
    title: 'Global Unity',
    sub: 'Connecting Akwa Ibom medical students across Nigeria and beyond into one powerful united voice for change.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '03',
    title: 'Community Impact',
    sub: 'Healthcare outreach, community service, and public health advocacy driven by deep compassion and purpose.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=900&q=80',
  },
];

/* ─────────────────────────────────────────────────────────────
   CountUp — GSAP-powered counter
   ───────────────────────────────────────────────────────────── */
function CountUp({ end, suffix, started }: { end: number; suffix: string; started: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const ran = useRef(false);
  useEffect(() => {
    if (!started || ran.current || !ref.current) return;
    ran.current = true;
    const o = { v: 0 };
    gsap.to(o, {
      v: end,
      duration: end > 999 ? 2.4 : 1.8,
      ease: 'power2.out',
      onUpdate() {
        if (ref.current)
          ref.current.textContent =
            (end >= 1000 ? Math.floor(o.v).toLocaleString() : String(Math.floor(o.v))) + suffix;
      },
    });
  }, [started, end, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─────────────────────────────────────────────────────────────
   useInView — scroll-triggered once
   ───────────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

/* ═════════════════════════════════════════════════════════════
   AboutPreview Component
   ═════════════════════════════════════════════════════════════ */
export default function AboutPreview() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);
  const imageClipRef = useRef<HTMLDivElement>(null);
  const imageInner   = useRef<HTMLDivElement>(null);
  const statsRef     = useInView(0.4);
  const pillarsRef   = useInView(0.12);

  /* ── GSAP — About block cinematic entrance ─────────────── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const els = textRef.current?.querySelectorAll('.g-up');
      if (els?.length) {
        gsap.fromTo(els,
          { opacity: 0, y: 48, clipPath: 'inset(0 0 100% 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0, stagger: 0.1, ease: 'power3.out' },
        );
      }
      // cinematic wipe on image
      if (imageClipRef.current) {
        gsap.fromTo(imageClipRef.current,
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.4, delay: 0.25, ease: 'power4.inOut' },
        );
      }
      // Ken-Burns scale
      if (imageInner.current) {
        gsap.fromTo(imageInner.current,
          { scale: 1.18 },
          { scale: 1, duration: 1.8, delay: 0.25, ease: 'power3.out' },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── GSAP — Pillar cinematic reveals ───────────────────── */
  useEffect(() => {
    if (!pillarsRef.vis) return;
    const cards = document.querySelectorAll('.p-card');
    if (!cards.length) return;

    cards.forEach((card, i) => {
      const img  = card.querySelector('.p-img');
      const txt  = card.querySelectorAll('.p-txt');
      const line = card.querySelector('.p-line');

      if (img) gsap.fromTo(img,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.2, delay: i * 0.2, ease: 'power4.inOut' },
      );
      if (txt.length) gsap.fromTo(txt,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.85, delay: 0.35 + i * 0.2, stagger: 0.08, ease: 'power3.out' },
      );
      if (line) gsap.fromTo(line,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, delay: 0.55 + i * 0.2, ease: 'power3.out' },
      );
    });
  }, [pillarsRef.vis]);

  /* ══════════════════════════════════════════════════════════ */
  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">

      {/* ─── STATS — ultra-compact dark strip ────────────── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #002a14 0%, #003d1e 50%, #002a14 100%)' }}>
        <div className="absolute -top-20 left-1/3 w-72 h-72 bg-[#00D084]/8 rounded-full blur-3xl pointer-events-none" />
        <div ref={statsRef.ref} className="relative max-w-6xl mx-auto grid grid-cols-4 divide-x divide-white/8">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                'flex flex-col items-center justify-center py-3.5 sm:py-5',
                'transition-all duration-700 ease-out',
                statsRef.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
              )}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="text-[clamp(1.05rem,2.5vw,1.55rem)] font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
                <CountUp end={s.end} suffix={s.suffix} started={statsRef.vis} />
              </span>
              <span className="text-[8px] sm:text-[10px] text-white/40 font-semibold uppercase tracking-[0.18em] mt-0.5">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── MAIN ABOUT ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Text */}
          <div ref={textRef}>
            <div className="g-up flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-[#00D084]" />
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00D084]" style={{ fontFamily: 'var(--font-inter)' }}>Who We Are</span>
            </div>
            <h2 className="g-up text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.02em] text-gray-900 mb-5" style={{ fontFamily: 'var(--font-poppins)' }}>
              Preserving Our Legacy,{' '}<span className="text-[#008751]">Empowering</span> Our Future
            </h2>
            <p className="g-up text-gray-600 text-[15px] leading-[1.75] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
              The <strong className="text-gray-800 font-semibold">National Association of Akwa Ibom State Medical Students (NAAKIMS) Worldwide</strong> unites
              medical students from Akwa Ibom State studying across universities in Nigeria and beyond. Since our founding, we have been a
              beacon of academic excellence, cultural pride, and professional solidarity.
            </p>
            <p className="g-up text-gray-500 text-[14px] leading-[1.75] mb-7" style={{ fontFamily: 'var(--font-inter)' }}>
              Through mentorship, community health outreach, inter-chapter events, and a shared commitment to service,
              we are shaping the next generation of world-class healthcare leaders — one student at a time.
            </p>
            <div className="g-up flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/about" className={cn('inline-flex items-center gap-2 px-5 py-2.5 rounded-md', 'bg-[#008751] text-white text-[13px] font-semibold tracking-wide', 'shadow-sm hover:bg-[#006d41] active:scale-[0.98]', 'transition-all duration-300')}>
                Learn Our Story
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/chapters" className="text-[13px] font-medium text-[#008751] hover:text-[#006d41] transition-colors inline-flex items-center gap-1.5 group">
                Discover Our Chapters
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform duration-200"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>

          {/* Image — cinematic wipe + zoom */}
          <div className="relative">
            <div className="absolute -top-3 -right-3 w-full h-full rounded-xl border-2 border-[#00D084]/20 pointer-events-none" />
            <div ref={imageClipRef} className="relative rounded-xl overflow-hidden shadow-2xl aspect-4/3">
              <div ref={imageInner} className="absolute inset-0">
                <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" alt="NAAKIMS students collaborating" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top right, rgba(0,80,42,0.25) 0%, transparent 60%)' }} />
            </div>
            <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white rounded-lg shadow-lg px-5 py-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00D084]/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#008751]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/></svg>
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-bold leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>20+ Chapters</p>
                  <p className="text-gray-500 text-[11px] leading-snug">Across Nigeria &amp; Beyond</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── PILLARS — alternating cinematic image+text ──── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8faf9 0%, #f0f4f1 100%)' }}>
        <div className="absolute -top-32 right-0 w-125 h-125 bg-[#00D084]/4 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-[#008751]/3 rounded-full blur-[100px] pointer-events-none" />

        <div ref={pillarsRef.ref} className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-32">
          {/* Header */}
          <div className="max-w-xl mb-14 sm:mb-20">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-6 bg-[#00D084]" />
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00D084]" style={{ fontFamily: 'var(--font-inter)' }}>Our Pillars</span>
            </div>
            <h2 className="text-[clamp(1.5rem,3.2vw,2.3rem)] font-bold leading-[1.12] tracking-[-0.02em] text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>
              Built on Three{' '}<span className="text-[#008751]">Unshakeable</span> Pillars
            </h2>
          </div>

          {/* Alternating cards */}
          <div className="flex flex-col gap-16 sm:gap-24">
            {PILLARS.map((p, i) => {
              const rev = i % 2 === 1;
              return (
                <div key={p.title} className={cn('p-card grid lg:grid-cols-2 gap-8 lg:gap-16 items-center', rev && 'lg:[direction:rtl]')}>
                  {/* IMAGE — wipe reveal */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl lg:[direction:ltr]">
                    <div className="p-img relative aspect-16/11">
                      <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                      <div className="absolute inset-0 bg-linear-to-t from-[#001a0e]/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#00D084]/60 to-transparent" />
                    </div>
                    <span className="absolute top-5 left-5 text-white/50 text-[11px] font-mono tracking-[0.3em] bg-black/25 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">{p.num}</span>
                  </div>

                  {/* TEXT */}
                  <div className="lg:[direction:ltr] flex flex-col justify-center">
                    <div className="p-line origin-left h-0.5 w-10 bg-[#00D084] rounded-full mb-5" />
                    <h3 className="p-txt text-[clamp(1.25rem,2.5vw,1.65rem)] font-bold leading-[1.2] tracking-[-0.01em] text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>{p.title}</h3>
                    <p className="p-txt text-gray-500 text-[14px] sm:text-[15px] leading-[1.75] max-w-md" style={{ fontFamily: 'var(--font-inter)' }}>{p.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
