'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────────────────────
   Curated slides — each with rotating headline.
   Replace Unsplash URLs with real NAAKIMS photography.
   ──────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80',
    alt: 'Medical professionals collaborating in a modern clinical environment',
    line1: 'Tomorrow\u2019s Healthcare',
    line2: 'Leaders Today',
  },
  {
    src: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1920&q=80',
    alt: 'Diverse medical team working together in a hospital setting',
    line1: 'Excellence in',
    line2: 'Medical Education',
  },
  {
    src: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1920&q=80',
    alt: 'Medical students studying in a university library',
    line1: 'Uniting Akwa Ibom',
    line2: 'Students Worldwide',
  },
  {
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80',
    alt: 'University students engaged in collaborative academic discussion',
    line1: 'United by Origin,',
    line2: 'Driven by Excellence',
  },
];

const CYCLE_MS = 6000;

type Phase = 'visible' | 'exiting' | 'hidden' | 'entering';

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [textIdx, setTextIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('hidden');
  const [ready, setReady] = useState(false);
  const firstChange = useRef(true);

  /* ── Entrance ──────────────────────────────────────────── */
  useEffect(() => {
    let v: ReturnType<typeof setTimeout>;
    const t = setTimeout(() => {
      setReady(true);
      setPhase('entering');
      v = setTimeout(() => setPhase('visible'), 600);
    }, 250);
    return () => {
      clearTimeout(t);
      clearTimeout(v);
    };
  }, []);

  /* ── Auto-advance slides ───────────────────────────────── */
  useEffect(() => {
    const id = setInterval(
      () => setActive((p) => (p + 1) % SLIDES.length),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, []);

  /* ── Animate text on slide change ──────────────────────── */
  useEffect(() => {
    if (firstChange.current) {
      firstChange.current = false;
      return;
    }

    // 1 — exit current text (fade up & out)
    setPhase('exiting');

    // 2 — swap content & reposition below (no transition)
    const t1 = setTimeout(() => {
      setTextIdx(active);
      setPhase('hidden');
    }, 420);

    // 3 — enter new text (rise from below)
    const t2 = setTimeout(() => setPhase('entering'), 480);

    // 4 — mark stable
    const t3 = setTimeout(() => setPhase('visible'), 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [active]);

  const scrollToContent = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  /* ── Phase-driven text helpers ─────────────────────────── */
  const textCls = (): string => {
    switch (phase) {
      case 'exiting':
        return 'opacity-0 -translate-y-8 scale-90 blur-sm';
      case 'hidden':
        return 'opacity-0 translate-y-10 scale-90 blur-sm rotate-2';
      case 'entering':
      case 'visible':
        return 'opacity-100 translate-y-0 scale-100 blur-0 rotate-0';
    }
  };

  const textStyle = (): React.CSSProperties => {
    if (phase === 'hidden') {
      return {
        transitionProperty: 'none',
        transitionDuration: '0ms',
        transitionTimingFunction: 'linear',
        transitionDelay: '0ms',
      };
    }
    if (phase === 'exiting') {
      return {
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: '400ms',
        transitionTimingFunction: 'ease-in',
        transitionDelay: '0ms',
      };
    }
    return {
      transitionProperty: 'opacity, transform, filter',
      transitionDuration: '850ms',
      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      transitionDelay: '0ms',
    };
  };

  const wordDelay = (i: number): React.CSSProperties => ({
    transitionDelay: phase === 'hidden' ? '0ms' : `${i * 80}ms`,
  });

  const slide = SLIDES[textIdx];

  return (
    <section
      className="relative h-screen w-full overflow-hidden select-none"
      role="banner"
      aria-label="NAAKIMS hero"
    >
      {/* ─── BACKGROUND IMAGES (Ken Burns crossfade) ───────── */}
      <div className="absolute inset-0" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={cn(
              'absolute inset-0 will-change-[opacity,transform]',
              i === active ? 'opacity-100' : 'opacity-0',
            )}
            style={{
              transition:
                'opacity 1.6s cubic-bezier(.4,0,.2,1), transform 10s ease-out',
              transform: i === active ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              className="object-cover"
              priority={i === 0}
              quality={85}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* ─── OVERLAY SYSTEM ───────────────────────────────────
           1. Dark base  — heavier left, near-transparent right
           2. NAAKIMS Green — branded directional tint
           3. Bottom vignette — anchoring depth
         ─────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to right, rgba(0,10,5,0.52) 0%, rgba(0,10,5,0.28) 40%, rgba(0,10,5,0.10) 75%, rgba(0,10,5,0.02) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to right, rgba(0,208,132,0.18) 0%, rgba(0,208,132,0.10) 35%, rgba(0,208,132,0.04) 70%, rgba(0,208,132,0.01) 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-52 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to top, rgba(0,12,6,0.52) 0%, transparent 100%)',
        }}
      />

      {/* ─── HERO CONTENT ───────────────────────────────────── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-350 mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-180">

            {/* green accent bar */}
            <div
              className={cn(
                'h-px rounded-full bg-[#008751] mb-2.5 transition-all duration-900 ease-out',
                ready ? 'w-8 opacity-100' : 'w-0 opacity-0',
              )}
            />

            {/* overline */}
            <p
              className={cn(
                'text-white/50 text-[10px] font-medium uppercase tracking-[0.25em] mb-2',
                'transition-all duration-600 ease-out delay-150',
                ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
              )}
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              NAAKIMS Worldwide
            </p>

            {/* ── Dynamic Headline — always exactly 2 lines ── */}
            <h1
              className={cn(
                'text-white font-normal leading-[1.1] tracking-[-0.03em] mb-4',
                'text-[clamp(1.75rem,5.2vw,3.1rem)]',
              )}
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {ready && (
                <>
                  <span
                    key={`${textIdx}-l1`}
                    className={cn(textCls(), 'block')}
                    style={{ ...textStyle(), ...wordDelay(0) }}
                  >
                    {slide.line1}
                  </span>
                  <span
                    key={`${textIdx}-l2`}
                    className={cn(textCls(), 'block')}
                    style={{ ...textStyle(), ...wordDelay(1) }}
                  >
                    {slide.line2}
                  </span>
                </>
              )}
            </h1>

            {/* ── STATIC Sub-headline ── */}
            <p
              className={cn(
                'text-white/60 font-normal leading-[1.6] max-w-lg mb-5',
                'text-[clamp(0.85rem,1.5vw,0.95rem)]',
                'transition-all duration-600 ease-out delay-200',
                ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
              )}
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Empowering Akwa Ibom medical students to become world-class
              healthcare professionals through mentorship, unity, and relentless
              excellence.
            </p>

            {/* ── CTA Buttons ── */}
            <div
              className={cn(
                'flex flex-col sm:flex-row gap-3.5',
                'transition-all duration-600 ease-out',
                ready
                  ? 'opacity-100 translate-y-0 delay-300'
                  : 'opacity-0 translate-y-4',
              )}
            >
              <a
                href="/about"
                className={cn(
                  'inline-flex items-center justify-center gap-2',
                  'px-6 py-3 rounded bg-[#008751] text-white text-sm font-semibold tracking-wide',
                  'shadow-lg shadow-black/20',
                  'hover:bg-[#006d41] active:scale-[0.98]',
                  'transition-all duration-300',
                )}
              >
                Explore NAAKIMS
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="ml-0.5"
                >
                  <path
                    d="M3 8h10m0 0L9 4m4 4L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                href="/chapters"
                className={cn(
                  'inline-flex items-center justify-center',
                  'px-6 py-3 rounded border border-white/25 text-white text-sm font-medium tracking-wide',
                  'backdrop-blur-sm',
                  'hover:bg-white/10 hover:border-white/40',
                  'active:scale-[0.98] transition-all duration-300',
                )}
              >
                Our Chapters
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ─── SLIDE INDICATORS (bottom-left) ────────────────── */}
      <div
        className={cn(
          'absolute bottom-8 left-6 sm:left-10 lg:left-20 z-10 flex items-center gap-2',
          'transition-opacity duration-700',
          ready ? 'opacity-100 delay-500' : 'opacity-0',
        )}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative h-0.5 rounded-full cursor-pointer overflow-hidden transition-all duration-500"
            style={{
              width: i === active ? 40 : 16,
              backgroundColor:
                i === active ? 'transparent' : 'rgba(255,255,255,0.20)',
            }}
            aria-label={`Go to slide ${i + 1}`}
          >
            {i === active && (
              <>
                <span className="absolute inset-0 bg-white/20 rounded-full" />
                <span
                  className="absolute inset-0 bg-white rounded-full origin-left animate-slide-fill"
                  style={{ animationDuration: `${CYCLE_MS}ms` }}
                />
              </>
            )}
          </button>
        ))}
        <span className="text-white/30 text-[10px] font-mono ml-2.5 tabular-nums">
          {String(active + 1).padStart(2, '0')}/
          {String(SLIDES.length).padStart(2, '0')}
        </span>
      </div>

      {/* ─── SCROLL CTA (bottom-right) ─────────────────────── */}
      <button
        onClick={scrollToContent}
        className={cn(
          'absolute bottom-8 right-6 sm:right-10 lg:right-20 z-10',
          'flex items-center gap-3 group cursor-pointer',
          'transition-opacity duration-700',
          ready ? 'opacity-100 delay-500' : 'opacity-0',
        )}
        aria-label="Scroll to content"
      >
        <span className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-medium group-hover:text-white/70 transition-colors">
          Scroll
        </span>
        <span className="relative w-px h-10 bg-white/15 overflow-hidden rounded-full">
          <span className="absolute inset-x-0 h-3 bg-[#00D084] animate-scroll-line rounded-full" />
        </span>
      </button>
    </section>
  );
}
