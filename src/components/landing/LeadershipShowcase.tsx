'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────────────────────── */
const PRESIDENT = {
  name: 'Ndifreke Okpongete',
  role: 'Worldwide President',
  quote: '\u201COur mission is simple \u2014 to build a world-class network of medical and dental surgery professionals rooted in excellence, service, and the shared identity of Akwa Ibom.\u201D',
  image: '/naakimswwpresident.jpg',
  chapter: 'University of Uyo',
};

const EXECUTIVES = [
  { name: 'Covenant Etim', role: 'VP External', image: '/images/vicepresidentexternal.jpg', chapter: 'University of Uyo' },
  { name: 'Imaobong Clement', role: 'General Secretary', image: '/images/generalsecretary.jpg', chapter: 'University of Uyo' },
  { name: 'Assam, Kingsley', role: 'Financial Secretary', image: '/images/financialsecretary.jpg', chapter: 'University of Uyo' },
  { name: 'Emediong Asuquo', role: 'Treasurer', image: '/images/treasurer.jpg', chapter: 'University of Uyo' },
];

/* ─────────────────────────────────────────────────────────────
   ExecutiveCard — cinematic reveal card with slash wipe
   ───────────────────────────────────────────────────────────── */
function ExecutiveCard({ exec, index }: { exec: (typeof EXECUTIVES)[number]; index: number }) {
  const cardRef    = useRef<HTMLDivElement>(null);
  const wipeRef    = useRef<HTMLDivElement>(null);
  const tagRef     = useRef<HTMLDivElement>(null);
  const shimRef    = useRef<HTMLDivElement>(null);

  const handleEnter = useCallback(() => {
    if (!cardRef.current) return;
    const img = cardRef.current.querySelector('.ec-img') as HTMLElement | null;
    if (img)   gsap.to(img,        { scale: 1.07, duration: 0.75, ease: 'power2.out' });
    if (wipeRef.current)  gsap.to(wipeRef.current,  { scaleY: 1, duration: 0.55, ease: 'power3.out' });
    if (tagRef.current)   gsap.to(tagRef.current,   { opacity: 1, y: 0, duration: 0.45, delay: 0.1, ease: 'power3.out' });
    if (shimRef.current)  gsap.to(shimRef.current,  { scaleX: 1, duration: 0.6, delay: 0.05, ease: 'power3.out' });
  }, []);

  const handleLeave = useCallback(() => {
    if (!cardRef.current) return;
    const img = cardRef.current.querySelector('.ec-img') as HTMLElement | null;
    if (img)   gsap.to(img,        { scale: 1, duration: 0.65, ease: 'power2.inOut' });
    if (wipeRef.current)  gsap.to(wipeRef.current,  { scaleY: 0, duration: 0.45, ease: 'power3.inOut' });
    if (tagRef.current)   gsap.to(tagRef.current,   { opacity: 0, y: 8, duration: 0.35, ease: 'power2.in' });
    if (shimRef.current)  gsap.to(shimRef.current,  { scaleX: 0, duration: 0.45, ease: 'power3.inOut' });
  }, []);

  const ordinal = String(index + 1).padStart(2, '0');

  return (
    <div
      ref={cardRef}
      className="exec-card group relative opacity-0 cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* ── Photo frame ── */}
      <div className="relative overflow-hidden rounded-lg aspect-3/4" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)' }}>
        {/* Photo */}
        <div className="ec-img absolute inset-0 w-full h-full">
          <Image
            src={exec.image}
            alt={exec.name}
            fill
            quality={100}
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        </div>

        {/* Permanent gradient — name always visible at bottom */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,10,4,0.80) 0%, rgba(0,10,4,0.20) 42%, transparent 72%)' }} />

        {/* Hover: dark-green wipe overlay (scale from bottom) */}
        <div
          ref={wipeRef}
          className="absolute inset-0 origin-bottom"
          style={{ background: 'linear-gradient(to top, rgba(0,26,14,0.94) 0%, rgba(0,40,20,0.82) 55%, rgba(0,26,14,0.55) 100%)', transform: 'scaleY(0)' }}
        />

        {/* Index number — top-left ghost */}
        <div className="absolute top-3 left-4 z-10">
          <span
            className="text-[11px] font-bold tabular-nums"
            style={{ fontFamily: 'var(--font-inter)', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.08em' }}
          >{ordinal}</span>
        </div>

        {/* Hover tag: chapter + link (shown on wipe) */}
        <div
          ref={tagRef}
          className="absolute left-0 right-0 bottom-16 flex flex-col items-start px-4 sm:px-5 z-10"
          style={{ opacity: 0, transform: 'translateY(8px)' }}
        >
          <span
            className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] mb-2"
            style={{ fontFamily: 'var(--font-inter)', color: 'rgba(0,208,132,0.85)' }}
          >{exec.chapter}</span>
          <span
            className="inline-flex items-center gap-1.5 text-white/50 text-[11px] transition-colors duration-200"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            View profile
            <svg width="9" height="9" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Permanent name plate at very bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-5 pt-4 pb-4 z-10">
          <h4
            className="text-white text-[14px] sm:text-[15px] font-bold leading-snug tracking-[-0.01em] mb-0.5 group-hover:text-[#00D084] transition-colors duration-400"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >{exec.name}</h4>
          <p
            className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{ fontFamily: 'var(--font-inter)', color: 'rgba(255,255,255,0.35)' }}
          >{exec.role}</p>
        </div>

        {/* Green shimmer line on bottom (scales in on hover) */}
        <div
          ref={shimRef}
          className="absolute bottom-0 left-0 right-0 h-0.5 origin-left z-20"
          style={{ background: 'linear-gradient(to right, #00D084, #008751, #00D084)', transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════
   LeadershipShowcase — Premium Editorial Layout
   ═════════════════════════════════════════════════════════════ */
export default function LeadershipShowcase() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const presRef     = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {

      /* ── Header text reveals ── */
      if (headerRef.current) {
        const els = headerRef.current.querySelectorAll('.lh-rev');
        gsap.fromTo(els, {
          opacity: 0, y: 45, clipPath: 'inset(0 0 100% 0)',
        }, {
          opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 78%', toggleActions: 'play none none none' },
        });
      }

      /* ── President card: cinematic entrance ── */
      if (presRef.current) {
        const card = presRef.current;
        const img  = card.querySelector('.pres-img');
        const txts = card.querySelectorAll('.pres-txt');
        const quote = card.querySelector('.pres-quote');

        gsap.fromTo(card, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
        });

        if (img) gsap.fromTo(img,
          { clipPath: 'inset(0 100% 0 0)', scale: 1.08 },
          { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1.4, delay: 0.15, ease: 'power4.inOut',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' } },
        );

        if (txts.length) gsap.fromTo(txts,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, delay: 0.5, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' } },
        );

        if (quote) gsap.fromTo(quote,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 1.1, delay: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' } },
        );
      }

      /* ── Executive cards: clean staggered entrance (no floating) ── */
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.exec-card');
        cards.forEach((card, i) => {
          const img = card.querySelector('img');

          // Entrance: simple fade + slide up
          gsap.fromTo(card,
            { opacity: 0, y: 60, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1,
              duration: 1, delay: i * 0.12, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' } },
          );

          // Image zoom settle
          if (img) gsap.fromTo(img,
            { scale: 1.12 },
            { scale: 1, duration: 1.4, delay: i * 0.12 + 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' } },
          );
        });
      }

      /* ── CTA row entrance ── */
      if (ctaRef.current) {
        const els = ctaRef.current.querySelectorAll('.lc-rev');
        gsap.fromTo(els, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        });
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">

      {/* ══════════ LEADERSHIP DARK ZONE ══════════ */}
      <div className="relative" style={{ background: 'linear-gradient(180deg, #001a0e 0%, #00120a 50%, #001a0e 100%)' }}>
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-[#00D084]/2.5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-[#008751]/3 rounded-full blur-[120px] pointer-events-none" />

        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

        {/* ── Header ── */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 lg:pt-24 pb-8 sm:pb-14">
          <div ref={headerRef} className="text-center max-w-2xl mx-auto">
            <div className="lh-rev flex items-center justify-center gap-4 mb-5">
              <span className="h-px w-10 bg-[#00D084]/30" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] text-[#00D084]/70 px-2" style={{ fontFamily: 'var(--font-inter)' }}>Leadership</span>
              <span className="h-px w-10 bg-[#00D084]/30" />
            </div>
            <h2 className="lh-rev text-[clamp(1.8rem,4.2vw,3.2rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white mb-5" style={{ fontFamily: 'var(--font-poppins)' }}>
              The Visionaries{' '}<span className="text-[#00D084]">Behind</span> NAAKIMS
            </h2>
            <p className="lh-rev text-white/30 text-[14px] sm:text-[15px] leading-[1.85] max-w-xl mx-auto" style={{ fontFamily: 'var(--font-inter)' }}>
              Elected by members, driven by purpose — meet the executives leading NAAKIMS into its next era of impact and excellence.
            </p>
          </div>
        </div>

        {/* ── President Card ── */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20">
          <div ref={presRef} className="relative overflow-hidden rounded-lg opacity-0" style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)' }}>
            <div className="grid lg:grid-cols-2">
              {/* Image */}
              <div className="pres-img relative aspect-4/5 lg:aspect-auto overflow-hidden" style={{ minHeight: '400px' }}>
                <Image src={PRESIDENT.image} alt={PRESIDENT.name} fill quality={100} className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,80,42,0.15) 0%, rgba(0,26,14,0.08) 100%)' }} />
                <div className="absolute inset-0 bg-linear-to-t from-[#001a0e] via-transparent to-transparent lg:hidden" />
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#001a0e] hidden lg:block" />
                {/* Decorative corner */}
                <div className="absolute top-5 left-5 w-16 h-16 border-t-2 border-l-2 border-[#00D084]/20 rounded-tl-lg pointer-events-none" />
              </div>

              {/* Info panel */}
              <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-14 -mt-20 lg:mt-0" style={{ background: 'linear-gradient(135deg, #001a0e 0%, #002a18 100%)' }}>
                {/* Corner decorations */}
                <div className="absolute top-6 right-6 w-14 h-14 border-t border-r border-[#00D084]/15 rounded-tr-xl" />
                <div className="absolute bottom-6 left-6 w-14 h-14 border-b border-l border-[#00D084]/10 rounded-bl-xl hidden lg:block" />

                <span className="pres-txt text-[#00D084] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>Worldwide President</span>
                <h3 className="pres-txt text-white text-[clamp(1.6rem,3.2vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.025em] mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>{PRESIDENT.name}</h3>
                <span className="pres-txt text-white/20 text-[12px] sm:text-[13px] font-medium tracking-wide mb-8" style={{ fontFamily: 'var(--font-inter)' }}>{PRESIDENT.chapter}</span>

                <div className="pres-quote relative pl-6 border-l-2 border-[#00D084]/40 opacity-0">
                  <svg className="absolute -top-3 -left-1 w-6 h-6 text-[#00D084]/15" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-white/50 text-[14px] sm:text-[15px] leading-[1.9] italic" style={{ fontFamily: 'var(--font-inter)' }}>{PRESIDENT.quote}</p>
                </div>

                <div className="mt-10 h-px w-full" style={{ background: 'linear-gradient(to right, rgba(0,208,132,0.3), rgba(0,208,132,0.05), transparent)' }} />

                <div className="pres-txt mt-7">
                  <span className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#008751] text-white text-[12px] sm:text-[13px] font-bold tracking-wide transition-all duration-300">
                    Meet Full Executive Team
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(to right, #00D084, #008751, transparent)' }} />
          </div>
        </div>
      </div>

      {/* ══════════ EXECUTIVE GRID — Light Zone ══════════ */}
      <div className="relative" style={{ background: 'linear-gradient(180deg, #f0f9f5 0%, #f5fcf8 50%, #f0f9f5 100%)' }}>
        {/* Ambient glows */}
        <div className="absolute -top-32 right-0 w-96 h-96 bg-[#00D084]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#008751]/6 rounded-full blur-[100px] pointer-events-none" />
        {/* Top border line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,208,132,0.18), transparent)' }} />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 sm:pt-16 lg:pt-20 pb-4 sm:pb-6">

          {/* ── Section header ── */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-0.75 w-8 rounded-full bg-[#00D084]" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[#00D084]" style={{ fontFamily: 'var(--font-inter)' }}>Executive Team</span>
              </div>
              <h3 className="text-gray-900 text-[clamp(1.5rem,3.2vw,2.4rem)] font-extrabold tracking-[-0.03em] leading-[1.1]" style={{ fontFamily: 'var(--font-poppins)' }}>
                The Team Driving{' '}<br className="hidden sm:block" />
                <span className="text-[#008751]">NAAKIMS</span> Forward
              </h3>
            </div>
            <div className="max-w-75">
              <p className="text-gray-400 text-[13px] sm:text-[14px] leading-[1.85]" style={{ fontFamily: 'var(--font-inter)' }}>
                Our executives are elected annually by members across all chapters worldwide.
              </p>
            </div>
          </div>

          {/* ── Staggered portrait grid ── */}
          <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-start">
            {EXECUTIVES.map((exec, i) => (
              <div key={exec.name}>
                <ExecutiveCard exec={exec} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Row ── */}
        <div ref={ctaRef} className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-8 border-t border-[#00D084]/10">
            <p className="lc-rev text-gray-400 text-[13px] sm:text-[14px] leading-[1.8] max-w-xs" style={{ fontFamily: 'var(--font-inter)' }}>
              Elected by members, driven by purpose — leading NAAKIMS into its next era.
            </p>
            <span
              className="lc-rev group shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#008751] text-white text-[12px] sm:text-[13px] font-bold tracking-wide transition-all duration-300 shadow-lg shadow-[#008751]/20"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              View All Leaders
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
