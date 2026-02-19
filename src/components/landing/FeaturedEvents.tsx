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
   EVENTS DATA — upcoming/recent events
   ───────────────────────────────────────────────────────────── */
const EVENTS = [
  {
    title: 'National Medical Convention 2026',
    date: 'Mar 15–17, 2026',
    month: 'MAR',
    day: '15',
    location: 'Uyo, Akwa Ibom State',
    type: 'Convention',
    description: 'Our flagship annual gathering bringing together 3,000+ medical and dental students for three days of keynote lectures, clinical workshops, and cultural celebrations.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    featured: true,
    status: 'upcoming' as const,
  },
  {
    title: 'Health Outreach: Rural Communities Initiative',
    date: 'Apr 5, 2026',
    month: 'APR',
    day: '05',
    location: 'Eket & Ikot Ekpene LGAs',
    type: 'Outreach',
    description: 'Free medical screenings, health education, and community engagement serving 2,000+ residents in underserved areas.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
    featured: false,
    status: 'upcoming' as const,
  },
  {
    title: 'Leadership & Mentorship Summit',
    date: 'May 10, 2026',
    month: 'MAY',
    day: '10',
    location: 'Virtual (Zoom)',
    type: 'Workshop',
    description: 'Connecting students with senior physicians, surgeons, and specialists for structured mentorship sessions and career guidance.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    featured: false,
    status: 'upcoming' as const,
  },
  {
    title: 'Inter-Chapter Sports & Cultural Festival',
    date: 'Jun 20–22, 2026',
    month: 'JUN',
    day: '20',
    location: 'Lagos, Nigeria',
    type: 'Social',
    description: 'A weekend of sportsmanship, cultural performances, and inter-chapter bonding that strengthens the NAAKIMS family.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    featured: false,
    status: 'upcoming' as const,
  },
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
   FeaturedEvents — Premium event cards with GSAP animations
   ═════════════════════════════════════════════════════════════ */
export default function FeaturedEvents() {
  const headerRef = useInView(0.3);
  const gridRef   = useInView(0.1);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  /* ── GSAP — header reveal ───────────────────────────────── */
  useEffect(() => {
    if (!headerRef.vis) return;
    const els = document.querySelectorAll('.ev-hdr');
    if (!els.length) return;
    gsap.fromTo(els,
      { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
      {
        opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
        duration: 1.0, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.ref.current, start: 'top 80%', toggleActions: 'play none none none' },
      },
    );
  }, [headerRef.vis, headerRef.ref]);

  /* ── GSAP — card reveals ────────────────────────────────── */
  useEffect(() => {
    if (!gridRef.vis) return;
    const cards = document.querySelectorAll('.ev-card');
    if (!cards.length) return;
    gsap.fromTo(cards,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.ref.current, start: 'top 82%', toggleActions: 'play none none none' },
      },
    );
  }, [gridRef.vis, gridRef.ref]);

  const featured = EVENTS[0];
  const remaining = EVENTS.slice(1);

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-100" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 lg:py-28">
        {/* ─── HEADER ──────────────────────────────────────── */}
        <div ref={headerRef.ref} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div className="max-w-xl">
            <div className="ev-hdr flex items-center gap-3 mb-3">
              <span className="h-px w-6 bg-[#00D084]" />
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00D084]" style={{ fontFamily: 'var(--font-inter)' }}>
                Upcoming Events
              </span>
            </div>
            <h2 className="ev-hdr text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.02em] text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
              Where <span className="text-[#008751]">Excellence</span> Meets Community
            </h2>
            <p className="ev-hdr text-gray-500 text-[14px] sm:text-[15px] leading-[1.75]" style={{ fontFamily: 'var(--font-inter)' }}>
              From national conventions to local health missions. Every NAAKIMS event is designed to inspire, connect, and transform.
            </p>
          </div>
          <Link
            href="/events"
            className="ev-hdr group shrink-0 inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-600 text-[13px] font-semibold tracking-wide hover:border-[#00D084] hover:text-[#00D084] hover:bg-[#00D084]/5 active:scale-[0.97] transition-all duration-300"
          >
            View All Events
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* ─── EVENTS GRID ─────────────────────────────────── */}
        <div ref={gridRef.ref} className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {/* FEATURED EVENT — large hero card */}
          <div
            className="ev-card group relative rounded-2xl overflow-hidden lg:row-span-3 cursor-pointer"
            onMouseEnter={() => setHoveredIdx(0)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="relative aspect-4/3 lg:aspect-auto lg:h-full min-h-72 lg:min-h-0 overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className={cn(
                  'object-cover transition-transform duration-700 ease-out',
                  hoveredIdx === 0 ? 'scale-105' : 'scale-100',
                )}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: hoveredIdx === 0
                    ? 'linear-gradient(to top, rgba(0,26,14,0.92) 0%, rgba(0,26,14,0.5) 50%, rgba(0,26,14,0.15) 100%)'
                    : 'linear-gradient(to top, rgba(0,26,14,0.85) 0%, rgba(0,26,14,0.35) 50%, rgba(0,26,14,0.08) 100%)',
                }}
              />

              {/* Date badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                <span className="block text-[#00D084] text-[10px] font-bold uppercase tracking-wider text-center" style={{ fontFamily: 'var(--font-inter)' }}>{featured.month}</span>
                <span className="block text-gray-900 text-[20px] font-extrabold leading-none text-center" style={{ fontFamily: 'var(--font-poppins)' }}>{featured.day}</span>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#00D084]/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Upcoming
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <span className="inline-block px-2.5 py-1 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-white/80 text-[10px] font-semibold uppercase tracking-wider mb-3">
                  {featured.type}
                </span>
                <h3 className="text-white text-[clamp(1.2rem,3vw,1.7rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-2 group-hover:text-[#00D084] transition-colors duration-300" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {featured.title}
                </h3>
                <p className="text-white/55 text-[12px] sm:text-[13px] leading-[1.7] mb-3 max-w-md" style={{ fontFamily: 'var(--font-inter)' }}>
                  {featured.description}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-white/40">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    {featured.location}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#00D084] via-[#008751] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* REMAINING EVENTS — compact */}
          {remaining.map((event, i) => (
            <EventCard key={event.title} event={event} index={i + 1} isHovered={hoveredIdx === i + 1} onHover={() => setHoveredIdx(i + 1)} onLeave={() => setHoveredIdx(null)} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   EventCard — compact event card
   ───────────────────────────────────────────────────────────── */
function EventCard({ event, isHovered, onHover, onLeave }: {
  event: typeof EVENTS[number]; index: number; isHovered: boolean; onHover: () => void; onLeave: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const img = cardRef.current.querySelector('.ev-img');
    if (img) gsap.to(img, { scale: isHovered ? 1.06 : 1, duration: 0.6, ease: 'power2.out' });
  }, [isHovered]);

  return (
    <div ref={cardRef} className="ev-card group relative flex flex-col sm:flex-row rounded-xl overflow-hidden border border-gray-100 hover:border-[#00D084]/25 hover:shadow-lg transition-all duration-400 cursor-pointer bg-white" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <div className="relative sm:w-44 lg:w-48 shrink-0 aspect-video sm:aspect-auto overflow-hidden">
        <Image src={event.image} alt={event.title} fill className="ev-img object-cover" sizes="(max-width: 640px) 100vw, 200px" />
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/10 sm:bg-linear-to-b" />
        <div className="absolute top-3 left-3 sm:top-auto sm:bottom-3 sm:left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-md">
          <span className="block text-[#00D084] text-[9px] font-bold uppercase tracking-wider text-center" style={{ fontFamily: 'var(--font-inter)' }}>{event.month}</span>
          <span className="block text-gray-900 text-[16px] font-extrabold leading-none text-center" style={{ fontFamily: 'var(--font-poppins)' }}>{event.day}</span>
        </div>
      </div>
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center px-2 py-0.5 bg-[#00D084]/8 text-[#008751] text-[9px] font-bold uppercase tracking-wider rounded-full">{event.type}</span>
          <span className="flex items-center gap-1 text-[#00D084] text-[9px] font-semibold uppercase tracking-wider">
            <span className="w-1 h-1 bg-[#00D084] rounded-full animate-pulse" />Upcoming
          </span>
        </div>
        <h3 className="text-gray-900 text-[14px] sm:text-[15px] font-bold leading-tight tracking-[-0.01em] mb-1.5 group-hover:text-[#008751] transition-colors duration-300" style={{ fontFamily: 'var(--font-poppins)' }}>{event.title}</h3>
        <p className="text-gray-500 text-[12px] leading-[1.65] line-clamp-2 mb-3" style={{ fontFamily: 'var(--font-inter)' }}>{event.description}</p>
        <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-gray-400 mt-auto">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
            {event.date}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
            {event.location}
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#00D084] to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
    </div>
  );
}
