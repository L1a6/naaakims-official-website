'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────────────────────
   BENEFITS DATA
   ───────────────────────────────────────────────────────────── */
const BENEFITS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
    title: 'Academic Mentorship',
    description: 'Connect with senior colleagues and practicing physicians who guide you from the classroom to the clinic.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: 'Global Network',
    description: 'Join a family of Akwa Ibom medical students spanning universities across Nigeria and the world.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
      </svg>
    ),
    title: 'Events & Conventions',
    description: 'From chapter meetups to the national convention, experience events that inspire, educate, and unite.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    title: 'Community Service',
    description: 'Make a tangible impact through health outreach, screenings, and advocacy in communities that need it most.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    title: 'Brotherhood & Identity',
    description: 'Celebrate your Akwa Ibom heritage while forging lifelong bonds with fellow medical students everywhere.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: 'Career Growth',
    description: 'Access scholarships, research opportunities, clinical rotations, and career development resources.',
  },
];

/* ═════════════════════════════════════════════════════════════
   WhyJoinSection — Premium Benefits Grid
   ═════════════════════════════════════════════════════════════ */
export default function WhyJoinSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {

      /* Header reveals */
      if (headerRef.current) {
        const els = headerRef.current.querySelectorAll('.wj-rev');
        gsap.fromTo(els, {
          opacity: 0, y: 45, clipPath: 'inset(0 0 100% 0)',
        }, {
          opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 78%', toggleActions: 'play none none none' },
        });
      }

      /* Cards staggered entrance */
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.wj-card');
        cards.forEach((card, i) => {
          gsap.fromTo(card, {
            opacity: 0, y: 50, scale: 0.95,
          }, {
            opacity: 1, y: 0, scale: 1,
            duration: 0.9, delay: i * 0.07, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
          });
        });
      }

      /* CTA row entrance */
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, {
          opacity: 0, y: 30,
        }, {
          opacity: 1, y: 0,
          duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        });
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">

      {/* Ambient bg decoration */}
      <div className="absolute -top-32 left-0 w-96 h-96 bg-[#00D084]/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#008751]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-32">

        {/* ══════════ HEADER ══════════ */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="wj-rev flex items-center justify-center gap-3 mb-4">
            <span className="h-0.75 w-9 rounded-full bg-[#00D084]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[#00D084]" style={{ fontFamily: 'var(--font-inter)' }}>Why NAAKIMS</span>
            <span className="h-0.75 w-9 rounded-full bg-[#00D084]" />
          </div>
          <h2 className="wj-rev text-[clamp(1.6rem,3.8vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-gray-900 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            More Than an Association.{' '}<span className="text-[#008751]">A Family</span>
          </h2>
          <p className="wj-rev text-gray-500 text-[14px] sm:text-[15px] leading-[1.8]" style={{ fontFamily: 'var(--font-inter)' }}>
            Being a part of NAAKIMS means gaining access to a network, resources, and experiences that shape your medical career and personal growth.
          </p>
        </div>

        {/* ══════════ BENEFITS GRID ══════════ */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className="wj-card group relative p-6 sm:p-7 rounded-2xl bg-white border border-gray-100 hover:border-[#00D084]/25 shadow-sm hover:shadow-lg transition-all duration-400 cursor-default"
            >
              {/* Top accent on hover */}
              <div className="absolute top-0 left-6 right-6 h-px bg-[#00D084]/0 group-hover:bg-[#00D084]/40 transition-all duration-500" />

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-[#00D084]/8 group-hover:bg-[#00D084]/15 flex items-center justify-center text-[#008751] mb-5 transition-colors duration-300">
                {b.icon}
              </div>

              {/* Title */}
              <h3
                className="text-gray-900 text-[15px] sm:text-[16px] font-bold tracking-[-0.01em] mb-2 group-hover:text-[#008751] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {b.title}
              </h3>

              {/* Description */}
              <p
                className="text-gray-500 text-[13px] sm:text-[14px] leading-[1.7]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {b.description}
              </p>
            </div>
          ))}
        </div>

        {/* ══════════ CTA ══════════ */}
        <div ref={ctaRef} className="text-center mt-14 sm:mt-18">
          <Link
            href="/join"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-[#008751] text-white text-[13px] sm:text-[14px] font-bold tracking-wide hover:bg-[#006d41] active:scale-[0.97] transition-all duration-300"
          >
            Become a Member
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-0.5 transition-transform"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
