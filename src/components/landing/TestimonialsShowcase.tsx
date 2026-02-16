'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS DATA
   ───────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: 'NAAKIMS gave me a family away from home. The mentorship I received here shaped my entire career trajectory in surgery.',
    name: 'Dr. Aniekan Udosen',
    role: 'Consultant Surgeon, UUTH',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    chapter: 'University of Uyo Alumni',
  },
  {
    quote: 'From free health missions in rural communities to national conventions, NAAKIMS prepared me for real-world medicine beyond textbooks.',
    name: 'Dr. Iniobong Essien',
    role: 'Family Medicine Resident',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    chapter: 'University of Calabar Alumni',
  },
  {
    quote: 'The leadership skills and network I built through NAAKIMS Worldwide opened doors I never even knew existed. Truly transformative.',
    name: 'Dr. Emem Akpan',
    role: 'Public Health Specialist',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964ac31?auto=format&fit=crop&w=400&q=80',
    chapter: 'University of Lagos Alumni',
  },
  {
    quote: 'Being part of NAAKIMS international chapters taught me that our Akwa Ibom identity is a superpower in global medicine.',
    name: 'Dr. Uduak Obot',
    role: 'Pediatrician, London NHS',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    chapter: 'UK Chapter Alumni',
  },
];

/* ─────────────────────────────────────────────────────────────
   CHAPTER HIGHLIGHTS
   ───────────────────────────────────────────────────────────── */
const CHAPTERS = [
  { name: 'University of Uyo', members: '800+', flag: '🇳🇬' },
  { name: 'University of Calabar', members: '650+', flag: '🇳🇬' },
  { name: 'University of Lagos', members: '420+', flag: '🇳🇬' },
  { name: 'University of Ibadan', members: '380+', flag: '🇳🇬' },
  { name: 'OAU Ile-Ife', members: '350+', flag: '🇳🇬' },
  { name: 'UK Chapter', members: '120+', flag: '🇬🇧' },
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
   TestimonialsShowcase — Cinematic quote carousel + chapter grid
   ═════════════════════════════════════════════════════════════ */
export default function TestimonialsShowcase() {
  const headerRef   = useInView(0.3);
  const quoteRef    = useInView(0.15);
  const chapterRef  = useInView(0.15);

  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const quoteContainerRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const initialised = useRef(false);

  /* ── Navigate to testimonial ───────────────────────────── */
  const goTo = useCallback((nextIdx: number) => {
    if (isAnimating || nextIdx === activeIdx) return;
    setIsAnimating(true);

    const container = quoteContainerRef.current;
    if (!container) { setIsAnimating(false); return; }

    const curr = container.querySelector(`.t-card[data-idx="${activeIdx}"]`) as HTMLElement;
    const next = container.querySelector(`.t-card[data-idx="${nextIdx}"]`) as HTMLElement;
    if (!curr || !next) { setIsAnimating(false); return; }

    const tl = gsap.timeline({
      onComplete: () => { setActiveIdx(nextIdx); setIsAnimating(false); curr.style.visibility = 'hidden'; },
    });

    next.style.visibility = 'visible';
    next.style.zIndex = '3';
    curr.style.zIndex = '2';

    // Exit current — fade + slide + mask
    tl.to(curr, { opacity: 0, x: -60, clipPath: 'inset(0 100% 0 0)', duration: 0.6, ease: 'power3.inOut' });

    // Enter next — slide from right + unmask
    tl.fromTo(next,
      { opacity: 0, x: 60, clipPath: 'inset(0 0 0 100%)' },
      { opacity: 1, x: 0, clipPath: 'inset(0 0 0 0%)', duration: 0.8, ease: 'power3.out' },
      '-=0.25',
    );

    // Text stagger
    const txts = next.querySelectorAll('.t-txt');
    if (txts.length) {
      tl.fromTo(txts,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out' },
        '-=0.5',
      );
    }

    // Avatar pop
    const avatar = next.querySelector('.t-avatar');
    if (avatar) {
      tl.fromTo(avatar, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.4');
    }
  }, [activeIdx, isAnimating]);

  /* ── Auto-advance ──────────────────────────────────────── */
  useEffect(() => {
    if (!quoteRef.vis) return;
    autoRef.current = setInterval(() => {
      const next = (activeIdx + 1) % TESTIMONIALS.length;
      goTo(next);
    }, 5000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [activeIdx, quoteRef.vis, goTo]);

  /* ── GSAP — header entrance ────────────────────────────── */
  useEffect(() => {
    if (!headerRef.vis) return;
    const els = document.querySelectorAll('.test-hdr');
    if (!els.length) return;
    gsap.fromTo(els,
      { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0, stagger: 0.12, ease: 'power3.out' },
    );
  }, [headerRef.vis]);

  /* ── GSAP — initial first quote ────────────────────────── */
  useEffect(() => {
    if (!quoteRef.vis || initialised.current || !quoteContainerRef.current) return;
    initialised.current = true;
    const first = quoteContainerRef.current.querySelector('.t-card[data-idx="0"]');
    if (!first) return;

    const txts   = first.querySelectorAll('.t-txt');
    const avatar = first.querySelector('.t-avatar');

    gsap.fromTo(first,
      { opacity: 0, clipPath: 'inset(0 0 0 100%)' },
      { opacity: 1, clipPath: 'inset(0 0 0 0%)', duration: 1, ease: 'power4.inOut' },
    );
    if (txts.length) {
      gsap.fromTo(txts,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.4, stagger: 0.08, ease: 'power3.out' },
      );
    }
    if (avatar) {
      gsap.fromTo(avatar, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, delay: 0.6, ease: 'back.out(2)' });
    }
  }, [quoteRef.vis]);

  /* ── GSAP — chapter cards stagger ──────────────────────── */
  useEffect(() => {
    if (!chapterRef.vis) return;
    const items = document.querySelectorAll('.ch-card');
    if (!items.length) return;
    gsap.fromTo(items,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
    );
  }, [chapterRef.vis]);

  return (
    <section className="relative overflow-hidden bg-white">

      {/* ─── HEADER ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 lg:pt-32 pb-10 sm:pb-14">
        <div ref={headerRef.ref} className="text-center max-w-2xl mx-auto">
          <div className="test-hdr flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-6 bg-[#00D084]" />
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00D084]" style={{ fontFamily: 'var(--font-inter)' }}>
              Voices of NAAKIMS
            </span>
            <span className="h-px w-6 bg-[#00D084]" />
          </div>
          <h2 className="test-hdr text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.02em] text-gray-900 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            Stories That{' '}<span className="text-[#008751]">Inspire</span>
          </h2>
          <p className="test-hdr text-gray-500 text-[14px] sm:text-[15px] leading-[1.75] max-w-xl mx-auto" style={{ fontFamily: 'var(--font-inter)' }}>
            Hear from alumni and members whose lives were transformed by the NAAKIMS network.
          </p>
        </div>
      </div>

      {/* ─── TESTIMONIAL CAROUSEL ────────────────────────── */}
      <div ref={quoteRef.ref} className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20">
        <div className="relative">
          {/* Quote viewport */}
          <div
            ref={quoteContainerRef}
            className="relative min-h-65 sm:min-h-55 overflow-hidden"
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                data-idx={i}
                className="t-card absolute inset-0 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10"
                style={{
                  visibility: i === 0 ? 'visible' : 'hidden',
                  zIndex: i === 0 ? 2 : 1,
                }}
              >
                {/* Avatar */}
                <div className="t-avatar relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-lg border-2 border-[#00D084]/20">
                  <Image src={t.image} alt={t.name} fill className="object-cover" sizes="96px" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Giant quote mark */}
                  <svg className="t-txt w-8 h-8 sm:w-10 sm:h-10 text-[#00D084]/20 mb-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>

                  <p className="t-txt text-gray-700 text-[15px] sm:text-[17px] leading-[1.7] italic mb-5 max-w-2xl" style={{ fontFamily: 'var(--font-inter)' }}>
                    {t.quote}
                  </p>

                  <div className="t-txt flex items-center gap-3">
                    <div>
                      <p className="text-gray-900 text-[14px] sm:text-[15px] font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
                        {t.name}
                      </p>
                      <p className="text-gray-400 text-[11px] sm:text-[12px] font-medium">
                        {t.role} · <span className="text-[#00D084]">{t.chapter}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex items-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  'transition-all duration-500 rounded-full',
                  i === activeIdx ? 'w-8 h-2 bg-[#00D084]' : 'w-2 h-2 bg-gray-200 hover:bg-gray-300',
                )}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
            <span className="ml-auto text-gray-300 text-[10px] sm:text-[11px] font-mono tracking-wider">
              <span className="text-gray-700 font-semibold">0{activeIdx + 1}</span>{' '}/{' '}0{TESTIMONIALS.length}
            </span>
          </div>
        </div>
      </div>

      {/* ─── CHAPTER GRID — compact premium strip ────────── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8faf9 0%, #f0f3f1 100%)' }}>
        <div className="absolute -top-16 left-1/4 w-80 h-80 bg-[#00D084]/4 rounded-full blur-[100px] pointer-events-none" />

        <div ref={chapterRef.ref} className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-18">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="h-px w-6 bg-[#00D084]" />
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00D084]" style={{ fontFamily: 'var(--font-inter)' }}>
                  Our Chapters
                </span>
              </div>
              <h3 className="text-gray-900 text-[clamp(1.2rem,2.5vw,1.6rem)] font-bold tracking-[-0.01em]" style={{ fontFamily: 'var(--font-poppins)' }}>
                A Growing Network of <span className="text-[#008751]">Excellence</span>
              </h3>
            </div>
            <span className="text-gray-400 text-[12px] font-medium" style={{ fontFamily: 'var(--font-inter)' }}>
              20+ chapters across Nigeria & beyond
            </span>
          </div>

          {/* Chapter cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CHAPTERS.map((ch) => (
              <div
                key={ch.name}
                className="ch-card group relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-[#00D084]/30 hover:shadow-md transition-all duration-400 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[16px]">{ch.flag}</span>
                  <span className="text-[#00D084] text-[14px] sm:text-[15px] font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
                    {ch.members}
                  </span>
                </div>
                <p className="text-gray-700 text-[11px] sm:text-[12px] font-medium leading-tight group-hover:text-[#008751] transition-colors duration-300" style={{ fontFamily: 'var(--font-inter)' }}>
                  {ch.name}
                </p>
                {/* Accent line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D084] rounded-b-xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
