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
   PROGRAMS DATA
   ───────────────────────────────────────────────────────────── */
const PROGRAMS = [
  {
    id: 'convention',
    num: '01',
    tag: 'Convention',
    title: 'National Medical Convention',
    body: 'Our flagship gathering — three days of keynote lectures, clinical workshops, research presentations, and cultural celebrations uniting all chapters under one roof.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
    stat: '3,000+',
    statLabel: 'Annual Attendees',
    accent: '#00D084',
  },
  {
    id: 'outreach',
    num: '02',
    tag: 'Outreach',
    title: 'Community Health Missions',
    body: 'Health education campaigns, awareness programs, and community engagement initiatives reaching thousands of communities across Akwa Ibom State and beyond.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1400&q=80',
    stat: '50+',
    statLabel: 'Health Campaigns',
    accent: '#008751',
  },
  {
    id: 'mentorship',
    num: '03',
    tag: 'Leadership',
    title: 'Mentorship & Career Development',
    body: 'Pairing students with practising physicians, surgeons, and specialists — structured mentorship that bridges the gap from lecture halls to operating rooms.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80',
    stat: '300+',
    statLabel: 'Active Mentors',
    accent: '#00B872',
  },
] as const;

const IMPACT = [
  { num: '50+', label: 'Health Campaigns' },
  { num: '20+', label: 'Active Chapters' },
  { num: '25+', label: 'Universities Represented' },
  { num: '5,000+', label: 'Members Worldwide' },
];

/* ═════════════════════════════════════════════════════════════
   ProgramsInitiatives
   Light premium interactive showcase with cinematic GSAP
   ═════════════════════════════════════════════════════════════ */
export default function ProgramsInitiatives() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const headerRef     = useRef<HTMLDivElement>(null);
  const panelRef      = useRef<HTMLDivElement>(null);
  const imageWrapRef  = useRef<HTMLDivElement>(null);
  const contentRef    = useRef<HTMLDivElement>(null);
  const statRef       = useRef<HTMLDivElement>(null);
  const impactRef     = useRef<HTMLDivElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const isAnimating = useRef(false);
  const autoTimer   = useRef<ReturnType<typeof setInterval> | null>(null);

  const prog = PROGRAMS[active];

  /* ── Auto-advance ── */
  const startAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setActive((prev) => (prev + 1) % PROGRAMS.length);
    }, 6000);
  }, []);

  useEffect(() => {
    startAuto();
    return () => { if (autoTimer.current) clearInterval(autoTimer.current); };
  }, [startAuto]);

  /* ── Progress bar reset each slide ── */
  useEffect(() => {
    if (!progressRef.current) return;
    gsap.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: 6, ease: 'none' });
  }, [active]);

  /* ── Switch program with GSAP transition ── */
  const switchTo = useCallback((idx: number) => {
    if (idx === active || isAnimating.current) return;
    isAnimating.current = true;
    startAuto();

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false; },
    });

    /* Exit: wipe out image and content */
    if (imageWrapRef.current) {
      tl.to(imageWrapRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        scale: 0.96,
        duration: 0.5,
        ease: 'power3.in',
      }, 0);
    }
    if (contentRef.current) {
      const els = contentRef.current.querySelectorAll('.prog-anim');
      tl.to(els, { opacity: 0, y: -16, duration: 0.3, stagger: 0.03, ease: 'power2.in' }, 0);
    }
    if (statRef.current) {
      tl.to(statRef.current, { opacity: 0, scale: 0.85, duration: 0.3, ease: 'power2.in' }, 0);
    }

    /* Switch state */
    tl.add(() => setActive(idx), 0.5);

    /* Enter: reveal new content */
    if (imageWrapRef.current) {
      tl.fromTo(imageWrapRef.current,
        { clipPath: 'inset(100% 0 0 0)', scale: 0.96 },
        { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 0.9, ease: 'power4.out' },
        0.55,
      );
    }
    if (contentRef.current) {
      const els = contentRef.current.querySelectorAll('.prog-anim');
      tl.fromTo(els,
        { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.8, stagger: 0.08, ease: 'power3.out' },
        0.65,
      );
    }
    if (statRef.current) {
      tl.fromTo(statRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2.5)' },
        0.85,
      );
    }
  }, [active, startAuto]);

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

      /* Impact numbers: stagger up */
      if (impactRef.current) {
        gsap.fromTo(
          impactRef.current.querySelectorAll('.imp-card'),
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.9, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: impactRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          },
        );
      }

      /* Decorative parallax */
      const decos = sectionRef.current?.querySelectorAll('.deco-float');
      decos?.forEach((d) => {
        gsap.to(d, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

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
        {/* Floating gradient orbs */}
        <div className="deco-float absolute -top-20 right-[10%] w-80 h-80 rounded-full bg-[#00D084]/6 blur-[100px]" />
        <div className="deco-float absolute bottom-[15%] -left-10 w-64 h-64 rounded-full bg-[#008751]/5 blur-[80px]" />
        {/* Geometric accent lines */}
        <svg className="absolute top-32 left-8 w-24 h-24 text-[#00D084]/8 deco-float" viewBox="0 0 100 100" fill="none">
          <rect x="10" y="10" width="80" height="80" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <rect x="25" y="25" width="50" height="50" rx="2" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-48 right-12 w-20 h-20 text-[#008751]/6 deco-float" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="18" stroke="currentColor" strokeWidth="1" />
        </svg>
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
              Programs That{' '}
              <span className="text-[#008751]">Transform</span> Lives
            </h2>
            <p
              className="hd-rev text-gray-400 text-[14px] sm:text-[15px] leading-[1.85] max-w-sm lg:text-right"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              From national conventions to grassroots health missions — every initiative empowers, educates, and elevates.
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

            {/* Left — Image Panel */}
            <div className="relative col-span-7 overflow-hidden bg-gray-100">
              <div
                ref={imageWrapRef}
                className="absolute inset-0"
              >
                <Image
                  src={prog.image}
                  alt={prog.title}
                  fill
                  className="object-cover"
                  sizes="60vw"
                  priority
                />
                {/* Bottom gradient for text contrast on image edge */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(0,18,10,0.35) 0%, transparent 50%)' }}
                />
                {/* Green tint overlay on hover state */}
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to bottom right, ${prog.accent}12, transparent 60%)` }}
                />
              </div>

              {/* Floating stat badge */}
              <div
                ref={statRef}
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-xl rounded-xl px-5 py-4 shadow-lg"
                style={{ border: '1px solid rgba(0,208,132,0.15)' }}
              >
                <span
                  className="text-[clamp(1.4rem,2.5vw,2rem)] font-extrabold block leading-none"
                  style={{ color: prog.accent, fontFamily: 'var(--font-poppins)' }}
                >
                  {prog.stat}
                </span>
                <span
                  className="text-gray-400 text-[9px] font-bold uppercase tracking-[0.2em] mt-1 block"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {prog.statLabel}
                </span>
              </div>

              {/* Slide counter */}
              <div className="absolute top-6 left-6 flex items-center gap-2">
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
                  <Link
                    href="/events"
                    className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-md bg-[#008751] text-white text-[13px] font-bold tracking-wide shadow-lg shadow-[#008751]/15 hover:bg-[#006d41] hover:shadow-xl hover:shadow-[#008751]/25 active:scale-[0.97] transition-all duration-300"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Learn More
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                      <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
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

                {/* Progress bar */}
                <div className="h-0.5 bg-gray-100">
                  <div
                    ref={progressRef}
                    className="h-full bg-[#00D084] origin-left"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ─── Mobile: Stacked Interactive Cards ─── */}
          <MobilePrograms active={active} switchTo={switchTo} />
        </div>

        {/* ══════════ IMPACT NUMBERS ══════════ */}
        <div ref={impactRef} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-14">
          {IMPACT.map((item) => (
            <div
              key={item.label}
              className="imp-card group relative rounded-xl bg-white px-5 py-5 sm:py-6 text-center overflow-hidden transition-all duration-400 hover:shadow-lg cursor-default"
              style={{ border: '1px solid rgba(0,135,81,0.08)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}
            >
              {/* Green accent glow on hover */}
              <div className="absolute inset-0 bg-[#00D084]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <span
                className="relative text-[clamp(1.1rem,2.5vw,1.6rem)] font-extrabold text-gray-900 block leading-none tracking-tight"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {item.num}
              </span>
              <span
                className="relative text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mt-1.5 block"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {item.label}
              </span>
              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D084] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* ── Section footer link ── */}
        <div className="flex justify-center mt-10">
          <Link
            href="/events"
            className="group text-[13px] font-semibold text-[#008751] hover:text-[#006d41] transition-colors inline-flex items-center gap-2"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            View All Programs & Events
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
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
                'absolute left-0 top-0 bottom-0 w-0.75 rounded-r-full transition-all duration-500',
                isActive ? 'bg-[#00D084]' : 'bg-transparent',
              )}
            />

            <div className="px-5 sm:px-7 py-5 sm:py-6">
              {/* Header row */}
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    'text-[12px] font-bold tabular-nums transition-colors duration-400',
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
                {/* Image */}
                <div className="relative rounded-lg overflow-hidden mb-4" style={{ height: '160px' }}>
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,18,10,0.3), transparent 50%)' }} />
                  {/* Floating stat */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2" style={{ border: '1px solid rgba(0,208,132,0.12)' }}>
                    <span className="text-[15px] font-extrabold block leading-none" style={{ color: p.accent, fontFamily: 'var(--font-poppins)' }}>
                      {p.stat}
                    </span>
                    <span className="text-gray-400 text-[8px] font-bold uppercase tracking-[0.15em]">
                      {p.statLabel}
                    </span>
                  </div>
                </div>

                <p
                  className="text-gray-500 text-[13px] sm:text-[14px] leading-[1.8] mb-4 pl-8"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {p.body}
                </p>

                <div className="pl-8">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 text-[12px] font-bold text-[#008751]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Learn More
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
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

