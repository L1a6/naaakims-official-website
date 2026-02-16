'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────────
   PROGRAMS — flagship NAAKIMS initiatives
   ───────────────────────────────────────────────────────────── */
const PROGRAMS = [
  {
    tag: 'Annual',
    title: 'National Medical Convention',
    body: 'Our flagship gathering — three days of keynote lectures, clinical workshops, research presentations, and cultural celebrations uniting all chapters under one roof.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
    color: '#008751',
  },
  {
    tag: 'Outreach',
    title: 'Community Health Missions',
    body: 'Free medical screenings, health education campaigns, and rural healthcare interventions reaching thousands of underserved communities across Akwa Ibom and beyond.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1000&q=80',
    color: '#00B872',
  },
  {
    tag: 'Leadership',
    title: 'Mentorship & Career Development',
    body: 'Pairing students with practicing physicians, surgeons, and specialists — structured mentorship that bridges the gap from lecture halls to operating rooms.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
    color: '#00D084',
  },
];

/* ─────────────────────────────────────────────────────────────
   IMPACT HIGHLIGHTS — mini stat cards
   ───────────────────────────────────────────────────────────── */
const HIGHLIGHTS = [
  { num: '50+',  label: 'Health Campaigns Completed' },
  { num: '12K+', label: 'Patients Screened Free' },
  { num: '300+', label: 'Mentorship Pairs Active' },
  { num: '25+',  label: 'Universities Represented' },
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
   ProgramsShowcase Component
   ═════════════════════════════════════════════════════════════ */
export default function ProgramsShowcase() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headerRef   = useInView(0.3);
  const cardsRef    = useInView(0.1);
  const impactRef   = useInView(0.25);
  const [activeIdx, setActiveIdx] = useState(0);

  /* ── GSAP — header text reveal ─────────────────────────── */
  useEffect(() => {
    if (!headerRef.vis) return;
    const els = document.querySelectorAll('.prog-hdr');
    if (!els.length) return;
    gsap.fromTo(els,
      { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0, stagger: 0.12, ease: 'power3.out' },
    );
  }, [headerRef.vis]);

  /* ── GSAP — cards stagger entrance ─────────────────────── */
  useEffect(() => {
    if (!cardsRef.vis) return;
    const cards = document.querySelectorAll('.prog-card');
    if (!cards.length) return;

    cards.forEach((card, i) => {
      const img  = card.querySelector('.prog-card-img');
      const txts = card.querySelectorAll('.prog-card-txt');

      // image cinematic wipe from bottom
      if (img) {
        gsap.fromTo(img,
          { clipPath: 'inset(100% 0 0 0)', scale: 1.08 },
          { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.2, delay: i * 0.15, ease: 'power4.inOut' },
        );
      }
      // text fade-up
      if (txts.length) {
        gsap.fromTo(txts,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, delay: 0.3 + i * 0.15, stagger: 0.08, ease: 'power3.out' },
        );
      }
    });
  }, [cardsRef.vis]);

  /* ── GSAP — impact row ─────────────────────────────────── */
  useEffect(() => {
    if (!impactRef.vis) return;
    const items = document.querySelectorAll('.imp-item');
    if (!items.length) return;
    gsap.fromTo(items,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
    );
  }, [impactRef.vis]);

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

      {/* ─── FEATURED PROGRAM — full-width hero card ─────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-6">
        <div ref={cardsRef.ref} className="relative rounded-2xl overflow-hidden shadow-2xl group prog-card">
          {/* Background image */}
          <div className="prog-card-img relative aspect-21/9 sm:aspect-21/8 lg:aspect-21/7">
            <Image
              src={PROGRAMS[0].image}
              alt={PROGRAMS[0].title}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-out"
              sizes="100vw"
              priority
            />
            {/* Multi-layer cinematic overlay */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,26,14,0.88) 0%, rgba(0,26,14,0.5) 50%, rgba(0,26,14,0.2) 100%)' }} />
            <div className="absolute inset-0 bg-linear-to-t from-[#001a0e]/70 via-transparent to-transparent" />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
            <span className="prog-card-txt text-[#00D084] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
              {PROGRAMS[0].tag} — Flagship Event
            </span>
            <h3 className="prog-card-txt text-white text-[clamp(1.4rem,3vw,2.2rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-3 max-w-lg" style={{ fontFamily: 'var(--font-poppins)' }}>
              {PROGRAMS[0].title}
            </h3>
            <p className="prog-card-txt text-white/60 text-[13px] sm:text-[14px] leading-[1.7] max-w-md mb-5" style={{ fontFamily: 'var(--font-inter)' }}>
              {PROGRAMS[0].body}
            </p>
            <div className="prog-card-txt">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white/10 backdrop-blur-sm border border-white/15 text-white text-[12px] sm:text-[13px] font-semibold tracking-wide hover:bg-white/20 active:scale-[0.98] transition-all duration-300"
              >
                View Events
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>

          {/* decorative green line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#00D084] via-[#008751] to-transparent" />
        </div>
      </div>

      {/* ─── TWO PROGRAM CARDS — side by side ────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-20 sm:pb-28 lg:pb-32">
        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {PROGRAMS.slice(1).map((prog, i) => (
            <div key={prog.title} className="prog-card group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
              {/* Image with cinematic wipe */}
              <div className="prog-card-img relative aspect-16/10">
                <Image
                  src={prog.image}
                  alt={prog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-[#001a0e]/80 via-[#001a0e]/30 to-transparent" />
                {/* Shimmer line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#00D084]/50 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7">
                <span className="prog-card-txt text-[10px] font-semibold uppercase tracking-[0.25em] mb-1.5" style={{ color: prog.color, fontFamily: 'var(--font-inter)' }}>
                  {prog.tag}
                </span>
                <h3 className="prog-card-txt text-white text-[clamp(1.1rem,2.2vw,1.4rem)] font-bold leading-[1.2] tracking-[-0.01em] mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {prog.title}
                </h3>
                <p className="prog-card-txt text-white/50 text-[12px] sm:text-[13px] leading-[1.65] line-clamp-2" style={{ fontFamily: 'var(--font-inter)' }}>
                  {prog.body}
                </p>
              </div>

              {/* Tag badge */}
              <span className="absolute top-4 right-4 text-white/60 text-[10px] font-mono tracking-wider bg-black/25 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                0{i + 2}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── IMPACT STRIP — dark premium row ─────────────── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #001a0e 0%, #002a18 50%, #001a0e 100%)' }}>
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-50 bg-[#00D084]/5 rounded-full blur-[100px] pointer-events-none" />

        <div ref={impactRef.ref} className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            {/* Left label */}
            <div className="shrink-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="h-px w-4 bg-[#00D084]/50" />
                <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] text-[#00D084]/60" style={{ fontFamily: 'var(--font-inter)' }}>
                  Our Impact
                </span>
              </div>
              <p className="text-white/80 text-[clamp(1.1rem,2vw,1.35rem)] font-bold leading-tight tracking-[-0.01em]" style={{ fontFamily: 'var(--font-poppins)' }}>
                Real Numbers,{' '}<span className="text-[#00D084]">Real Impact</span>
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-10">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="imp-item text-center sm:text-left">
                  <span className="text-white text-[clamp(1.1rem,2vw,1.45rem)] font-bold tracking-tight block" style={{ fontFamily: 'var(--font-poppins)' }}>
                    {h.num}
                  </span>
                  <span className="text-white/30 text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.15em] leading-tight block mt-0.5">
                    {h.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
