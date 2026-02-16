'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────────
   EXECUTIVES DATA
   ───────────────────────────────────────────────────────────── */
const PRESIDENT = {
  name: 'John Doe',
  role: 'National President',
  quote: '"Our mission is simple — to build a world-class network of medical professionals rooted in excellence, service, and the shared identity of Akwa Ibom."',
  image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
  chapter: 'University of Uyo',
};

const EXECUTIVES = [
  {
    name: 'Jane Ekanem',
    role: 'Vice President',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    chapter: 'University of Calabar',
  },
  {
    name: 'David Udoh',
    role: 'General Secretary',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    chapter: 'University of Lagos',
  },
  {
    name: 'Grace Bassey',
    role: 'Financial Secretary',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964ac31?auto=format&fit=crop&w=600&q=80',
    chapter: 'University of Ibadan',
  },
  {
    name: 'Emmanuel Akpan',
    role: 'Director of Socials',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    chapter: 'Obafemi Awolowo University',
  },
];

/* ─────────────────────────────────────────────────────────────
   useInView hook
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

/* ─────────────────────────────────────────────────────────────
   ExecutiveCard — individual exec with hover reveal
   ───────────────────────────────────────────────────────────── */
function ExecutiveCard({
  exec,
  index,
  visible,
}: {
  exec: typeof EXECUTIVES[number];
  index: number;
  visible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* entrance animation */
  useEffect(() => {
    if (!visible || !cardRef.current) return;
    const card = cardRef.current;
    const img = imageRef.current;
    const txts = card.querySelectorAll('.exec-txt');

    gsap.fromTo(card,
      { opacity: 0, y: 60, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 1, delay: 0.15 * index, ease: 'power3.out' },
    );

    if (img) {
      gsap.fromTo(img,
        { clipPath: 'inset(100% 0 0 0)', scale: 1.12 },
        { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.3, delay: 0.15 * index + 0.1, ease: 'power4.inOut' },
      );
    }

    if (txts.length) {
      gsap.fromTo(txts,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.15 * index + 0.5, stagger: 0.06, ease: 'power3.out' },
      );
    }
  }, [visible, index]);

  /* hover interactions */
  const handleEnter = useCallback(() => {
    if (!imageRef.current || !overlayRef.current) return;
    gsap.to(imageRef.current.querySelector('img'), {
      scale: 1.08,
      duration: 0.7,
      ease: 'power2.out',
    });
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, []);

  const handleLeave = useCallback(() => {
    if (!imageRef.current || !overlayRef.current) return;
    gsap.to(imageRef.current.querySelector('img'), {
      scale: 1,
      duration: 0.7,
      ease: 'power2.out',
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative opacity-0"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Image container */}
      <div
        ref={imageRef}
        className="relative overflow-hidden rounded-2xl aspect-3/4 shadow-lg"
      >
        <Image
          src={exec.image}
          alt={exec.name}
          fill
          className="object-cover transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 50vw, 25vw"
        />

        {/* Permanent bottom gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-[#001a0e]/80 via-[#001a0e]/20 to-transparent" />

        {/* Green accent shimmer line — bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#00D084]/60 to-transparent" />

        {/* Hover overlay — glass card rising from bottom */}
        <div
          ref={overlayRef}
          className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 opacity-0"
          style={{ background: 'linear-gradient(to top, rgba(0,26,14,0.92) 0%, rgba(0,26,14,0.6) 50%, transparent 100%)' }}
        >
          <span className="text-[#00D084] text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] mb-0.5" style={{ fontFamily: 'var(--font-inter)' }}>
            {exec.chapter}
          </span>
          <span className="text-white/50 text-[11px] sm:text-[12px] leading-relaxed mt-2" style={{ fontFamily: 'var(--font-inter)' }}>
            View profile →
          </span>
        </div>

        {/* Index badge */}
        <span className="absolute top-3 right-3 text-white/40 text-[10px] font-mono tracking-wider bg-black/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
          0{index + 1}
        </span>
      </div>

      {/* Text below card */}
      <div className="mt-4 px-1">
        <h4 className="exec-txt text-white text-[15px] sm:text-[16px] font-bold tracking-[-0.01em] leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
          {exec.name}
        </h4>
        <p className="exec-txt text-white/40 text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.12em] mt-1" style={{ fontFamily: 'var(--font-inter)' }}>
          {exec.role}
        </p>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════
   LeadershipShowcase Component
   ═════════════════════════════════════════════════════════════ */
export default function LeadershipShowcase() {
  const headerRef     = useInView(0.3);
  const presidentRef  = useInView(0.15);
  const gridRef       = useInView(0.1);
  const ctaRef        = useInView(0.3);

  /* ── GSAP — section header entrance ────────────────────── */
  useEffect(() => {
    if (!headerRef.vis) return;
    const els = document.querySelectorAll('.lead-hdr');
    if (!els.length) return;
    gsap.fromTo(els,
      { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0, stagger: 0.12, ease: 'power3.out' },
    );
  }, [headerRef.vis]);

  /* ── GSAP — president card cinematic entrance ──────────── */
  useEffect(() => {
    if (!presidentRef.vis) return;
    const card  = document.querySelector('.pres-card');
    const img   = document.querySelector('.pres-img');
    const txts  = document.querySelectorAll('.pres-txt');
    const quote = document.querySelector('.pres-quote');

    if (card) {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
      );
    }
    if (img) {
      gsap.fromTo(img,
        { clipPath: 'inset(0 100% 0 0)', scale: 1.1 },
        { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1.4, delay: 0.15, ease: 'power4.inOut' },
      );
    }
    if (txts.length) {
      gsap.fromTo(txts,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.5, stagger: 0.08, ease: 'power3.out' },
      );
    }
    if (quote) {
      gsap.fromTo(quote,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1.1, delay: 0.8, ease: 'power3.out' },
      );
    }
  }, [presidentRef.vis]);

  /* ── GSAP — CTA row entrance ───────────────────────────── */
  useEffect(() => {
    if (!ctaRef.vis) return;
    const els = document.querySelectorAll('.lead-cta');
    if (!els.length) return;
    gsap.fromTo(els,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
    );
  }, [ctaRef.vis]);

  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #001a0e 0%, #00120a 50%, #001a0e 100%)' }}>
      {/* ─── AMBIENT GLOW ─────────────────────────────────── */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-[#00D084]/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-[#008751]/4 rounded-full blur-[100px] pointer-events-none" />

      {/* ─── HEADER ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div ref={headerRef.ref} className="text-center max-w-2xl mx-auto">
          <div className="lead-hdr flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-6 bg-[#00D084]/50" />
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00D084]/70" style={{ fontFamily: 'var(--font-inter)' }}>
              Leadership
            </span>
            <span className="h-px w-6 bg-[#00D084]/50" />
          </div>
          <h2 className="lead-hdr text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.02em] text-white mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            The Visionaries{' '}<span className="text-[#00D084]">Behind</span> NAAKIMS
          </h2>
          <p className="lead-hdr text-white/40 text-[14px] sm:text-[15px] leading-[1.75] max-w-xl mx-auto" style={{ fontFamily: 'var(--font-inter)' }}>
            Elected by members, driven by purpose — meet the executives leading NAAKIMS into its next chapter of impact and excellence.
          </p>
        </div>
      </div>

      {/* ─── PRESIDENT — cinematic hero card ──────────────── */}
      <div ref={presidentRef.ref} className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20">
        <div className="pres-card relative rounded-2xl overflow-hidden shadow-2xl opacity-0">
          <div className="grid lg:grid-cols-2">
            {/* Left — image with cinematic wipe */}
            <div className="pres-img relative aspect-4/5 lg:aspect-auto lg:min-h-120 overflow-hidden">
              <Image
                src={PRESIDENT.image}
                alt={PRESIDENT.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Subtle green tint overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,80,42,0.25) 0%, rgba(0,26,14,0.15) 100%)' }} />
              {/* Bottom fade for mobile */}
              <div className="absolute inset-0 bg-linear-to-t from-[#001a0e] via-transparent to-transparent lg:hidden" />
              {/* Right fade for desktop */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#001a0e] hidden lg:block" />
            </div>

            {/* Right — info panel */}
            <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-14 -mt-16 lg:mt-0" style={{ background: 'linear-gradient(135deg, #001a0e 0%, #002a18 100%)' }}>
              {/* Decorative corner accent */}
              <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-[#00D084]/20 rounded-tr-lg" />

              <span className="pres-txt text-[#00D084] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>
                National President
              </span>
              <h3 className="pres-txt text-white text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                {PRESIDENT.name}
              </h3>
              <span className="pres-txt text-white/30 text-[12px] sm:text-[13px] font-medium tracking-wide mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                {PRESIDENT.chapter}
              </span>

              {/* Quote block with left accent */}
              <div className="pres-quote relative pl-5 border-l-2 border-[#00D084]/40 opacity-0">
                <p className="text-white/60 text-[14px] sm:text-[15px] leading-[1.8] italic" style={{ fontFamily: 'var(--font-inter)' }}>
                  {PRESIDENT.quote}
                </p>
              </div>

              {/* Green shimmer line */}
              <div className="mt-8 h-px w-full bg-linear-to-r from-[#00D084]/40 via-[#00D084]/10 to-transparent" />

              <div className="pres-txt mt-6">
                <Link
                  href="/executives"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#00D084]/10 border border-[#00D084]/20 text-[#00D084] text-[12px] sm:text-[13px] font-semibold tracking-wide hover:bg-[#00D084]/20 active:scale-[0.98] transition-all duration-300"
                >
                  Meet Full Executive Team
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative bottom green accent */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#00D084] via-[#008751] to-transparent" />
        </div>
      </div>

      {/* ─── EXECUTIVE GRID — 4 cards ────────────────────── */}
      <div ref={gridRef.ref} className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {EXECUTIVES.map((exec, i) => (
            <ExecutiveCard
              key={exec.name}
              exec={exec}
              index={i}
              visible={gridRef.vis}
            />
          ))}
        </div>
      </div>

      {/* ─── VIEW ALL CTA — elegant bottom row ───────────── */}
      <div ref={ctaRef.ref} className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-20 sm:pb-28 lg:pb-32">
        <div className="lead-cta flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-t border-white/6">
          <div>
            <p className="lead-cta text-white/70 text-[14px] sm:text-[15px] font-medium" style={{ fontFamily: 'var(--font-poppins)' }}>
              Our executives are elected annually by members across all chapters.
            </p>
            <p className="lead-cta text-white/30 text-[12px] sm:text-[13px] mt-1" style={{ fontFamily: 'var(--font-inter)' }}>
              10+ chapters · 25+ universities worldwide
            </p>
          </div>
          <Link
            href="/executives"
            className="lead-cta group shrink-0 inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#00D084]/30 text-[#00D084] text-[13px] font-semibold tracking-wide hover:bg-[#00D084]/10 active:scale-[0.97] transition-all duration-300"
          >
            <span>View All Leaders</span>
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#00D084]/15 group-hover:bg-[#00D084]/25 transition-colors duration-300">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
