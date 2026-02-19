'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

/* ═════════════════════════════════════════════════════════════
   Preloader — Premium Split-Curtain
   • No decorative props visible before GSAP runs
   • High-damping spring letter stagger
   • Progress bar fill
   • Split-curtain exit (top ↑, bottom ↓)
   ═════════════════════════════════════════════════════════════ */

const LETTERS = 'NAAKIMS'.split('');

const STATUS_TEXTS = [
  'Initializing',
  'Loading resources',
  'Preparing experience',
  'Welcome',
];

export default function Preloader() {
  const overlayRef       = useRef<HTMLDivElement>(null);
  const topCurtainRef    = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const lettersRef       = useRef<(HTMLSpanElement | null)[]>([]);
  const barFillRef       = useRef<HTMLDivElement>(null);
  const barGlowRef       = useRef<HTMLDivElement>(null);
  const statusRef        = useRef<HTMLSpanElement>(null);
  const counterRef       = useRef<HTMLSpanElement>(null);

  const [done,   setDone]   = useState(false);
  const [hidden, setHidden] = useState(false);
  const statusIdxRef = useRef(0);

  const setLetterRef = useCallback(
    (el: HTMLSpanElement | null, i: number) => { lettersRef.current[i] = el; },
    [],
  );

  /* ── Phase 1: Entrance ── */
  useEffect(() => {
    if (hidden) return;
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const validLetters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];

      /* Letters stagger reveal */
      gsap.fromTo(
        validLetters,
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.85,
          stagger: { each: 0.07, ease: 'power2.out' },
          ease: 'power3.out',
          delay: 0.25,
        },
      );
    }, overlayRef);

    return () => ctx.revert();
  }, [hidden]);

  /* ── Phase 2: Progress ── */
  useEffect(() => {
    if (hidden) return;

    let progress = 0;
    let targetProgress = 0;
    let frame: number;

    const update = () => {
      progress += (targetProgress - progress) * 0.05;
      const clamped = Math.min(progress, 100);

      if (barFillRef.current) barFillRef.current.style.width = `${clamped}%`;
      if (barGlowRef.current)  barGlowRef.current.style.left  = `${clamped}%`;
      if (counterRef.current)  counterRef.current.textContent  = `${Math.round(clamped)}%`;

      let newIdx = 0;
      if (clamped >= 85) newIdx = 3;
      else if (clamped >= 55) newIdx = 2;
      else if (clamped >= 25) newIdx = 1;

      if (newIdx !== statusIdxRef.current && statusRef.current) {
        statusIdxRef.current = newIdx;
        gsap.to(statusRef.current, {
          opacity: 0, y: -4, duration: 0.18, ease: 'power2.in',
          onComplete: () => {
            if (statusRef.current) {
              statusRef.current.textContent = STATUS_TEXTS[newIdx] ?? '';
              gsap.fromTo(statusRef.current, { opacity: 0, y: 4 }, { opacity: 0.4, y: 0, duration: 0.25, ease: 'power2.out' });
            }
          },
        });
      }

      if (clamped < 99.5) frame = requestAnimationFrame(update);
    };

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const stages = [
      { delay: 300,  target: 20 },
      { delay: 700,  target: 42 },
      { delay: 1200, target: 58 },
      { delay: 1700, target: 75 },
      { delay: 2200, target: 88 },
    ];
    stages.forEach(({ delay, target }) => {
      timeouts.push(setTimeout(() => { targetProgress = target; }, delay));
    });

    const handleLoad = () => { targetProgress = 100; setTimeout(() => setDone(true), 700); };
    if (document.readyState === 'complete') {
      timeouts.push(setTimeout(() => { targetProgress = 100; setTimeout(() => setDone(true), 800); }, 2400));
    } else {
      window.addEventListener('load', handleLoad);
    }
    const maxWait = setTimeout(() => { targetProgress = 100; setTimeout(() => setDone(true), 500); }, 4500);

    frame = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(frame);
      timeouts.forEach(clearTimeout);
      clearTimeout(maxWait);
      window.removeEventListener('load', handleLoad);
    };
  }, [hidden]);

  /* ── Phase 3: Exit ── */
  useEffect(() => {
    if (!done || hidden) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          setHidden(true);
        },
      });

      /* Flash letters green */
      const validLetters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
      tl.to(validLetters, {
        color: '#00D084',
        textShadow: '0 0 24px rgba(0,208,132,0.6)',
        duration: 0.3, stagger: 0.025, ease: 'power2.out',
      });
      tl.to(validLetters, { opacity: 0, y: -30, duration: 0.45, stagger: 0.04, ease: 'power2.in' }, 0.3);

      /* Start revealing page content BEFORE curtains split so there's no ghost gap */
      tl.add(() => {
        const pageContent = document.getElementById('page-content');
        if (pageContent) pageContent.style.opacity = '1';
      }, 0.35);

      /* Curtain split */
      tl.to(topCurtainRef.current,    { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, 0.55);
      tl.to(bottomCurtainRef.current, { yPercent:  100, duration: 0.85, ease: 'power4.inOut' }, 0.55);

      /* Fade out any residual overlay elements (seam glow, ambient) */
      tl.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' }, 1.1);
    }, overlayRef);

    return () => ctx.revert();
  }, [done, hidden]);

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 pointer-events-auto"
      style={{ zIndex: 9999 }}
      aria-live="polite"
      aria-label="Loading"
    >
      {/* ── Top curtain ── */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 right-0 h-1/2"
        style={{ background: 'linear-gradient(180deg, #001a0e 0%, #00120a 100%)' }}
      />

      {/* ── Bottom curtain ── */}
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{ background: 'linear-gradient(0deg, #001a0e 0%, #00120a 100%)' }}
      />

      {/* ── Curtain seam glow ── */}
      <div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent 5%, rgba(0,208,132,0.12) 30%, rgba(0,208,132,0.18) 50%, rgba(0,208,132,0.12) 70%, transparent 95%)' }}
      />

      {/* ── Ambient glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 48%, rgba(0,208,132,0.03) 0%, transparent 70%)' }}
      />

      {/* ── Center content ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">

        {/* NAAKIMS letters */}
        <div className="flex items-center mb-4" style={{ gap: '0.10em' }}>
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              ref={(el) => setLetterRef(el, i)}
              className="inline-block font-bold select-none"
              style={{
                fontFamily: 'var(--font-poppins)',
                fontSize: 'clamp(2.2rem,7.5vw,4rem)',
                letterSpacing: '-0.03em',
                color: '#ffffff',
                lineHeight: 1,
                opacity: 0,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Worldwide label */}
        <span
          className="text-white/20 font-semibold uppercase mb-10"
          style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', letterSpacing: '0.4em' }}
        >
          Worldwide
        </span>

        {/* Progress bar */}
        <div className="relative" style={{ width: 'clamp(140px,26vw,220px)' }}>
          <div
            className="relative h-px overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          >
            <div
              ref={barFillRef}
              className="absolute inset-y-0 left-0"
              style={{ width: '0%', background: 'linear-gradient(90deg, #008751, #00D084)' }}
            />
          </div>
          <div
            ref={barGlowRef}
            className="absolute top-1/2 pointer-events-none"
            style={{
              left: '0%',
              width: 6, height: 6,
              borderRadius: '50%',
              background: '#00D084',
              boxShadow: '0 0 10px rgba(0,208,132,0.5)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>

        {/* Status row */}
        <div className="flex items-center gap-4 mt-4">
          <span
            ref={statusRef}
            className="text-white/40 font-medium"
            style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', letterSpacing: '0.06em' }}
          >
            {STATUS_TEXTS[0]}
          </span>
          <span
            ref={counterRef}
            className="text-white/25 font-semibold tabular-nums"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: '10px' }}
          >
            0%
          </span>
        </div>

      </div>
    </div>
  );
}