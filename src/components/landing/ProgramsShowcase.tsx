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
    tag: 'Annual',
    title: 'National Medical Convention',
    body: 'Our flagship gathering — three days of keynote lectures, clinical workshops, research presentations, and cultural celebrations uniting all chapters under one roof.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
    stat: '3,000+',
    statLabel: 'Annual Attendees',
  },
  {
    tag: 'Outreach',
    title: 'Community Health Missions',
    body: 'Health education campaigns, awareness programs, and community engagement initiatives reaching thousands of communities across Akwa Ibom and beyond.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1400&q=80',
    stat: '50+',
    statLabel: 'Health Campaigns',
  },
  {
    tag: 'Leadership',
    title: 'Mentorship & Career Development',
    body: 'Pairing students with practicing physicians, surgeons, and specialists — structured mentorship that bridges the gap from lecture halls to operating rooms.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80',
    stat: '300+',
    statLabel: 'Active Mentorship Pairs',
  },
];

const HIGHLIGHTS = [
  { num: '50+', label: 'Health Campaigns' },
  { num: '20+', label: 'Active Chapters' },
  { num: '25+', label: 'Universities' },
];

/* ═════════════════════════════════════════════════════════════
   ProgramsShowcase — Premium Split-screen Cinematic Slideshow
   ═════════════════════════════════════════════════════════════ */
export default function ProgramsShowcase() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const headerRef     = useRef<HTMLDivElement>(null);
  const slideAreaRef  = useRef<HTMLDivElement>(null);
  const impactRef     = useRef<HTMLDivElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  const [active, setActive]       = useState(0);
  const [animating, setAnimating] = useState(false);
  const initRef = useRef(false);

  const INTERVAL = 6000;

  /* ── Navigate slides with cinematic GSAP transition ───── */
  const goTo = useCallback((next: number) => {
    if (animating || next === active || !slideAreaRef.current) return;
    setAnimating(true);
    const container = slideAreaRef.current;
    const cur  = container.querySelector(`.ps-slide[data-i="${active}"]`) as HTMLElement;
    const nxt  = container.querySelector(`.ps-slide[data-i="${next}"]`) as HTMLElement;
    if (!cur || !nxt) { setAnimating(false); return; }

    nxt.style.visibility = 'visible';
    nxt.style.zIndex = '3';
    cur.style.zIndex = '2';

    const tl = gsap.timeline({
      onComplete() {
        setActive(next);
        setAnimating(false);
        cur.style.visibility = 'hidden';
      },
    });

    // Exit current with clip
    tl.to(cur, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'power4.inOut' });

    // Enter next
    tl.fromTo(nxt,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 0.9, ease: 'power4.inOut' },
      '-=0.35',
    );

    // Ken Burns on image
    const img = nxt.querySelector('.ps-img');
    if (img) tl.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 1.8, ease: 'power2.out' }, '-=0.8');

    // Text reveals
    const txts = nxt.querySelectorAll('.ps-txt');
    if (txts.length) {
      tl.fromTo(txts,
        { opacity: 0, y: 28, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.8, stagger: 0.06, ease: 'power3.out' },
        '-=1.2',
      );
    }

    // Stat pop
    const stat = nxt.querySelector('.ps-stat');
    if (stat) tl.fromTo(stat, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.6');
  }, [active, animating]);

  /* ── Auto-advance ──────────────────────────────────────── */
  useEffect(() => {
    const id = setInterval(() => {
      const nxt = (active + 1) % PROGRAMS.length;
      goTo(nxt);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [active, goTo]);

  /* ── Progress bar reset ────────────────────────────────── */
  useEffect(() => {
    if (!progressRef.current) return;
    gsap.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: INTERVAL / 1000, ease: 'none' });
  }, [active]);

  /* ── GSAP: header + first slide entrance ───────────────── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        const els = headerRef.current.querySelectorAll('.ph-rev');
        gsap.fromTo(els, {
          opacity: 0, y: 45, clipPath: 'inset(0 0 100% 0)',
        }, {
          opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 78%', toggleActions: 'play none none none' },
        });
      }

      // First slide entrance
      if (slideAreaRef.current && !initRef.current) {
        initRef.current = true;
        const first = slideAreaRef.current.querySelector('.ps-slide[data-i="0"]');
        if (first) {
          const img  = first.querySelector('.ps-img');
          const txts = first.querySelectorAll('.ps-txt');
          const stat = first.querySelector('.ps-stat');

          gsap.fromTo(first,
            { clipPath: 'inset(100% 0 0 0)' },
            { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.inOut',
              scrollTrigger: { trigger: slideAreaRef.current, start: 'top 80%', toggleActions: 'play none none none' } },
          );
          if (img) gsap.fromTo(img, { scale: 1.2 }, { scale: 1, duration: 2, delay: 0.3, ease: 'power2.out' });
          if (txts.length) gsap.fromTo(txts,
            { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
            { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.9, delay: 0.5, stagger: 0.08, ease: 'power3.out' },
          );
          if (stat) gsap.fromTo(stat, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, delay: 0.9, ease: 'back.out(2)' });
        }
      }

      // Impact strip entrance
      if (impactRef.current) {
        const items = impactRef.current.querySelectorAll('.imp-item');
        gsap.fromTo(items, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: impactRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">

      {/* ══════════ SECTION HEADER ══════════ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 lg:pt-32 pb-8 sm:pb-12">
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-2xl">
            <div className="ph-rev flex items-center gap-3 mb-4">
              <span className="h-0.75 w-9 rounded-full bg-[#00D084]" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[#00D084]" style={{ fontFamily: 'var(--font-inter)' }}>What We Do</span>
            </div>
            <h2 className="ph-rev text-[clamp(1.6rem,3.5vw,2.6rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
              Programs That{' '}<span className="text-[#008751]">Transform</span> Lives
            </h2>
            <p className="ph-rev text-gray-500 text-[14px] sm:text-[15px] leading-[1.75] max-w-xl" style={{ fontFamily: 'var(--font-inter)' }}>
              From national conventions to grassroots health missions, every NAAKIMS initiative empowers, educates, and elevates.
            </p>
          </div>
          <Link href="/events" className="ph-rev group shrink-0 text-[13px] font-semibold text-[#008751] hover:text-[#006d41] transition-colors inline-flex items-center gap-2 self-start sm:self-auto">
            View All Programs
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-0.5 transition-transform"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>

      {/* ══════════ CINEMATIC SLIDESHOW ══════════ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-6 sm:pb-10">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
          <div
            ref={slideAreaRef}
            className="relative overflow-hidden bg-[#001a0e]"
            style={{ height: 'clamp(280px, 50vh, 520px)' }}
          >
            {PROGRAMS.map((prog, i) => (
              <div
                key={prog.title}
                data-i={i}
                className="ps-slide absolute inset-0"
                style={{
                  visibility: i === 0 ? 'visible' : 'hidden',
                  clipPath: i === 0 ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
                  zIndex: i === 0 ? 2 : 1,
                }}
              >
                {/* Full-bleed image */}
                <div className="ps-img absolute inset-0">
                  <Image src={prog.image} alt={prog.title} fill className="object-cover" sizes="100vw" priority={i === 0} />
                </div>

                {/* Cinematic overlays */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,20,12,0.82) 0%, rgba(0,20,12,0.4) 55%, rgba(0,20,12,0.1) 100%)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,20,12,0.5) 0%, transparent 40%)' }} />

                {/* Content */}
                <div className="absolute inset-0 flex items-end sm:items-center">
                  <div className="w-full px-6 sm:px-10 lg:px-14 pb-16 sm:pb-0">
                    <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end sm:items-center">
                      {/* Text block */}
                      <div className="lg:col-span-7">
                        <span className="ps-txt text-[#00D084] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] mb-2 sm:mb-3 block" style={{ fontFamily: 'var(--font-inter)' }}>{prog.tag}</span>
                        <h3 className="ps-txt text-white text-[clamp(1.2rem,3.5vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.02em] mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>{prog.title}</h3>
                        <p className="ps-txt text-white/50 text-[12px] sm:text-[14px] leading-[1.75] mb-5 sm:mb-6 max-w-lg hidden sm:block" style={{ fontFamily: 'var(--font-inter)' }}>{prog.body}</p>
                        <div className="ps-txt">
                          <Link href="/events" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white text-[12px] sm:text-[13px] font-semibold tracking-wide hover:bg-white/20 active:scale-[0.97] transition-all duration-300">
                            Learn More
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </Link>
                        </div>
                      </div>

                      {/* Floating stat card */}
                      <div className="lg:col-span-5 hidden lg:flex justify-end">
                        <div className="ps-stat bg-white/6 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center min-w-40">
                          <span className="text-[#00D084] text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold block leading-none" style={{ fontFamily: 'var(--font-poppins)' }}>{prog.stat}</span>
                          <span className="text-white/40 text-[10px] font-semibold uppercase tracking-[0.2em] mt-1.5 block">{prog.statLabel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom navigation strip */}
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="h-0.5 bg-white/8">
              <div ref={progressRef} className="h-full bg-[#00D084] origin-left" style={{ transform: 'scaleX(0)' }} />
            </div>
            <div className="flex items-center justify-between px-5 sm:px-10 lg:px-14 py-3" style={{ background: 'rgba(0,18,10,0.7)', backdropFilter: 'blur(14px)' }}>
              <div className="flex items-center gap-2.5">
                {PROGRAMS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={cn(
                      'rounded-full transition-all duration-500',
                      i === active ? 'w-8 sm:w-10 h-1.5 bg-[#00D084]' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/40',
                    )}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <span className="text-white/35 text-[10px] sm:text-[11px] font-mono tracking-wider">
                <span className="text-white font-semibold">0{active + 1}</span> / 0{PROGRAMS.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ IMPACT STRIP ══════════ */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #001a0e 0%, #002a18 50%, #001a0e 100%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-50 bg-[#00D084]/4 rounded-full blur-[100px] pointer-events-none" />

        <div ref={impactRef} className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-10">
            <div className="shrink-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="h-0.5 w-5 rounded-full bg-[#00D084]/50" />
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-[#00D084]/50" style={{ fontFamily: 'var(--font-inter)' }}>Our Impact</span>
              </div>
              <p className="text-white/80 text-[clamp(1.1rem,2.2vw,1.4rem)] font-bold leading-tight tracking-[-0.01em]" style={{ fontFamily: 'var(--font-poppins)' }}>
                Real Numbers,{' '}<span className="text-[#00D084]">Real Impact</span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="imp-item text-center sm:text-left">
                  <span className="text-white text-[clamp(1rem,2.2vw,1.6rem)] font-bold tracking-tight block" style={{ fontFamily: 'var(--font-poppins)' }}>{h.num}</span>
                  <span className="text-white/25 text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] leading-tight block mt-0.5">{h.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
