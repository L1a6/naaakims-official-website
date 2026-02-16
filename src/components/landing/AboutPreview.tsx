'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────────────────────
   STATS — key numbers
   ───────────────────────────────────────────────────────────── */
const STATS = [
  { end: 15,   suffix: '+', label: 'Years'     },
  { end: 20,   suffix: '+', label: 'Chapters'  },
  { end: 5000, suffix: '+', label: 'Members'   },
  { end: 100,  suffix: '+', label: 'Events'    },
];

/* ─────────────────────────────────────────────────────────────
   PILLARS — cinematic image cards
   ───────────────────────────────────────────────────────────── */
const PILLARS = [
  {
    num: '01',
    title: 'Academic Excellence',
    sub: 'Mentorship programs, symposiums, and cross-chapter knowledge exchange that push boundaries in medical education.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '02',
    title: 'Global Unity',
    sub: 'Connecting Akwa Ibom medical students across Nigeria and beyond into one powerful united voice for change.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '03',
    title: 'Community Impact',
    sub: 'Healthcare outreach, community service, and public health advocacy driven by deep compassion and purpose.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=900&q=80',
  },
];

/* ─────────────────────────────────────────────────────────────
   CountUp — GSAP-powered counter
   ───────────────────────────────────────────────────────────── */
function CountUp({ end, suffix, started }: { end: number; suffix: string; started: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const ran = useRef(false);
  useEffect(() => {
    if (!started || ran.current || !ref.current) return;
    ran.current = true;
    const o = { v: 0 };
    gsap.to(o, {
      v: end,
      duration: end > 999 ? 2.4 : 1.8,
      ease: 'power2.out',
      onUpdate() {
        if (ref.current)
          ref.current.textContent =
            (end >= 1000 ? Math.floor(o.v).toLocaleString() : String(Math.floor(o.v))) + suffix;
      },
    });
  }, [started, end, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─────────────────────────────────────────────────────────────
   useInView — scroll-triggered once
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
   AboutPreview Component
   ═════════════════════════════════════════════════════════════ */
export default function AboutPreview() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);
  const imageClipRef = useRef<HTMLDivElement>(null);
  const imageInner   = useRef<HTMLDivElement>(null);
  const statsRef     = useInView(0.4);
  const pillarsRef   = useInView(0.12);

  /* ── GSAP — About block cinematic entrance with ScrollTrigger ── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Text reveals with ScrollTrigger
      const els = textRef.current?.querySelectorAll('.g-up');
      if (els?.length) {
        gsap.fromTo(els,
          { opacity: 0, y: 48, clipPath: 'inset(0 0 100% 0)' },
          {
            opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: textRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          },
        );
      }
      // cinematic wipe on image with ScrollTrigger
      if (imageClipRef.current) {
        gsap.fromTo(imageClipRef.current,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut',
            scrollTrigger: { trigger: imageClipRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          },
        );
      }
      // Ken-Burns scale
      if (imageInner.current) {
        gsap.fromTo(imageInner.current,
          { scale: 1.18 },
          {
            scale: 1, duration: 1.8, ease: 'power3.out',
            scrollTrigger: { trigger: imageInner.current, start: 'top 85%', toggleActions: 'play none none none' },
          },
        );
      }
      // Parallax on about image
      if (imageClipRef.current) {
        gsap.to(imageClipRef.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: imageClipRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── GSAP — Pillar cinematic reveals with ScrollTrigger ── */
  useEffect(() => {
    if (!pillarsRef.vis) return;
    const cards = document.querySelectorAll('.p-card');
    if (!cards.length) return;

    cards.forEach((card, i) => {
      const img  = card.querySelector('.p-img');
      const txt  = card.querySelectorAll('.p-txt');
      const line = card.querySelector('.p-line');

      if (img) gsap.fromTo(img,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)', duration: 1.2, delay: i * 0.2, ease: 'power4.inOut',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
        },
      );
      if (txt.length) gsap.fromTo(txt,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.85, delay: 0.35 + i * 0.2, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
        },
      );
      if (line) gsap.fromTo(line,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 0.7, delay: 0.55 + i * 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
        },
      );
    });
  }, [pillarsRef.vis]);

  /* ══════════════════════════════════════════════════════════ */
  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">

      {/* ─── STATS — ultra-compact dark strip ────────────── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #002a14 0%, #003d1e 50%, #002a14 100%)' }}>
        <div className="absolute -top-20 left-1/3 w-72 h-72 bg-[#00D084]/8 rounded-full blur-3xl pointer-events-none" />
        <div ref={statsRef.ref} className="relative max-w-6xl mx-auto grid grid-cols-4 divide-x divide-white/8">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                'flex flex-col items-center justify-center py-1.5 sm:py-5',
                'transition-all duration-700 ease-out',
                statsRef.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
              )}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="text-[clamp(0.7rem,2.5vw,1.55rem)] font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
                <CountUp end={s.end} suffix={s.suffix} started={statsRef.vis} />
              </span>
              <span className="text-[6px] sm:text-[10px] text-white/40 font-semibold uppercase tracking-[0.18em] mt-0">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── MAIN ABOUT ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Text */}
          <div ref={textRef}>
            <div className="g-up flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-[#00D084]" />
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00D084]" style={{ fontFamily: 'var(--font-inter)' }}>Who We Are</span>
            </div>
            <h2 className="g-up text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.02em] text-gray-900 mb-5" style={{ fontFamily: 'var(--font-poppins)' }}>
              Preserving Our Legacy,{' '}<span className="text-[#008751]">Empowering</span> Our Future
            </h2>
            <p className="g-up text-gray-600 text-[15px] leading-[1.75] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
              The <strong className="text-gray-800 font-semibold">National Association of Akwa Ibom State Medical Students (NAAKIMS) Worldwide</strong> unites
              medical students from Akwa Ibom State studying across universities in Nigeria and beyond. Since our founding, we have been a
              beacon of academic excellence, cultural pride, and professional solidarity.
            </p>
            <p className="g-up text-gray-500 text-[14px] leading-[1.75] mb-7" style={{ fontFamily: 'var(--font-inter)' }}>
              Through mentorship, community health outreach, inter-chapter events, and a shared commitment to service,
              we are shaping the next generation of world-class healthcare leaders — one student at a time.
            </p>
            <div className="g-up flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/about" className={cn('inline-flex items-center gap-2 px-5 py-2.5 rounded-md', 'bg-[#008751] text-white text-[13px] font-semibold tracking-wide', 'shadow-sm hover:bg-[#006d41] active:scale-[0.98]', 'transition-all duration-300')}>
                Learn Our Story
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/chapters" className="text-[13px] font-medium text-[#008751] hover:text-[#006d41] transition-colors inline-flex items-center gap-1.5 group">
                Discover Our Chapters
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform duration-200"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>

          {/* Image — cinematic wipe + zoom */}
          <div className="relative">
            <div className="absolute -top-3 -right-3 w-full h-full rounded-xl border-2 border-[#00D084]/20 pointer-events-none" />
            <div ref={imageClipRef} className="relative rounded-xl overflow-hidden shadow-2xl aspect-4/3">
              <div ref={imageInner} className="absolute inset-0">
                <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" alt="NAAKIMS students collaborating" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top right, rgba(0,80,42,0.25) 0%, transparent 60%)' }} />
            </div>
            <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] px-5 py-4 border border-white/60 ring-1 ring-black/[0.03]">
              <div className="flex items-center gap-3.5">
                <div className="relative w-11 h-11 rounded-xl bg-linear-to-br from-[#00D084] to-[#008751] flex items-center justify-center shrink-0 shadow-sm shadow-[#00D084]/25">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/></svg>
                </div>
                <div>
                  <p className="text-gray-900 text-[15px] font-bold leading-tight tracking-[-0.01em]" style={{ fontFamily: 'var(--font-poppins)' }}>20+ Chapters</p>
                  <p className="text-gray-400 text-[11px] font-medium leading-snug tracking-wide">Across Nigeria & Beyond</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── PILLARS — interactive accordion with image reveal ── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #fafbfa 0%, #f5f7f6 100%)' }}>
        <div className="absolute -top-20 right-0 w-96 h-96 bg-[#00D084]/4 rounded-full blur-[120px] pointer-events-none" />

        <div ref={pillarsRef.ref} className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8 sm:mb-12">
            <span className="h-px w-6 bg-[#00D084]" />
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00D084]" style={{ fontFamily: 'var(--font-inter)' }}>Core Values</span>
          </div>

          {/* DESKTOP: expanding accordion row */}
          <div className="hidden lg:flex gap-2 lg:h-105">
            {PILLARS.map((p, i) => (
              <PillarCard key={p.title} pillar={p} index={i} visible={pillarsRef.vis} />
            ))}
          </div>

          {/* MOBILE: auto-sliding carousel with taller cards */}
          <MobilePillarCarousel pillars={PILLARS} visible={pillarsRef.vis} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   MobilePillarCarousel — peek carousel showing adjacent cards
   ───────────────────────────────────────────────────────────── */
function MobilePillarCarousel({ pillars, visible }: { pillars: typeof PILLARS; visible: boolean }) {
  const [active, setActive] = useState(0);
  const [isAnim, setIsAnim] = useState(false);
  const trackRef  = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const entered = useRef(false);

  const goTo = (idx: number) => {
    if (isAnim || idx === active) return;
    setIsAnim(true);

    if (!trackRef.current) { setIsAnim(false); return; }
    const cards = trackRef.current.querySelectorAll<HTMLElement>('.mp-card');

    // Animate all cards to new positions
    cards.forEach((card, i) => {
      const offset = i - idx;
      gsap.to(card, {
        x: `${offset * 82}%`,
        scale: offset === 0 ? 1 : 0.82,
        opacity: Math.abs(offset) > 1 ? 0 : offset === 0 ? 1 : 0.35,
        filter: offset === 0 ? 'blur(0px)' : 'blur(3px)',
        zIndex: offset === 0 ? 5 : 2,
        duration: 0.6,
        ease: 'power3.out',
        onComplete: () => {
          if (i === idx) { setActive(idx); setIsAnim(false); }
        },
      });
    });
  };

  // Auto-advance
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      const next = (active + 1) % pillars.length;
      goTo(next);
    }, 4500);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, visible]);

  // Entrance — position all cards
  useEffect(() => {
    if (!visible || entered.current || !trackRef.current) return;
    entered.current = true;
    const cards = trackRef.current.querySelectorAll<HTMLElement>('.mp-card');
    cards.forEach((card, i) => {
      const offset = i - 0;
      gsap.set(card, {
        x: `${offset * 82}%`,
        scale: offset === 0 ? 1 : 0.82,
        opacity: Math.abs(offset) > 1 ? 0 : offset === 0 ? 1 : 0.35,
        filter: offset === 0 ? 'blur(0px)' : 'blur(3px)',
        zIndex: offset === 0 ? 5 : 2,
      });
    });
    // Animate first card entrance
    const first = cards[0];
    if (first) {
      gsap.fromTo(first, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' });
    }
  }, [visible]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goTo((active + 1) % pillars.length);
      else goTo((active - 1 + pillars.length) % pillars.length);
    }
  };

  return (
    <div className="lg:hidden">
      <div
        className="relative overflow-hidden mx-2 sm:mx-6"
        style={{ height: 'clamp(380px, 65vw, 500px)' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div ref={trackRef} className="absolute inset-0 flex items-center justify-center">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="mp-card absolute rounded-2xl overflow-hidden shadow-xl cursor-pointer"
              style={{ width: '80%', height: '90%', left: '10%', top: '5%', willChange: 'transform, opacity, filter' }}
              onClick={() => goTo(i)}
            >
              <div className="absolute inset-0">
                <Image src={p.image} alt={p.title} fill className="object-cover" sizes="85vw" />
              </div>
              {/* Dark gradient overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,40,22,0.95) 0%, rgba(0,60,32,0.55) 40%, rgba(0,60,32,0.08) 70%, transparent 100%)' }} />
              {/* Curved green accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,80,42,0.35) 0%, rgba(0,80,42,0.12) 50%, transparent 100%)', borderRadius: '35% 35% 0 0 / 18% 18% 0 0' }} />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <span className="text-[#00D084]/70 text-[10px] font-mono tracking-[0.3em] block mb-1.5">{p.num}</span>
                <h3 className="text-white text-[1.15rem] sm:text-[1.3rem] font-bold leading-tight tracking-[-0.01em] mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {p.title}
                </h3>
                <p className="text-white/65 text-[12px] sm:text-[13px] leading-[1.7] line-clamp-3" style={{ fontFamily: 'var(--font-inter)' }}>
                  {p.sub}
                </p>
              </div>

              {/* Bottom shimmer */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#00D084]/50 to-transparent" />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
          {pillars.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                'rounded-full transition-all duration-500',
                i === active ? 'w-7 h-2 bg-[#00D084] shadow-[0_0_8px_rgba(0,208,132,0.4)]' : 'w-2 h-2 bg-white/30',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PillarCard — desktop expanding accordion card with GSAP
   ───────────────────────────────────────────────────────────── */
function PillarCard({
  pillar,
  index,
  visible,
}: {
  pillar: typeof PILLARS[number];
  index: number;
  visible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLDivElement>(null);
  const txtRef  = useRef<HTMLDivElement>(null);
  const entered = useRef(false);

  // Entrance animation
  useEffect(() => {
    if (!visible || entered.current || !cardRef.current) return;
    entered.current = true;

    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: index * 0.15, ease: 'power3.out' },
    );
  }, [visible, index]);

  // Hover GSAP — image zoom + text slide
  useEffect(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const img  = imgRef.current;
    const txt  = txtRef.current;

    const onEnter = () => {
      if (img) gsap.to(img, { scale: 1.06, duration: 0.8, ease: 'power2.out' });
      if (txt) gsap.to(txt, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
    };
    const onLeave = () => {
      if (img) gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.inOut' });
      if (txt) gsap.to(txt, { y: 12, opacity: 0.7, duration: 0.4, ease: 'power2.in' });
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  /* ── Desktop card: expanding accordion ───────────────── */
  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative rounded-2xl overflow-hidden cursor-pointer opacity-0',
        'lg:flex-1 lg:hover:flex-[2.5] transition-all duration-700 ease-[cubic-bezier(0.65,0.01,0.05,0.99)]',
        'h-full',
        'shadow-lg hover:shadow-2xl',
      )}
    >
      {/* Full bleed image */}
      <div ref={imgRef} className="absolute inset-0">
        <Image
          src={pillar.image}
          alt={pillar.title}
          fill
          className="object-cover"
          sizes="50vw"
        />
      </div>

      {/* Cinematic gradient — gets darker on hover */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 group-hover:via-black/40 transition-all duration-700" />

      {/* Curved green overlay that appears on hover for readability */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[60%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,80,42,0.55) 0%, rgba(0,80,42,0.30) 40%, rgba(0,80,42,0.05) 80%, transparent 100%)',
          borderRadius: '40% 40% 0 0 / 20% 20% 0 0',
        }}
      />

      {/* Green shimmer at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#00D084]/0 group-hover:via-[#00D084]/70 to-transparent transition-all duration-700" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7">
        {/* Number */}
        <span className="absolute top-5 left-5 text-white/30 text-[10px] font-mono tracking-[0.3em] group-hover:text-[#00D084]/60 transition-colors duration-500">
          {pillar.num}
        </span>

        {/* Green accent line */}
        <div className="w-0 group-hover:w-10 h-0.5 bg-[#00D084] mb-3 rounded-full transition-all duration-700 ease-out" />

        {/* Title — always visible */}
        <h3
          className="text-white text-[clamp(1.15rem,2vw,1.45rem)] font-bold leading-[1.2] tracking-[-0.01em] mb-2 group-hover:text-[#00D084] transition-colors duration-500"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          {pillar.title}
        </h3>

        {/* Description — revealed on hover via GSAP + CSS */}
        <div
          ref={txtRef}
          className="opacity-70 translate-y-3 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500"
        >
          <p
            className="text-white/70 text-[12px] sm:text-[13px] leading-[1.65] max-w-sm"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {pillar.sub}
          </p>
        </div>
      </div>
    </div>
  );
}
