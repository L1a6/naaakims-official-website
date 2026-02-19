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
   PROGRAMS DATA
   ───────────────────────────────────────────────────────────── */
const PROGRAMS = [
  {
    id: 'dinnernight',
    num: '01',
    tag: 'Social',
    title: 'Dinner & Awards Night',
    body: 'Our flagship event — an elegant evening of celebration, networking, and recognition, bringing together members, alumni, and distinguished guests for a night of fine dining, awards, and cultural showcases.',
    image: '/images/dinnernight.jpg',
    stat: '500+',
    statLabel: 'Annual Guests',
    accent: '#00D084',
  },
  {
    id: 'outreach',
    num: '02',
    tag: 'Outreach',
    title: 'Community Health Missions',
    body: 'Health education campaigns, awareness programs, and community engagement initiatives reaching thousands of communities across Akwa Ibom and beyond.',
    image: '/images/healthmissions.jpg',
    stat: '50+',
    statLabel: 'Health Campaigns',
    accent: '#008751',
  },
  {
    id: 'bursary',
    num: '03',
    tag: 'Welfare',
    title: 'Student Bursary Programme',
    body: 'Supporting deserving medical and dental surgery students with financial aid to ease the burden of tuition and academic expenses — because no dream should be limited by finances.',
    image: '/images/bursary.jpg',
    stat: 'Coming',
    statLabel: 'Soon',
    accent: '#00B872',
  },
] as const;

const IMPACT: never[] = [];

/* ═════════════════════════════════════════════════════════════
   ProgramsInitiatives
   Light premium interactive showcase with cinematic GSAP
   ═════════════════════════════════════════════════════════════ */
export default function ProgramsInitiatives() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const headerRef     = useRef<HTMLDivElement>(null);
  const panelRef      = useRef<HTMLDivElement>(null);
  const contentRef    = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);
  const isAnimating = useRef(false);

  const prog = PROGRAMS[active];

  /* ── No auto-advance — user controls at will ── */

  /* ── Switch program with smooth crossfade ── */
  const switchTo = useCallback((idx: number) => {
    if (idx === active || isAnimating.current) return;
    isAnimating.current = true;
    setPrevActive(active);

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false; },
    });

    /* Fade out content text */
    if (contentRef.current) {
      const els = contentRef.current.querySelectorAll('.prog-anim');
      tl.to(els, { opacity: 0, y: -12, duration: 0.35, stagger: 0.03, ease: 'power2.in' }, 0);
    }

    /* Switch state (image crossfades via CSS transition) */
    tl.add(() => setActive(idx), 0.3);

    /* Fade in new content text */
    if (contentRef.current) {
      const els = contentRef.current.querySelectorAll('.prog-anim');
      tl.fromTo(els,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out' },
        0.45,
      );
    }
  }, [active]);

  /* ── Scroll-triggered entrance ── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {

      /* Header wipe reveal */
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('.hd-rev'),
          { clipPath: 'inset(0 0 100% 0)', y: 40, opacity: 0 },
          {
            clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1,
            duration: 1.1, stagger: 0.12, ease: 'power4.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          },
        );
      }

      /* Panel: scale + fade entrance */
      if (panelRef.current) {
        gsap.fromTo(panelRef.current,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'power3.out',
            scrollTrigger: { trigger: panelRef.current, start: 'top 82%', toggleActions: 'play none none none' },
          },
        );
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f7faf8 40%, #f0f5f2 100%)' }}
    >
      {/* ── Decorative Background Elements ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle, #008751 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Ambient gradient orbs */}
        <div className="absolute -top-20 right-[10%] w-80 h-80 rounded-full bg-[#00D084]/6 blur-[100px]" />
        <div className="absolute bottom-[15%] -left-10 w-64 h-64 rounded-full bg-[#008751]/5 blur-[80px]" />
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,208,132,0.2), transparent)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-36">

        {/* ══════════ HEADER ══════════ */}
        <div ref={headerRef} className="mb-14 sm:mb-18">
          <div className="hd-rev flex items-center gap-3 mb-5">
            <span className="h-0.75 w-9 rounded-full bg-[#00D084]" />
            <span
              className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-[#00D084]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              The NAAKIMS Experience
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <h2
              className="hd-rev text-[clamp(1.8rem,4.5vw,3.2rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-gray-900 max-w-2xl"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Experiences That{' '}
              <span className="text-[#008751]">Transform Lives</span>
            </h2>
            <p
              className="hd-rev text-gray-400 text-[14px] sm:text-[15px] leading-[1.85] max-w-sm lg:text-right"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              From dinner nights to health missions — a family that empowers, educates, and elevates together.
            </p>
          </div>
        </div>

        {/* ══════════ INTERACTIVE SHOWCASE PANEL ══════════ */}
        <div
          ref={panelRef}
          className="relative rounded-2xl overflow-hidden opacity-0"
          style={{ boxShadow: '0 8px 48px rgba(0,80,42,0.08), 0 1px 3px rgba(0,0,0,0.04)' }}
        >

          {/* ─── Desktop: split image + content ─── */}
          <div className="hidden lg:grid lg:grid-cols-12 bg-white" style={{ minHeight: '480px' }}>

            {/* Left — Image Panel (all images stacked, CSS crossfade) */}
            <div className="relative col-span-7 overflow-hidden bg-gray-100">
              {PROGRAMS.map((p, i) => (
                <div
                  key={p.id}
                  className="absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ opacity: i === active ? 1 : 0 }}
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    quality={100}
                    className="object-cover"
                    sizes="60vw"
                    priority={i === 0}
                  />
                  {/* Bottom gradient for text contrast on image edge */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(0,18,10,0.35) 0%, transparent 50%)' }}
                  />
                  {/* Green tint overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to bottom right, ${p.accent}12, transparent 60%)` }}
                  />
                </div>
              ))}

              {/* Slide counter */}
              <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
                <span
                  className="text-white/80 text-[11px] font-mono tracking-wider font-semibold"
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
                >
                  0{active + 1}
                </span>
                <span className="h-px w-5 bg-white/30" />
                <span
                  className="text-white/40 text-[11px] font-mono tracking-wider"
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
                >
                  0{PROGRAMS.length}
                </span>
              </div>
            </div>

            {/* Right — Content + Navigation */}
            <div className="col-span-5 flex flex-col">

              {/* Content area */}
              <div ref={contentRef} className="flex-1 flex flex-col justify-center px-10 xl:px-14 py-10">
                <span
                  className="prog-anim inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
                  style={{ color: prog.accent, fontFamily: 'var(--font-inter)' }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: prog.accent }} />
                  {prog.tag}
                </span>

                <h3
                  className="prog-anim text-gray-900 text-[clamp(1.4rem,2.5vw,2rem)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-5"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {prog.title}
                </h3>

                <p
                  className="prog-anim text-gray-500 text-[14px] sm:text-[15px] leading-[1.85] mb-7"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {prog.body}
                </p>

                <div className="prog-anim">
                  <span
                    className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#008751] transition-all duration-300"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Learn More
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Tab navigation strip */}
              <div className="border-t border-gray-100">
                {PROGRAMS.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => switchTo(i)}
                    className={cn(
                      'group relative w-full text-left px-10 xl:px-14 py-4 flex items-center gap-5 transition-all duration-400 cursor-pointer',
                      'border-b border-gray-50 last:border-b-0',
                      i === active
                        ? 'bg-[#f0faf5]'
                        : 'bg-white hover:bg-gray-50/80',
                    )}
                  >
                    {/* Active indicator bar */}
                    <div
                      className={cn(
                        'absolute left-0 top-0 bottom-0 w-0.75 rounded-r-full transition-all duration-500',
                        i === active ? 'bg-[#00D084] opacity-100' : 'bg-transparent opacity-0',
                      )}
                    />

                    <span
                      className={cn(
                        'text-[12px] font-bold tabular-nums transition-colors duration-400',
                        i === active ? 'text-[#00D084]' : 'text-gray-300 group-hover:text-gray-400',
                      )}
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {p.num}
                    </span>
                    <span
                      className={cn(
                        'text-[14px] font-semibold tracking-[-0.01em] transition-colors duration-400',
                        i === active ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600',
                      )}
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      {p.title}
                    </span>

                    {/* Arrow for active */}
                    <svg
                      width="12" height="12" viewBox="0 0 16 16" fill="none"
                      className={cn(
                        'ml-auto shrink-0 transition-all duration-400',
                        i === active ? 'text-[#00D084] opacity-100 translate-x-0' : 'text-gray-300 opacity-0 -translate-x-2',
                      )}
                    >
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}

                {/* Bottom accent line */}
                <div className="h-0.5 bg-[#00D084]/20" />
              </div>
            </div>
          </div>

          {/* ─── Mobile: Stacked Interactive Cards ─── */}
          <MobilePrograms active={active} switchTo={switchTo} />
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   MobilePrograms — Premium stacked cards for small screens
   ───────────────────────────────────────────────────────────── */
function MobilePrograms({ active, switchTo }: { active: number; switchTo: (i: number) => void }) {
  return (
    <div className="lg:hidden bg-white">
      {PROGRAMS.map((p, i) => {
        const isActive = i === active;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => switchTo(i)}
            className={cn(
              'relative w-full text-left overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.65,0,0.35,1)] cursor-pointer',
              'border-b border-gray-100 last:border-b-0',
              isActive ? 'bg-[#f6fbf8]' : 'bg-white',
            )}
          >
            {/* Active indicator */}
            <div
              className={cn(
                'absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full transition-all duration-500',
                isActive ? 'bg-[#00D084]' : 'bg-transparent',
              )}
            />

            <div className="px-5 sm:px-7 py-5 sm:py-6">
              {/* Header row */}
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    'text-[13px] font-bold tabular-nums transition-all duration-400',
                    isActive ? 'text-[#00D084]' : 'text-gray-300',
                  )}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {p.num}
                </span>
                <div className="flex-1 flex items-center justify-between">
                  <h3
                    className={cn(
                      'text-[15px] sm:text-[16px] font-bold tracking-[-0.01em] transition-colors duration-400',
                      isActive ? 'text-gray-900' : 'text-gray-400',
                    )}
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {p.title}
                  </h3>
                  <svg
                    width="14" height="14" viewBox="0 0 16 16" fill="none"
                    className={cn('shrink-0 transition-transform duration-400', isActive ? 'rotate-180' : '')}
                  >
                    <path
                      d="M4 6l4 4 4-4"
                      stroke={isActive ? '#00D084' : '#d1d5db'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Expandable content */}
              <div
                className={cn(
                  'overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.65,0,0.35,1)]',
                  isActive ? 'max-h-90 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0',
                )}
              >
                {/* Image first */}
                <div className="relative rounded-xl overflow-hidden mb-4 shadow-lg" style={{ height: '180px' }}>
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    quality={100}
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,18,10,0.45) 0%, transparent 50%)' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,18,10,0.5), transparent 50%)' }} />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom right, ${p.accent}15, transparent 60%)` }} />
                  <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(to right, ${p.accent}, transparent)` }} />
                </div>

                {/* Brief description */}
                <p
                  className="text-gray-500 text-[13px] sm:text-[14px] leading-[1.85] mb-4"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {p.body}
                </p>

                {/* Text CTA */}
                <div>
                  <span
                    className="group inline-flex items-center gap-2 text-[13px] font-semibold transition-all duration-300"
                    style={{ color: p.accent, fontFamily: 'var(--font-inter)' }}
                  >
                    Learn More
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </button>
        );
      })}

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 py-5 bg-white">
        {PROGRAMS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => switchTo(i)}
            className={cn(
              'rounded-full transition-all duration-500 cursor-pointer',
              i === active ? 'w-7 h-1.5 bg-[#00D084]' : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400',
            )}
            aria-label={`Go to program ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

