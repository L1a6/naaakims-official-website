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
   DATA
   ───────────────────────────────────────────────────────────── */
const STATS = [
  { end: 15, suffix: '+', label: 'Years of Legacy' },
  { end: 20, suffix: '+', label: 'Active Chapters' },
  { end: 5000, suffix: '+', label: 'Members Strong' },
  { end: 100, suffix: '+', label: 'Events Hosted' },
];

const PILLARS = [
  {
    num: '01',
    title: 'Academic Excellence',
    sub: 'Mentorship programs, symposiums, and cross‑chapter knowledge exchange that push boundaries in medical education.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
    color: '#00D084',
  },
  {
    num: '02',
    title: 'Global Unity',
    sub: 'Connecting Akwa Ibom medical students across Nigeria and beyond into one powerful united voice for change.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    color: '#008751',
  },
  {
    num: '03',
    title: 'Community Impact',
    sub: 'Healthcare outreach, community service, and public health advocacy driven by deep compassion and purpose.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=900&q=80',
    color: '#00B872',
  },
];

/* ─────────────────────────────────────────────────────────────
   CountUp — GSAP-powered animated counter
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
   useInView — one-shot intersection observer
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
   AboutPreview — Premium Editorial Section
   ═════════════════════════════════════════════════════════════ */
export default function AboutPreview() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const imageRef     = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const pillarsRef   = useRef<HTMLDivElement>(null);
  const statsRef     = useInView(0.35);

  /* ── GSAP Master Timeline ──────────────────────────────── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {

      /* ─ Image: scroll-to-zoom reveal from rounded to full ─ */
      if (imageRef.current) {
        gsap.fromTo(imageRef.current, {
          scale: 0.82,
          clipPath: 'inset(10% 10% 10% 10% round 28px)',
        }, {
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            end: 'top 15%',
            scrub: 0.5,
          },
        });

        // Ken Burns parallax on inner image
        const inner = imageRef.current.querySelector('.about-inner-img');
        if (inner) {
          gsap.to(inner, {
            yPercent: -14,
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      }

      /* ─ Text block: staggered clip-path wipe reveals ──── */
      if (textBlockRef.current) {
        const els = textBlockRef.current.querySelectorAll('.abt-reveal');
        gsap.fromTo(els, {
          opacity: 0,
          y: 50,
          clipPath: 'inset(0 0 100% 0)',
        }, {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textBlockRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
      }

      /* ─ Pillars: cinematic staggered entrance ─────────── */
      if (pillarsRef.current) {
        const cards = pillarsRef.current.querySelectorAll('.pillar-card');
        cards.forEach((card, i) => {
          gsap.fromTo(card, {
            opacity: 0,
            y: 80,
            scale: 0.92,
            rotateX: 6,
          }, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1.2,
            delay: i * 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          });

          // Image wipe inside card
          const img = card.querySelector('.pillar-img-wrap');
          if (img) {
            gsap.fromTo(img, {
              clipPath: 'inset(0 100% 0 0)',
              scale: 1.15,
            }, {
              clipPath: 'inset(0 0% 0 0)',
              scale: 1,
              duration: 1.4,
              delay: i * 0.15 + 0.15,
              ease: 'power4.inOut',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            });
          }
        });
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">

      {/* ══════════════ STATS — Ultra-premium dark strip ══════════════ */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #001a0e 0%, #002a18 50%, #001a0e 100%)' }}
      >
        {/* Ambient glows */}
        <div className="absolute -top-24 left-1/4 w-80 h-80 bg-[#00D084]/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-16 right-1/3 w-56 h-56 bg-[#008751]/5 rounded-full blur-[80px] pointer-events-none" />

        <div ref={statsRef.ref} className="relative max-w-6xl mx-auto grid grid-cols-4 divide-x divide-white/6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                'flex flex-col items-center justify-center py-4 sm:py-7',
                'transition-all duration-700 ease-out',
                statsRef.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span
                className="text-[clamp(0.85rem,3vw,1.9rem)] font-bold tracking-tight text-white"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                <CountUp end={s.end} suffix={s.suffix} started={statsRef.vis} />
              </span>
              <span className="text-[5.5px] sm:text-[10px] text-white/30 font-semibold uppercase tracking-[0.22em] mt-0.5 text-center px-1">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════ SCROLL-ZOOM IMAGE REVEAL ══════════════ */}
      <div className="relative">
        <div
          ref={imageRef}
          className="relative w-full overflow-hidden"
          style={{ height: 'clamp(300px, 52vh, 540px)' }}
        >
          <div className="about-inner-img absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80"
              alt="NAAKIMS students collaborating"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
          {/* Bottom fade to white */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 35%, rgba(255,255,255,0.6) 70%, white 100%)' }}
          />
          {/* Subtle green tint */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(0,80,42,0.12) 0%, transparent 50%)' }}
          />
        </div>
      </div>

      {/* ══════════════ EDITORIAL TEXT BLOCK — Asymmetric 5/7 Grid ══════════════ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 lg:py-28 -mt-12 sm:-mt-20">
        <div ref={textBlockRef} className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left — Large heading block */}
          <div className="lg:col-span-5">
            <div className="abt-reveal flex items-center gap-3 mb-5">
              <span className="h-0.75 w-9 rounded-full bg-[#00D084]" />
              <span
                className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[#00D084]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Who We Are
              </span>
            </div>
            <h2
              className="abt-reveal text-[clamp(1.8rem,4.2vw,3.2rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-gray-900"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Preserving Our Legacy,<br />
              <span className="text-[#008751]">Empowering</span> Our Future
            </h2>
            <div className="abt-reveal h-1 w-14 mt-5" style={{ background: 'linear-gradient(90deg, #00D084, #008751)' }} />


          </div>

          {/* Right — Body text + CTAs */}
          <div className="lg:col-span-7 lg:pt-8">
            <p
              className="abt-reveal text-gray-600 text-[15px] sm:text-[16px] leading-[1.85] mb-5"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              The <strong className="text-gray-900 font-semibold">National Association of Akwa Ibom Medical and Dental Surgery Students (NAAKIMS) Worldwide</strong> unites
              medical and dental surgery students from Akwa Ibom State studying across universities in Nigeria and beyond. Since our founding, we have been a
              beacon of academic excellence, cultural pride, and professional solidarity.
            </p>
            <p
              className="abt-reveal text-gray-500 text-[14px] sm:text-[15px] leading-[1.85] mb-9"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Through mentorship, community health outreach, inter-chapter events, and a shared commitment to service,
              we are shaping the next generation of world-class healthcare leaders — one student at a time.
            </p>

            {/* Premium CTA group */}
            <div className="abt-reveal flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className={cn(
                  'group inline-flex items-center gap-3 px-7 py-3.5 rounded-md',
                  'bg-[#008751] text-white text-[13px] font-bold tracking-wide',
                  'shadow-lg shadow-[#008751]/20 hover:shadow-xl hover:shadow-[#008751]/30',
                  'hover:bg-[#006d41] active:scale-[0.97] transition-all duration-300',
                )}
              >
                Learn Our Story
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/chapters"
                className="group text-[13px] font-semibold text-[#008751] hover:text-[#006d41] transition-colors inline-flex items-center gap-2"
              >
                Discover Chapters
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════ PILLARS — Premium Magazine Cards ══════════════ */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #fafbfa 0%, #f2f4f3 100%)' }}
      >
        {/* Ambient decoration */}
        <div className="absolute -top-32 right-0 w-105 h-105 bg-[#00D084]/3 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#008751]/2 rounded-full blur-[100px] pointer-events-none" />

        <div ref={pillarsRef} className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-0.75 w-9 rounded-full bg-[#00D084]" />
                <span
                  className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[#00D084]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Core Values
                </span>
              </div>
              <h3
                className="text-[clamp(1.4rem,3vw,2.2rem)] font-bold tracking-[-0.02em] text-gray-900 leading-tight"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                What Drives Us <span className="text-[#008751]">Forward</span>
              </h3>
            </div>
            <p
              className="text-gray-400 text-[13px] max-w-xs leading-relaxed"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Three timeless principles that define every chapter, event, and initiative.
            </p>
          </div>

          {/* ─── Desktop: expanding accordion row (hover to expand) ─── */}
          <div className="hidden lg:flex gap-3" style={{ height: '420px' }}>
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="pillar-card group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl flex-1 hover:flex-[2.5] transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] opacity-0"
              >
                <div className="pillar-img-wrap absolute inset-0">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-black/5 group-hover:from-black/90 transition-all duration-500" />
                {/* Green hover overlay */}
                <div className="absolute inset-0 bg-[#008751]/0 group-hover:bg-[#008751]/15 transition-all duration-600 z-1" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#00D084]/0 group-hover:via-[#00D084]/70 to-transparent transition-all duration-700" />
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <span className="text-white/20 text-[10px] font-mono tracking-[0.3em] mb-2 group-hover:text-[#00D084]/40 transition-colors duration-500">{p.num}</span>
                  <div className="w-0 group-hover:w-12 h-0.5 bg-[#00D084] mb-3 rounded-full transition-all duration-700 ease-out" />
                  <h4
                    className="text-white text-[clamp(1.1rem,2vw,1.5rem)] font-bold leading-tight tracking-[-0.01em] mb-2 group-hover:text-[#00D084] transition-colors duration-500"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {p.title}
                  </h4>
                  <p className="text-white/0 group-hover:text-white/70 text-[13px] leading-[1.7] max-w-md transition-all duration-500 translate-y-3 group-hover:translate-y-0" style={{ fontFamily: 'var(--font-inter)' }}>
                    {p.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ─── Mobile: stacked full-width cards ─── */}
          <MobilePillars />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   MobilePillars — swipe-enabled cards for small screens
   ───────────────────────────────────────────────────────────── */
function MobilePillars() {
  const [active, setActive] = useState(0);
  const touchX = useRef(0);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % PILLARS.length), 4500);
    return () => clearInterval(id);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const d = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(d) > 40) setActive((p) => d > 0 ? (p + 1) % PILLARS.length : (p - 1 + PILLARS.length) % PILLARS.length);
  };

  return (
    <div className="lg:hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="flex flex-col gap-3">
        {PILLARS.map((p, i) => (
          <div
            key={p.title}
            onClick={() => setActive(i)}
            className={cn(
              'relative rounded-xl overflow-hidden cursor-pointer shadow-md transition-all duration-600 ease-[cubic-bezier(0.65,0,0.35,1)]',
              i === active ? 'ring-1 ring-[#00D084]/30' : 'opacity-60',
            )}
            style={{ height: i === active ? '180px' : '70px' }}
          >
            <Image src={p.image} alt={p.title} fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
            {/* Green tint overlay for active card */}
            <div className={cn('absolute inset-0 transition-all duration-500 z-1', i === active ? 'bg-[#008751]/15' : 'bg-transparent')} />
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <span className="text-white/25 text-[9px] font-mono tracking-[0.2em] mb-1">{p.num}</span>
              <h4 className="text-white text-[14px] font-bold leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>{p.title}</h4>
              {i === active && (
                <p className="text-white/60 text-[11px] leading-[1.6] mt-1.5 line-clamp-2" style={{ fontFamily: 'var(--font-inter)' }}>{p.sub}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {PILLARS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              'rounded-full transition-all duration-500',
              i === active ? 'w-6 h-1.5 bg-[#00D084]' : 'w-1.5 h-1.5 bg-gray-300',
            )}
          />
        ))}
      </div>
    </div>
  );
}
