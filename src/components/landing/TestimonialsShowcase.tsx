'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS DATA
   ───────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: 'NAAKIMS gave me a family away from home. The mentorship I received here shaped my entire career trajectory in surgery.',
    name: 'Dr. Aniekan Udosen',
    role: 'Consultant Surgeon, UUTH',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    chapter: 'University of Uyo',
  },
  {
    quote: 'From free health missions in rural communities to national conventions, NAAKIMS prepared me for real-world medicine beyond textbooks.',
    name: 'Dr. Iniobong Essien',
    role: 'Family Medicine Resident',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    chapter: 'University of Calabar',
  },
  {
    quote: 'The leadership skills and network I built through NAAKIMS Worldwide opened doors I never even knew existed. Truly transformative.',
    name: 'Dr. Emem Akpan',
    role: 'Public Health Specialist',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964ac31?auto=format&fit=crop&w=400&q=80',
    chapter: 'University of Lagos',
  },
  {
    quote: 'Being part of NAAKIMS international chapters taught me that our Akwa Ibom identity is a superpower in global medicine.',
    name: 'Dr. Uduak Obot',
    role: 'Pediatrician, London NHS',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    chapter: 'UK Chapter',
  },
];

/* ─────────────────────────────────────────────────────────────
   CHAPTER HIGHLIGHTS
   ───────────────────────────────────────────────────────────── */
const CHAPTERS = [
  { name: 'University of Uyo', abbr: 'UNIUYO', members: '800+', color: '#00D084', region: 'Akwa Ibom' },
  { name: 'University of Calabar', abbr: 'UNICAL', members: '650+', color: '#00B872', region: 'Cross River' },
  { name: 'University of Lagos', abbr: 'UNILAG', members: '420+', color: '#008751', region: 'Lagos' },
  { name: 'University of Ibadan', abbr: 'UI', members: '380+', color: '#00D084', region: 'Oyo' },
  { name: 'OAU Ile-Ife', abbr: 'OAU', members: '350+', color: '#00B872', region: 'Osun' },
  { name: 'Ahmadu Bello University', abbr: 'ABU', members: '280+', color: '#008751', region: 'Kaduna' },
  { name: 'University of Nigeria', abbr: 'UNN', members: '310+', color: '#00D084', region: 'Enugu' },
  { name: 'UK Chapter', abbr: 'UK', members: '120+', color: '#00B872', region: 'International' },
];

/* ═════════════════════════════════════════════════════════════
   TestimonialsShowcase — Cinematic quotes + chapter network
   ═════════════════════════════════════════════════════════════ */
export default function TestimonialsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const quoteRef   = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const quoteContainerRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const initialised = useRef(false);

  /* ── Navigate to testimonial ───────────────────────────── */
  const goTo = useCallback((nextIdx: number) => {
    if (isAnimating || nextIdx === activeIdx) return;
    setIsAnimating(true);

    const container = quoteContainerRef.current;
    if (!container) { setIsAnimating(false); return; }

    const curr = container.querySelector(`.t-card[data-idx="${activeIdx}"]`) as HTMLElement;
    const next = container.querySelector(`.t-card[data-idx="${nextIdx}"]`) as HTMLElement;
    if (!curr || !next) { setIsAnimating(false); return; }

    const tl = gsap.timeline({
      onComplete: () => { setActiveIdx(nextIdx); setIsAnimating(false); curr.style.visibility = 'hidden'; },
    });

    next.style.visibility = 'visible';
    next.style.zIndex = '3';
    curr.style.zIndex = '2';

    // Exit current — fade + scale down
    tl.to(curr, { opacity: 0, scale: 0.95, filter: 'blur(6px)', duration: 0.5, ease: 'power3.inOut' });

    // Enter next — slide up
    tl.fromTo(next,
      { opacity: 0, y: 40, scale: 1.02, filter: 'blur(4px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
      '-=0.2',
    );

    // Text stagger
    const txts = next.querySelectorAll('.t-txt');
    if (txts.length) {
      tl.fromTo(txts,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out' },
        '-=0.4',
      );
    }

    // Avatar pop
    const avatar = next.querySelector('.t-avatar');
    if (avatar) {
      tl.fromTo(avatar, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.35');
    }
  }, [activeIdx, isAnimating]);

  /* ── Auto-advance ──────────────────────────────────────── */
  useEffect(() => {
    autoRef.current = setInterval(() => {
      const next = (activeIdx + 1) % TESTIMONIALS.length;
      goTo(next);
    }, 5500);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [activeIdx, goTo]);

  /* ── ScrollTrigger — header entrance ───────────────────── */
  useEffect(() => {
    if (!headerRef.current) return;
    const ctx = gsap.context(() => {
      const els = headerRef.current!.querySelectorAll('.test-hdr');
      if (!els.length) return;
      gsap.fromTo(els,
        { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  /* ── ScrollTrigger — initial first quote entrance ──────── */
  useEffect(() => {
    if (initialised.current || !quoteContainerRef.current) return;
    const ctx = gsap.context(() => {
      const first = quoteContainerRef.current!.querySelector('.t-card[data-idx="0"]');
      if (!first) return;

      gsap.fromTo(first,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            onEnter: () => { initialised.current = true; },
          },
        },
      );

      const txts = first.querySelectorAll('.t-txt');
      const avatar = first.querySelector('.t-avatar');
      if (txts.length) {
        gsap.fromTo(txts,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.7, delay: 0.3, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: quoteRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          },
        );
      }
      if (avatar) {
        gsap.fromTo(avatar,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.6, delay: 0.5, ease: 'back.out(2)',
            scrollTrigger: { trigger: quoteRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  /* ── ScrollTrigger — chapter cards stagger entrance ───── */
  useEffect(() => {
    if (!chapterRef.current) return;
    const ctx = gsap.context(() => {
      const items = chapterRef.current!.querySelectorAll('.ch-node');
      if (!items.length) return;
      gsap.fromTo(items,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: chapterRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        },
      );

      // Parallax on decorative orbs
      const decoEls = chapterRef.current!.querySelectorAll('.ch-deco');
      decoEls.forEach((el) => {
        gsap.to(el, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: { trigger: chapterRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">

      {/* ─── TESTIMONIALS — premium dark section ──────────── */}
      <div className="relative" style={{ background: 'linear-gradient(170deg, #001a0e 0%, #002a16 40%, #001810 100%)' }}>
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-20 w-96 h-96 bg-[#00D084]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#008751]/8 rounded-full blur-[100px]" />
          {/* Subtle dot pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #00D084 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 lg:pt-32 pb-20 sm:pb-28">

          {/* Header */}
          <div ref={headerRef} className="text-center mb-14 sm:mb-18">
            <div className="test-hdr flex items-center justify-center gap-3 mb-4">
              <svg className="w-5 h-5 text-[#00D084]/40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#00D084]/70" style={{ fontFamily: 'var(--font-inter)' }}>
                Voices of NAAKIMS
              </span>
              <svg className="w-5 h-5 text-[#00D084]/40 rotate-180" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
            </div>
            <h2 className="test-hdr text-[clamp(1.6rem,3.5vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Stories That{' '}<span className="text-[#00D084]">Inspire</span>{' '}Generations
            </h2>
            <p className="test-hdr text-white/35 text-[14px] sm:text-[15px] leading-[1.75] max-w-lg mx-auto" style={{ fontFamily: 'var(--font-inter)' }}>
              Alumni and members whose lives were forever changed by the NAAKIMS network.
            </p>
          </div>

          {/* Quote carousel — glass card */}
          <div ref={quoteRef} className="relative max-w-4xl mx-auto">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}>
              {/* Inner glow line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-linear-to-r from-transparent via-[#00D084]/30 to-transparent" />

              <div
                ref={quoteContainerRef}
                className="relative min-h-80 sm:min-h-72 p-6 sm:p-10 lg:p-14"
              >
                {TESTIMONIALS.map((t, i) => (
                  <div
                    key={t.name}
                    data-idx={i}
                    className="t-card absolute inset-0 flex flex-col items-center text-center p-6 sm:p-10 lg:p-14"
                    style={{
                      visibility: i === 0 ? 'visible' : 'hidden',
                      zIndex: i === 0 ? 2 : 1,
                    }}
                  >
                    {/* Avatar with ring */}
                    <div className="t-avatar relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-6 ring-2 ring-[#00D084]/30 ring-offset-2 ring-offset-[#001a0e]">
                      <Image src={t.image} alt={t.name} fill className="object-cover" sizes="80px" />
                    </div>

                    {/* Quote text */}
                    <p className="t-txt text-white/90 text-[15px] sm:text-[18px] lg:text-[20px] leading-[1.7] italic mb-6 max-w-2xl" style={{ fontFamily: 'var(--font-inter)' }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    {/* Attribution */}
                    <div className="t-txt">
                      <p className="text-white text-[14px] sm:text-[15px] font-bold mb-0.5" style={{ fontFamily: 'var(--font-poppins)' }}>
                        {t.name}
                      </p>
                      <p className="text-white/30 text-[11px] sm:text-[12px] font-medium">
                        {t.role}
                      </p>
                      <span className="inline-block mt-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] text-[#00D084]/60 bg-[#00D084]/8 px-3 py-1 rounded-full">
                        {t.chapter}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-[#00D084]/20 to-transparent" />
            </div>

            {/* Navigation dots */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={cn(
                    'transition-all duration-500 rounded-full',
                    i === activeIdx
                      ? 'w-8 h-2.5 bg-[#00D084] shadow-[0_0_12px_rgba(0,208,132,0.4)]'
                      : 'w-2.5 h-2.5 bg-white/15 hover:bg-white/30',
                  )}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
              <span className="ml-4 text-white/20 text-[10px] sm:text-[11px] font-mono tracking-wider">
                <span className="text-white/60 font-semibold">0{activeIdx + 1}</span>{' '}/{' '}0{TESTIMONIALS.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CHAPTERS — premium network showcase ─────────── */}
      <div className="relative overflow-hidden bg-white">
        {/* Decorative orbs */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#00D084]/4 rounded-full blur-[140px] pointer-events-none ch-deco" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#008751]/4 rounded-full blur-[120px] pointer-events-none ch-deco" />
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'linear-gradient(rgba(0,80,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,80,42,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div ref={chapterRef} className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-32">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="ch-node flex items-center gap-3 mb-3">
                <span className="h-px w-6 bg-[#00D084]" />
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00D084]" style={{ fontFamily: 'var(--font-inter)' }}>
                  Our Chapters
                </span>
              </div>
              <h2 className="ch-node text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.02em] text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>
                A Nationwide Network{' '}<br className="hidden sm:block" /><span className="text-[#008751]">of Excellence</span>
              </h2>
            </div>
            <div className="ch-node flex items-center gap-4">
              <div className="text-right">
                <span className="text-[#008751] text-[clamp(1.4rem,2.5vw,1.8rem)] font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>20+</span>
                <p className="text-gray-400 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em]">Active Chapters</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-right">
                <span className="text-[#008751] text-[clamp(1.4rem,2.5vw,1.8rem)] font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>5,000+</span>
                <p className="text-gray-400 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em]">Members Worldwide</p>
              </div>
            </div>
          </div>

          {/* Chapter cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {CHAPTERS.map((ch) => (
              <div
                key={ch.name}
                className="ch-node group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#00D084]/30 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
              >
                {/* Top accent bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${ch.color}, ${ch.color}40)` }}>
                  <div className="h-full w-0 group-hover:w-full bg-[#00D084] transition-all duration-700 ease-out" />
                </div>

                <div className="p-5 sm:p-6">
                  {/* Abbreviation badge + member count */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-[11px] font-bold tracking-wide group-hover:scale-110 transition-transform duration-500"
                      style={{ background: `linear-gradient(135deg, ${ch.color}, ${ch.color}90)`, fontFamily: 'var(--font-poppins)' }}
                    >
                      {ch.abbr}
                    </div>
                    <div className="text-right">
                      <span className="text-gray-900 text-[18px] sm:text-[20px] font-bold block leading-none" style={{ fontFamily: 'var(--font-poppins)' }}>
                        {ch.members}
                      </span>
                      <span className="text-gray-400 text-[9px] font-medium uppercase tracking-[0.15em]">members</span>
                    </div>
                  </div>

                  {/* Chapter name */}
                  <h3 className="text-gray-800 text-[14px] sm:text-[15px] font-semibold leading-tight mb-1 group-hover:text-[#008751] transition-colors duration-300" style={{ fontFamily: 'var(--font-poppins)' }}>
                    {ch.name}
                  </h3>

                  {/* Region tag */}
                  <span className="text-gray-400 text-[10px] font-medium tracking-wide" style={{ fontFamily: 'var(--font-inter)' }}>
                    {ch.region}
                  </span>

                  {/* Hover arrow */}
                  <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#00D084] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white" /></svg>
                  </div>
                </div>

                {/* Bottom pulse line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" style={{ background: `linear-gradient(90deg, ${ch.color}, transparent)` }} />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="ch-node text-center mt-12 sm:mt-16">
            <Link
              href="/chapters"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white text-[13px] font-semibold tracking-wide hover:bg-[#008751] active:scale-[0.98] transition-all duration-400 shadow-lg hover:shadow-xl"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Explore All Chapters
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
