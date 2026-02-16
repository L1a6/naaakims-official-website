'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
   CHAPTER NAMES — marquee ticker
   ───────────────────────────────────────────────────────────── */
const CHAPTER_NAMES = [
  'University of Uyo', 'University of Calabar', 'University of Lagos',
  'University of Ibadan', 'OAU Ile-Ife', 'Ahmadu Bello University',
  'University of Nigeria', 'UK Chapter', 'University of Benin',
  'LAUTECH', 'University of Port Harcourt', 'UNIJOS',
];

/* ═════════════════════════════════════════════════════════════
   TestimonialsShowcase — Clean testimonials + elegant chapters ticker
   ═════════════════════════════════════════════════════════════ */
export default function TestimonialsShowcase() {
  const sectionRef        = useRef<HTMLDivElement>(null);
  const headerRef         = useRef<HTMLDivElement>(null);
  const quoteRef          = useRef<HTMLDivElement>(null);
  const quoteContainerRef = useRef<HTMLDivElement>(null);
  const chapterRef        = useRef<HTMLDivElement>(null);
  const marqueeRef        = useRef<HTMLDivElement>(null);
  const progressRef       = useRef<HTMLDivElement>(null);
  const autoRef           = useRef<ReturnType<typeof setInterval> | null>(null);
  const initialised       = useRef(false);
  const touchStartX       = useRef(0);

  const [activeIdx, setActiveIdx]     = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  /* ── Navigate to testimonial ───────────────────────────── */
  const goTo = useCallback((idx: number) => {
    if (isAnimating || idx === activeIdx) return;
    setIsAnimating(true);

    const c = quoteContainerRef.current;
    if (!c) { setIsAnimating(false); return; }

    const curr = c.querySelector(`.t-card[data-idx="${activeIdx}"]`) as HTMLElement;
    const next = c.querySelector(`.t-card[data-idx="${idx}"]`) as HTMLElement;
    if (!curr || !next) { setIsAnimating(false); return; }

    const dir = idx > activeIdx ? 1 : -1;
    next.style.visibility = 'visible';
    next.style.zIndex     = '3';
    curr.style.zIndex     = '2';

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIdx(idx);
        setIsAnimating(false);
        curr.style.visibility = 'hidden';
      },
    });

    tl.to(curr, { opacity: 0, x: -40 * dir, duration: 0.4, ease: 'power3.in' });

    tl.fromTo(next,
      { opacity: 0, x: 60 * dir },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.15',
    );

    const txts = next.querySelectorAll('.t-txt');
    if (txts.length) {
      tl.fromTo(txts,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' },
        '-=0.4',
      );
    }

    const av = next.querySelector('.t-avatar');
    if (av) {
      tl.fromTo(av,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.4)' },
        '-=0.35',
      );
    }
  }, [activeIdx, isAnimating]);

  const goPrev = () => goTo((activeIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const goNext = () => goTo((activeIdx + 1) % TESTIMONIALS.length);

  /* ── Touch swipe ─────────────────────────────────────── */
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev(); }
  };

  /* ── Auto-advance ──────────────────────────────────────── */
  useEffect(() => {
    autoRef.current = setInterval(() => {
      goTo((activeIdx + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [activeIdx, goTo]);

  /* ── Progress bar ──────────────────────────────────────── */
  useEffect(() => {
    if (!progressRef.current) return;
    gsap.killTweensOf(progressRef.current);
    gsap.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: 5.5, ease: 'none' });
  }, [activeIdx]);

  /* ── ScrollTrigger — testimonial header ────────────────── */
  useEffect(() => {
    if (!headerRef.current) return;
    const ctx = gsap.context(() => {
      const els = headerRef.current!.querySelectorAll('.t-hdr');
      if (!els.length) return;
      gsap.fromTo(els,
        { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 82%', toggleActions: 'play none none none' },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  /* ── ScrollTrigger — first quote entrance ──────────────── */
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
            start: 'top 82%',
            toggleActions: 'play none none none',
            onEnter: () => { initialised.current = true; },
          },
        },
      );

      const txts = first.querySelectorAll('.t-txt');
      if (txts.length) {
        gsap.fromTo(txts,
          { opacity: 0, y: 18 },
          {
            opacity: 1, y: 0, duration: 0.7, delay: 0.25, stagger: 0.07, ease: 'power3.out',
            scrollTrigger: { trigger: quoteRef.current, start: 'top 82%', toggleActions: 'play none none none' },
          },
        );
      }

      const av = first.querySelector('.t-avatar');
      if (av) {
        gsap.fromTo(av,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.6, delay: 0.4, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: quoteRef.current, start: 'top 82%', toggleActions: 'play none none none' },
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  /* ── ScrollTrigger — chapters ticker entrance ──────────── */
  useEffect(() => {
    if (!chapterRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(chapterRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: chapterRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  /* ── GSAP Marquee — infinite chapter scroll ────────────── */
  useEffect(() => {
    if (!marqueeRef.current) return;
    const track = marqueeRef.current;
    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth / 2;
      gsap.to(track, {
        x: -totalWidth,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  /* ═════════════════ JSX ════════════════════════════════ */
  const marqueeItems = [...CHAPTER_NAMES, ...CHAPTER_NAMES];

  return (
    <section ref={sectionRef} className="relative overflow-hidden">

      {/* ━━━━ TESTIMONIALS — pure white section ━━━━━━━━━━━━━━ */}
      <div className="relative bg-white">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 sm:pt-20 lg:pt-24 pb-10 sm:pb-14">

          {/* Header */}
          <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <div className="t-hdr flex items-center gap-3 mb-3">
                <span className="block w-8 h-px bg-[#00D084]" />
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-[#00D084]" style={{ fontFamily: 'var(--font-inter)' }}>
                  Testimonials
                </span>
              </div>
              <h2 className="t-hdr text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em] text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>
                Stories That <span className="text-[#008751]">Inspire</span>
              </h2>
            </div>
            {/* Arrows — desktop */}
            <div className="t-hdr hidden sm:flex items-center gap-2">
              <button
                onClick={goPrev}
                className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#00D084] hover:bg-[#00D084]/5 flex items-center justify-center text-gray-400 hover:text-[#00D084] transition-all duration-300"
                aria-label="Previous"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button
                onClick={goNext}
                className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#00D084] hover:bg-[#00D084]/5 flex items-center justify-center text-gray-400 hover:text-[#00D084] transition-all duration-300"
                aria-label="Next"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>

          {/* ── Quote carousel ── */}
          <div ref={quoteRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div
              ref={quoteContainerRef}
              className="relative min-h-56 sm:min-h-48 lg:min-h-44"
            >
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.name}
                  data-idx={i}
                  className="t-card absolute inset-0"
                  style={{
                    visibility: i === 0 ? 'visible' : 'hidden',
                    zIndex: i === 0 ? 2 : 1,
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-start">

                    {/* Avatar + info — left column */}
                    <div className="lg:col-span-3 flex items-center gap-4 lg:flex-col lg:items-start">
                      <div className="t-avatar relative w-14 h-14 sm:w-16 sm:h-16 lg:w-28 lg:h-28 rounded-full overflow-hidden ring-2 ring-[#00D084]/20 ring-offset-2 ring-offset-white shrink-0">
                        <Image src={t.image} alt={t.name} fill className="object-cover" sizes="(min-width:1024px) 112px, 64px" />
                      </div>
                      <div className="t-txt">
                        <p className="text-gray-900 text-[14px] sm:text-[15px] font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
                          {t.name}
                        </p>
                        <p className="text-gray-400 text-[12px] mt-0.5" style={{ fontFamily: 'var(--font-inter)' }}>
                          {t.role}
                        </p>
                        <span className="inline-block mt-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#008751]/80 bg-[#00D084]/8 px-2.5 py-1 rounded-full">
                          {t.chapter}
                        </span>
                      </div>
                    </div>

                    {/* Quote — right column */}
                    <div className="lg:col-span-9 relative">
                      <svg className="t-txt absolute -top-2 -left-1 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#00D084]/10" viewBox="0 0 48 48" fill="currentColor">
                        <path d="M12 34c-3.3 0-6-2.7-6-6 0-7.2 4-13.6 10.4-16.8l1.6 2.8C13.2 16.8 10 21.2 10 26h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-2zm18 0c-3.3 0-6-2.7-6-6 0-7.2 4-13.6 10.4-16.8l1.6 2.8C31.2 16.8 28 21.2 28 26h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-2z"/>
                      </svg>
                      <p className="t-txt text-gray-700 text-[15px] sm:text-[18px] lg:text-[22px] leading-[1.65] font-light pl-6 sm:pl-10 lg:pl-12" style={{ fontFamily: 'var(--font-inter)' }}>
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bar + counter */}
            <div className="flex items-center justify-between mt-6 sm:mt-8 pt-5 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex sm:hidden items-center gap-2">
                  <button onClick={goPrev} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400" aria-label="Previous">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <button onClick={goNext} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400" aria-label="Next">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                <div className="w-24 sm:w-40 h-0.5 bg-gray-100 relative overflow-hidden rounded-full">
                  <div ref={progressRef} className="absolute inset-y-0 left-0 w-full bg-[#00D084] origin-left" style={{ transform: 'scaleX(0)' }} />
                </div>
              </div>
              <span className="text-gray-300 text-[12px] font-mono tracking-wider">
                <span className="text-gray-600 font-semibold">0{activeIdx + 1}</span>
                <span className="mx-1">/</span>0{TESTIMONIALS.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━ CHAPTERS — elegant marquee ticker ━━━━━━━━━━ */}
      <div ref={chapterRef} className="relative border-t border-[#00D084]/8 overflow-hidden py-5 sm:py-7" style={{ background: 'linear-gradient(180deg, #f2f7f4 0%, #eef4f0 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-gray-300 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: 'var(--font-inter)' }}>
              20+ Chapters Worldwide
            </span>
          </div>
          <Link
            href="/chapters"
            className="group inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-[#008751] hover:text-[#006d41] transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            View All
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Marquee track */}
        <div className="overflow-hidden">
          <div ref={marqueeRef} className="flex items-center gap-6 sm:gap-10 whitespace-nowrap w-max">
            {marqueeItems.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] text-gray-400 font-medium"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                <span className="block w-1.5 h-1.5 rounded-full bg-[#00D084]/40" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
