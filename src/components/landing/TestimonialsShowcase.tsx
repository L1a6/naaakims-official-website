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
   DATA
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

const CHAPTER_NAMES = [
  'University of Uyo', 'University of Calabar', 'University of Lagos',
  'University of Ibadan', 'OAU Ile-Ife', 'Ahmadu Bello University',
  'University of Nigeria', 'UK Chapter', 'University of Benin',
  'LAUTECH', 'University of Port Harcourt', 'UNIJOS',
];

/* ═════════════════════════════════════════════════════════════
   TestimonialsShowcase — Premium Testimonial Carousel + Marquee
   ═════════════════════════════════════════════════════════════ */
export default function TestimonialsShowcase() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const quoteRef    = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const marqueeRef  = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const chapterRef  = useRef<HTMLDivElement>(null);
  const initRef     = useRef(false);
  const touchX      = useRef(0);

  const [active, setActive]   = useState(0);
  const [moving, setMoving]   = useState(false);

  /* ── Navigate testimonials ─────────────────────────────── */
  const goTo = useCallback((idx: number) => {
    if (moving || idx === active) return;
    setMoving(true);

    const c = carouselRef.current;
    if (!c) { setMoving(false); return; }

    const cur = c.querySelector(`.tc[data-i="${active}"]`) as HTMLElement;
    const nxt = c.querySelector(`.tc[data-i="${idx}"]`) as HTMLElement;
    if (!cur || !nxt) { setMoving(false); return; }

    const dir = idx > active ? 1 : -1;
    nxt.style.visibility = 'visible';
    nxt.style.zIndex = '3';
    cur.style.zIndex = '2';

    const tl = gsap.timeline({
      onComplete() { setActive(idx); setMoving(false); cur.style.visibility = 'hidden'; },
    });

    tl.to(cur, { opacity: 0, x: -40 * dir, duration: 0.4, ease: 'power3.in' });
    tl.fromTo(nxt, { opacity: 0, x: 60 * dir }, { opacity: 1, x: 0, duration: 0.55, ease: 'power3.out' }, '-=0.12');

    const txts = nxt.querySelectorAll('.tt');
    if (txts.length) tl.fromTo(txts,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out' },
      '-=0.35',
    );

    const av = nxt.querySelector('.ta');
    if (av) tl.fromTo(av, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' }, '-=0.3');
  }, [active, moving]);

  const prev = () => goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((active + 1) % TESTIMONIALS.length);

  /* ── Touch ─────────────────────────────────────────────── */
  const onTS = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTE = (e: React.TouchEvent) => {
    const d = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) d > 0 ? next() : prev();
  };

  /* ── Auto-advance ──────────────────────────────────────── */
  useEffect(() => {
    const id = setInterval(() => goTo((active + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(id);
  }, [active, goTo]);

  /* ── Progress bar ──────────────────────────────────────── */
  useEffect(() => {
    if (!progressRef.current) return;
    gsap.killTweensOf(progressRef.current);
    gsap.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: 5.5, ease: 'none' });
  }, [active]);

  /* ── GSAP scroll animations ────────────────────────────── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {

      // Header reveals
      if (headerRef.current) {
        const els = headerRef.current.querySelectorAll('.th');
        gsap.fromTo(els, {
          opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)',
        }, {
          opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        });
      }

      // First card entrance
      if (carouselRef.current && !initRef.current) {
        initRef.current = true;
        const first = carouselRef.current.querySelector('.tc[data-i="0"]');
        if (first) {
          gsap.fromTo(first, { opacity: 0, y: 50 }, {
            opacity: 1, y: 0, duration: 1, ease: 'power4.out',
            scrollTrigger: { trigger: quoteRef.current, start: 'top 82%', toggleActions: 'play none none none' },
          });
          const txts = first.querySelectorAll('.tt');
          if (txts.length) gsap.fromTo(txts,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.7, delay: 0.25, stagger: 0.06, ease: 'power3.out',
              scrollTrigger: { trigger: quoteRef.current, start: 'top 82%', toggleActions: 'play none none none' } },
          );
          const av = first.querySelector('.ta');
          if (av) gsap.fromTo(av,
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, delay: 0.4, ease: 'back.out(1.4)',
              scrollTrigger: { trigger: quoteRef.current, start: 'top 82%', toggleActions: 'play none none none' } },
          );
        }
      }

      // Chapter ticker entrance
      if (chapterRef.current) {
        gsap.fromTo(chapterRef.current, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: chapterRef.current, start: 'top 92%', toggleActions: 'play none none none' },
        });
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── Infinite marquee ──────────────────────────────────── */
  useEffect(() => {
    if (!marqueeRef.current) return;
    const track = marqueeRef.current;
    const tw = track.scrollWidth / 2;
    const ctx = gsap.context(() => {
      gsap.to(track, { x: -tw, duration: 40, ease: 'none', repeat: -1 });
    });
    return () => ctx.revert();
  }, []);

  const marqueeItems = [...CHAPTER_NAMES, ...CHAPTER_NAMES];

  return (
    <section ref={sectionRef} className="relative overflow-hidden">

      {/* ══════════ TESTIMONIALS ══════════ */}
      <div className="relative bg-white">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 sm:pt-20 lg:pt-24 pb-10 sm:pb-14">

          {/* Header */}
          <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <div className="th flex items-center gap-3 mb-4">
                <span className="h-0.75 w-9 rounded-full bg-[#00D084]" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[#00D084]" style={{ fontFamily: 'var(--font-inter)' }}>Testimonials</span>
              </div>
              <h2 className="th text-[clamp(1.6rem,3.8vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>
                Stories That <span className="text-[#008751]">Inspire</span>
              </h2>
            </div>
            <div className="th hidden sm:flex items-center gap-2">
              <button onClick={prev} className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#00D084] hover:bg-[#00D084]/5 flex items-center justify-center text-gray-400 hover:text-[#00D084] transition-all duration-300" aria-label="Previous">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button onClick={next} className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#00D084] hover:bg-[#00D084]/5 flex items-center justify-center text-gray-400 hover:text-[#00D084] transition-all duration-300" aria-label="Next">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>

          {/* Quote carousel */}
          <div ref={quoteRef} onTouchStart={onTS} onTouchEnd={onTE}>
            <div ref={carouselRef} className="relative min-h-56 sm:min-h-48 lg:min-h-44">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.name}
                  data-i={i}
                  className="tc absolute inset-0"
                  style={{ visibility: i === 0 ? 'visible' : 'hidden', zIndex: i === 0 ? 2 : 1 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-start">
                    {/* Avatar */}
                    <div className="lg:col-span-3 flex items-center gap-4 lg:flex-col lg:items-start">
                      <div className="ta relative w-14 h-14 sm:w-16 sm:h-16 lg:w-36 lg:h-36 rounded-full overflow-hidden ring-2 ring-[#00D084]/20 ring-offset-2 ring-offset-white shrink-0">
                        <Image src={t.image} alt={t.name} fill className="object-cover" sizes="(min-width:1024px) 144px, 64px" />
                      </div>
                      <div className="tt">
                        <p className="text-gray-900 text-[14px] sm:text-[15px] font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>{t.name}</p>
                        <p className="text-gray-400 text-[12px] mt-0.5" style={{ fontFamily: 'var(--font-inter)' }}>{t.role}</p>
                        <span className="inline-block mt-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#008751]/80 bg-[#00D084]/8 px-2.5 py-1 rounded-full">{t.chapter}</span>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="lg:col-span-9 relative">
                      <svg className="tt absolute -top-2 -left-1 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#00D084]/10" viewBox="0 0 48 48" fill="currentColor">
                        <path d="M12 34c-3.3 0-6-2.7-6-6 0-7.2 4-13.6 10.4-16.8l1.6 2.8C13.2 16.8 10 21.2 10 26h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-2zm18 0c-3.3 0-6-2.7-6-6 0-7.2 4-13.6 10.4-16.8l1.6 2.8C31.2 16.8 28 21.2 28 26h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-2z" />
                      </svg>
                      <p className="tt text-gray-700 text-[15px] sm:text-[18px] lg:text-[22px] leading-[1.65] font-light pl-6 sm:pl-10 lg:pl-12" style={{ fontFamily: 'var(--font-inter)' }}>
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress + counter */}
            <div className="flex items-center justify-between mt-6 sm:mt-8 pt-5 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex sm:hidden items-center gap-2">
                  <button onClick={prev} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400" aria-label="Previous">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button onClick={next} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400" aria-label="Next">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
                <div className="w-24 sm:w-40 h-0.5 bg-gray-100 relative overflow-hidden rounded-full">
                  <div ref={progressRef} className="absolute inset-y-0 left-0 w-full bg-[#00D084] origin-left" style={{ transform: 'scaleX(0)' }} />
                </div>
              </div>
              <span className="text-gray-300 text-[12px] font-mono tracking-wider">
                <span className="text-gray-600 font-semibold">0{active + 1}</span>
                <span className="mx-1">/</span>0{TESTIMONIALS.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ CHAPTERS MARQUEE ══════════ */}
      <div ref={chapterRef} className="relative border-t border-gray-100 overflow-hidden py-5 sm:py-7 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-3 flex items-center justify-between">
          <span className="text-gray-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: 'var(--font-inter)' }}>20+ Chapters Worldwide</span>
          <Link href="/chapters" className="group inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-[#008751] hover:text-[#006d41] transition-colors">
            View All
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-0.5 transition-transform"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>

        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Track */}
        <div className="overflow-hidden">
          <div ref={marqueeRef} className="flex items-center gap-6 sm:gap-10 whitespace-nowrap w-max">
            {marqueeItems.map((name, i) => (
              <span key={`${name}-${i}`} className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] text-gray-400 font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>
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
