'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────────────────────
   Curated slides
   ──────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    src: '/images/hero1.jpg',
    alt: 'NAAKIMS students celebrating excellence',
    line1: 'Uniting Akwa Ibom',
    line2: 'Students Across Continents',
  },
  {
    src: '/images/hero2.jpg',
    alt: 'NAAKIMS medical team',
    line1: 'Advancing Medical',
    line2: 'Excellence Together',
  },
  {
    src: '/images/hero3.jpg',
    alt: 'NAAKIMS students studying',
    line1: 'Tomorrow\u2019s Healthcare Leaders',
    line2: 'Start Right Here',
  },
  {
    src: '/images/hero4.jpg',
    alt: 'NAAKIMS students collaborating',
    line1: 'United by Origin,',
    line2: 'Driven by Excellence',
  },
];

const CYCLE_MS = 6000;

type Phase = 'visible' | 'exiting' | 'hidden' | 'entering';

export default function HeroSlideshow() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [textIdx, setTextIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('hidden');
  const [ready, setReady] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const firstChange = useRef(true);

  /* ── Entrance ──────────────────────────────────────────── */
  useEffect(() => {
    let v: ReturnType<typeof setTimeout>;
    const t = setTimeout(() => {
      setReady(true);
      setPhase('entering');
      v = setTimeout(() => setPhase('visible'), 600);
    }, 250);
    return () => { clearTimeout(t); clearTimeout(v); };
  }, []);

  /* ── Premium GSAP headline animation ────────────────────── */
  useEffect(() => {
    if (!ready || !headlineRef.current) return;
    const words = headlineRef.current.querySelectorAll('.hero-word');
    if (!words.length) return;
    gsap.killTweensOf(words);
    gsap.fromTo(words,
      { opacity: 0, y: 60, rotateX: 40, filter: 'blur(6px)' },
      {
        opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
        duration: 1,
        stagger: { each: 0.08, ease: 'power2.out' },
        ease: 'power4.out',
      },
    );
  }, [ready, textIdx]);

  /* ── Scroll parallax removed — text stays visible at all times ── */

  /* ── Auto-advance slides ───────────────────────────────── */
  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  /* ── Animate text on slide change ──────────────────────── */
  useEffect(() => {
    if (firstChange.current) { firstChange.current = false; return; }
    setPhase('exiting');
    const t1 = setTimeout(() => { setTextIdx(active); setPhase('hidden'); }, 420);
    const t2 = setTimeout(() => setPhase('entering'), 480);
    const t3 = setTimeout(() => setPhase('visible'), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [active]);

  const scrollToContent = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  /* ── Phase-based text animation helpers ───────────────── */
  const textCls = (): string => {
    switch (phase) {
      case 'exiting': return 'opacity-0 -translate-y-8 scale-90 blur-sm';
      case 'hidden': return 'opacity-0 translate-y-10 scale-90 blur-sm';
      case 'entering':
      case 'visible': return 'opacity-100 translate-y-0 scale-100 blur-0 rotate-0';
    }
  };

  const textStyle = (): React.CSSProperties => {
    if (phase === 'hidden') return { transitionProperty: 'none', transitionDuration: '0ms' };
    if (phase === 'exiting') return { transitionProperty: 'opacity, transform, filter', transitionDuration: '400ms', transitionTimingFunction: 'ease-in' };
    return { transitionProperty: 'opacity, transform, filter', transitionDuration: '850ms', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' };
  };

  const wordDelay = (i: number): React.CSSProperties => ({
    transitionDelay: phase === 'hidden' ? '0ms' : `${i * 80}ms`,
  });

  const slide = SLIDES[textIdx];

  return (
    <section
      ref={sectionRef}
      className="relative h-[110vh] w-full overflow-hidden select-none"
      role="banner"
      aria-label="NAAKIMS hero"
    >
      {/* ─── BACKGROUND IMAGES (Ken Burns crossfade) ───────── */}
      <div ref={imageWrapRef} className="absolute inset-0 will-change-transform" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={cn(
              'absolute inset-0 will-change-[opacity,transform]',
              i === active ? 'opacity-100' : 'opacity-0',
            )}
            style={{
              transition: 'opacity 1.6s cubic-bezier(.4,0,.2,1), transform 10s ease-out',
              transform: i === active ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            <Image src={s.src} alt={s.alt} fill className="object-cover" priority={i === 0} quality={100} sizes="100vw" />
          </div>
        ))}
      </div>

      {/* ─── OVERLAY SYSTEM ─────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.28,
          background: 'linear-gradient(135deg, rgba(0,12,6,0.85) 0%, rgba(0,12,6,0.55) 40%, rgba(0,12,6,0.25) 75%, rgba(0,12,6,0.15) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to right, rgba(0,208,132,0.08) 0%, rgba(0,208,132,0.03) 35%, transparent 70%)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to top, rgba(0,12,6,0.65) 0%, transparent 100%)' }}
      />

      {/* ─── Cinematic grain texture ─────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        aria-hidden="true"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }}
      />

      {/* ─── HERO CONTENT ───────────────────────────────────── */}
      <div ref={contentRef} className="relative z-10 h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* Overline with integrated accent */}
          <div
            className={cn(
              'flex items-center gap-3 mb-5',
              'transition-all duration-700 ease-out',
              ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
            )}
          >
            <span
              className={cn('h-0.5 rounded-full transition-all duration-1000 ease-out', ready ? 'w-10 opacity-100' : 'w-0 opacity-0')}
              style={{ background: 'linear-gradient(90deg, #00D084, #008751)' }}
            />
            <span
              className="text-white/80 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              NAAKIMS Worldwide
            </span>
          </div>

          {/* ── Dynamic Headline — PURE WHITE, GSAP word stagger ── */}
          <h1
            ref={headlineRef}
            className={cn('text-white font-bold leading-[1.15] tracking-[-0.02em] mb-8')}
            style={{ fontFamily: 'var(--font-poppins)', perspective: '800px', fontSize: 'clamp(1.875rem, 3.5vw, 3rem)' }}
          >
            {ready && (
              <>
                {slide.line1.split(' ').map((word, i) => (
                  <span key={`${textIdx}-l1-${i}`} className="hero-word inline-block" style={{ marginRight: '0.28em', willChange: 'transform, opacity, filter' }}>{word}</span>
                ))}
                <br />
                {slide.line2.split(' ').map((word, i) => (
                  <span key={`${textIdx}-l2-${i}`} className="hero-word inline-block" style={{ marginRight: '0.28em', willChange: 'transform, opacity, filter' }}>{word}</span>
                ))}
              </>
            )}
          </h1>

          {/* Sub-headline */}
          <p
            className={cn(
              'text-white font-normal leading-[1.75] max-w-lg mb-8',
              'text-[clamp(0.88rem,1.5vw,1.05rem)]',
              'transition-all duration-600 ease-out delay-200',
              ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
            )}
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Empowering Akwa Ibom medical &amp; dental surgery students to become world-class
            healthcare professionals through mentorship, unity, and relentless
            excellence.
          </p>

          {/* ── CTA Buttons ── */}
          <div
            className={cn(
              'flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center',
              'transition-all duration-600 ease-out',
              ready ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-4',
            )}
          >
            <span
              className={cn(
                'group inline-flex items-center justify-center gap-3',
                'min-w-55 sm:min-w-50 px-10 py-3.75 rounded-lg',
                'bg-[#008751] text-white text-[13px] sm:text-sm font-bold tracking-wide',
                'shadow-lg shadow-[#008751]/25',
                'transition-all duration-300',
              )}
            >
              Get Started
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>

            <span
              className={cn(
                'group inline-flex items-center justify-center gap-3',
                'min-w-55 sm:min-w-50 px-10 py-3.75 rounded-lg',
                'border border-white/25 text-white text-[13px] sm:text-sm font-semibold tracking-wide',
                'backdrop-blur-md bg-white/5',
                'transition-all duration-300',
              )}
            >
              Explore NAAKIMS
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
        </div>
      </div>

      {/* ─── SLIDE INDICATORS (bottom-left) ────────────────── */}
      <div className={cn('absolute bottom-8 left-6 sm:left-10 lg:left-16 z-10 flex items-center gap-2', 'transition-opacity duration-700', ready ? 'opacity-100 delay-500' : 'opacity-0')}>
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className="relative h-0.5 rounded-full overflow-hidden transition-all duration-500"
            style={{ width: i === active ? 40 : 16, backgroundColor: i === active ? 'transparent' : 'rgba(255,255,255,0.20)' }}
            aria-label={`Slide ${i + 1}`}
          >
            {i === active && (
              <>
                <span className="absolute inset-0 bg-white/20 rounded-full" />
                <span className="absolute inset-0 bg-white rounded-full origin-left animate-slide-fill" style={{ animationDuration: `${CYCLE_MS}ms` }} />
              </>
            )}
          </div>
        ))}
        <span className="text-white/30 text-[10px] font-mono ml-2.5 tabular-nums">
          {String(active + 1).padStart(2, '0')}/{String(SLIDES.length).padStart(2, '0')}
        </span>
      </div>

      {/* ─── SCROLL CTA (bottom-right) ─────────────────────── */}
      <div
        className={cn('absolute bottom-8 right-6 sm:right-10 lg:right-16 z-10 flex items-center gap-3 group', 'transition-opacity duration-700', ready ? 'opacity-100 delay-500' : 'opacity-0')}
        aria-label="Scroll indicator"
      >
        <span className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-medium">Scroll</span>
        <span className="relative w-px h-10 bg-white/15 overflow-hidden rounded-full">
          <span className="absolute inset-x-0 h-3 bg-[#00D084] animate-scroll-line rounded-full" />
        </span>
      </div>
    </section>
  );
}
