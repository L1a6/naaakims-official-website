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
   PROGRAMS — flagship NAAKIMS initiatives
   ───────────────────────────────────────────────────────────── */
const PROGRAMS = [
  {
    tag: 'Annual',
    title: 'National Medical Convention',
    body: 'Our flagship gathering — three days of keynote lectures, clinical workshops, research presentations, and cultural celebrations uniting all chapters under one roof.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
    color: '#008751',
    stat: '3,000+',
    statLabel: 'Annual Attendees',
  },
  {
    tag: 'Outreach',
    title: 'Community Health Missions',
    body: 'Health education campaigns, awareness programs, and community engagement initiatives reaching thousands of communities across Akwa Ibom and beyond.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1400&q=80',
    color: '#00B872',
    stat: '50+',
    statLabel: 'Health Campaigns',
  },
  {
    tag: 'Leadership',
    title: 'Mentorship & Career Development',
    body: 'Pairing students with practicing physicians, surgeons, and specialists — structured mentorship that bridges the gap from lecture halls to operating rooms.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80',
    color: '#00D084',
    stat: '300+',
    statLabel: 'Active Mentorship Pairs',
  },
];

/* ─────────────────────────────────────────────────────────────
   IMPACT HIGHLIGHTS — mini stat cards
   ───────────────────────────────────────────────────────────── */
const HIGHLIGHTS = [
  { num: '50+',  label: 'Health Campaigns' },
  { num: '20+', label: 'Active Chapters' },
  { num: '25+',  label: 'Universities' },
];

/* ─────────────────────────────────────────────────────────────
   useInView
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
   ProgramsShowcase — Cinematic GSAP Slideshow
   ═════════════════════════════════════════════════════════════ */
export default function ProgramsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef  = useInView(0.3);
  const slideRef   = useInView(0.1);
  const impactRef  = useInView(0.25);

  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const initialised = useRef(false);

  const SLIDE_DURATION = 6000;

  /* ── Navigate to a specific slide with GSAP ────────────── */
  const goToSlide = useCallback((nextIdx: number) => {
    if (isAnimating || nextIdx === activeIdx) return;
    setIsAnimating(true);

    const container = slideContainerRef.current;
    if (!container) { setIsAnimating(false); return; }

    const currentSlide = container.querySelector(`.prog-slide[data-idx="${activeIdx}"]`) as HTMLElement;
    const nextSlide    = container.querySelector(`.prog-slide[data-idx="${nextIdx}"]`) as HTMLElement;
    if (!currentSlide || !nextSlide) { setIsAnimating(false); return; }

    const nextImg  = nextSlide.querySelector('.prog-slide-img');
    const nextTxts = nextSlide.querySelectorAll('.prog-slide-txt');
    const nextStat = nextSlide.querySelector('.prog-slide-stat');

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIdx(nextIdx);
        setIsAnimating(false);
        // hide old slide
        currentSlide.style.visibility = 'hidden';
      },
    });

    // Make next slide visible but clipped
    nextSlide.style.visibility = 'visible';
    nextSlide.style.zIndex = '3';
    currentSlide.style.zIndex = '2';

    // Exit current
    tl.to(currentSlide, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.7,
      ease: 'power4.inOut',
    });

    // Enter next
    tl.fromTo(nextSlide,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 0.9, ease: 'power4.inOut' },
      '-=0.3',
    );

    // Ken Burns on new image
    if (nextImg) {
      tl.fromTo(nextImg, { scale: 1.15 }, { scale: 1, duration: 1.8, ease: 'power2.out' }, '-=0.8');
    }

    // Text entrance
    if (nextTxts.length) {
      tl.fromTo(nextTxts,
        { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.8, stagger: 0.07, ease: 'power3.out' },
        '-=1.2',
      );
    }

    // Stat pop
    if (nextStat) {
      tl.fromTo(nextStat, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' }, '-=0.6');
    }
  }, [activeIdx, isAnimating]);

  /* ── Auto-advance timer ────────────────────────────────── */
  useEffect(() => {
    if (!slideRef.vis) return;
    autoPlayRef.current = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % PROGRAMS.length;
        return prev; // we only trigger goToSlide
      });
    }, SLIDE_DURATION);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [slideRef.vis]);

  // Separate effect to call goToSlide based on timer
  useEffect(() => {
    if (!slideRef.vis) return;
    const interval = setInterval(() => {
      const next = (activeIdx + 1) % PROGRAMS.length;
      goToSlide(next);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [activeIdx, slideRef.vis, goToSlide]);

  /* ── Progress bar ──────────────────────────────────────── */
  useEffect(() => {
    if (!progressRef.current || !slideRef.vis) return;
    gsap.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: SLIDE_DURATION / 1000, ease: 'none' });
  }, [activeIdx, slideRef.vis]);

  /* ── GSAP — header entrance with ScrollTrigger ──────────── */
  useEffect(() => {
    if (!headerRef.vis) return;
    const els = document.querySelectorAll('.prog-hdr');
    if (!els.length) return;
    gsap.fromTo(els,
      { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
      {
        opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.ref.current, start: 'top 80%', toggleActions: 'play none none none' },
      },
    );
  }, [headerRef.vis]);

  /* ── GSAP — initial first slide reveal ─────────────────── */
  useEffect(() => {
    if (!slideRef.vis || initialised.current || !slideContainerRef.current) return;
    initialised.current = true;
    const first = slideContainerRef.current.querySelector('.prog-slide[data-idx="0"]');
    if (!first) return;

    const img  = first.querySelector('.prog-slide-img');
    const txts = first.querySelectorAll('.prog-slide-txt');
    const stat = first.querySelector('.prog-slide-stat');

    gsap.fromTo(first, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.inOut' });
    if (img) gsap.fromTo(img, { scale: 1.2 }, { scale: 1, duration: 2, delay: 0.3, ease: 'power2.out' });
    if (txts.length) gsap.fromTo(txts,
      { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.9, delay: 0.5, stagger: 0.08, ease: 'power3.out' },
    );
    if (stat) gsap.fromTo(stat, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, delay: 0.9, ease: 'back.out(2)' });
  }, [slideRef.vis]);

  /* ── GSAP — impact row with ScrollTrigger ────────────── */
  useEffect(() => {
    if (!impactRef.vis) return;
    const items = document.querySelectorAll('.imp-item');
    if (!items.length) return;
    gsap.fromTo(items, { opacity: 0, y: 20, scale: 0.95 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: impactRef.ref.current, start: 'top 85%', toggleActions: 'play none none none' },
    });
  }, [impactRef.vis]);

  const handleDotClick = useCallback((idx: number) => {
    goToSlide(idx);
  }, [goToSlide]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">

      {/* ─── HEADER ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 lg:pt-32 pb-8 sm:pb-12">
        <div ref={headerRef.ref} className="max-w-2xl">
          <div className="prog-hdr flex items-center gap-3 mb-4">
            <span className="h-px w-6 bg-[#00D084]" />
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00D084]" style={{ fontFamily: 'var(--font-inter)' }}>
              What We Do
            </span>
          </div>
          <h2 className="prog-hdr text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.02em] text-gray-900 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            Programs That{' '}<span className="text-[#008751]">Transform</span> Lives
          </h2>
          <p className="prog-hdr text-gray-500 text-[15px] leading-[1.75] max-w-xl" style={{ fontFamily: 'var(--font-inter)' }}>
            From national conventions to grassroots health missions, every NAAKIMS initiative is designed to empower, educate, and elevate.
          </p>
        </div>
      </div>

      {/* ─── CINEMATIC SLIDESHOW ─────────────────────────── */}
      <div ref={slideRef.ref} className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-6 sm:pb-10">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          {/* Slide viewport */}
          <div
            ref={slideContainerRef}
            className="relative aspect-4/3 sm:aspect-2/1 lg:aspect-21/9 overflow-hidden bg-[#001a0e]"
          >
            {PROGRAMS.map((prog, i) => (
              <div
                key={prog.title}
                data-idx={i}
                className="prog-slide absolute inset-0"
                style={{
                  visibility: i === 0 ? 'visible' : 'hidden',
                  clipPath: i === 0 ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
                  zIndex: i === 0 ? 2 : 1,
                }}
              >
                {/* Image with Ken Burns */}
                <div className="prog-slide-img absolute inset-0">
                  <Image src={prog.image} alt={prog.title} fill className="object-cover" sizes="100vw" priority={i === 0} />
                </div>

                {/* Overlays */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,26,14,0.75) 0%, rgba(0,26,14,0.35) 50%, rgba(0,26,14,0.08) 100%)' }} />
                <div className="absolute inset-0 bg-linear-to-t from-[#001a0e]/50 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-end sm:items-center">
                  <div className="px-5 sm:px-10 lg:px-14 pb-16 sm:pb-0 max-w-xl lg:max-w-2xl">
                    <span className="prog-slide-txt text-[#00D084] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] mb-2 sm:mb-3 block" style={{ fontFamily: 'var(--font-inter)' }}>
                      {prog.tag}
                    </span>
                    <h3 className="prog-slide-txt text-white text-[clamp(1.2rem,3.5vw,2.4rem)] font-bold leading-[1.12] tracking-[-0.02em] mb-2 sm:mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                      {prog.title}
                    </h3>
                    <p className="prog-slide-txt text-white/55 text-[11px] sm:text-[14px] leading-[1.7] mb-4 sm:mb-6 max-w-md hidden sm:block" style={{ fontFamily: 'var(--font-inter)' }}>
                      {prog.body}
                    </p>
                    <div className="prog-slide-txt flex items-center gap-4">
                      <Link
                        href="/events"
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-md bg-white/10 backdrop-blur-sm border border-white/15 text-white text-[10px] sm:text-[13px] font-semibold tracking-wide hover:bg-white/20 active:scale-[0.98] transition-all duration-300 whitespace-nowrap"
                      >
                        Learn More
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="sm:w-3 sm:h-3"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom nav strip ───────────────────────────── */}
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="h-0.5 bg-white/10">
              <div ref={progressRef} className="h-full bg-[#00D084] origin-left" style={{ transform: 'scaleX(0)' }} />
            </div>
            <div className="flex items-center justify-between px-5 sm:px-10 lg:px-14 py-2.5 sm:py-3.5" style={{ background: 'rgba(0,20,12,0.65)', backdropFilter: 'blur(12px)' }}>
              <div className="flex items-center gap-2 sm:gap-3">
                {PROGRAMS.map((prog, i) => (
                  <button
                    key={i}
                    onClick={() => handleDotClick(i)}
                    className={cn(
                      'relative transition-all duration-500 rounded-full',
                      i === activeIdx ? 'w-7 sm:w-10 h-2 bg-[#00D084]' : 'w-2 h-2 bg-white/30 hover:bg-white/50',
                    )}
                    aria-label={`Go to ${prog.title}`}
                  />
                ))}
              </div>
              <span className="text-white/40 text-[10px] sm:text-[11px] font-mono tracking-wider">
                <span className="text-white font-semibold">0{activeIdx + 1}</span>{' '}/{' '}0{PROGRAMS.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── IMPACT STRIP ────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #001a0e 0%, #002a18 50%, #001a0e 100%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-50 bg-[#00D084]/5 rounded-full blur-[100px] pointer-events-none" />

        <div ref={impactRef.ref} className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-3 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-8">
            <div className="shrink-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="h-px w-4 bg-[#00D084]/50" />
                <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] text-[#00D084]/60" style={{ fontFamily: 'var(--font-inter)' }}>Our Impact</span>
              </div>
              <p className="text-white/80 text-[clamp(1.1rem,2vw,1.35rem)] font-bold leading-tight tracking-[-0.01em]" style={{ fontFamily: 'var(--font-poppins)' }}>
                Real Numbers,{' '}<span className="text-[#00D084]">Real Impact</span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-10">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="imp-item text-center sm:text-left">
                  <span className="text-white text-[clamp(1rem,2vw,1.45rem)] font-bold tracking-tight block" style={{ fontFamily: 'var(--font-poppins)' }}>{h.num}</span>
                  <span className="text-white/30 text-[8px] sm:text-[10px] font-medium uppercase tracking-[0.15em] leading-tight block mt-0.5">{h.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
