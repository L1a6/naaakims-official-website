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
   BLOG POSTS DATA
   ───────────────────────────────────────────────────────────── */
const POSTS = [
  {
    title: 'NAAKIMS Convention 2025: A Record-Breaking Gathering of Future Leaders',
    excerpt: 'Over 3,500 medical and dental students converged in Uyo for three days of keynote lectures, workshops, and cultural exchange that redefined what a student convention can be.',
    category: 'Event Recap',
    categoryColor: '#F59E0B',
    author: 'NAAKIMS Media',
    date: 'Feb 12, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
    featured: true,
  },
  {
    title: 'How Mentorship Changed My Medical Career: A NAAKIMS Story',
    excerpt: 'From a confused 200-level student to a confident surgical resident — one alumna\'s journey through the NAAKIMS mentorship programme.',
    category: 'Member Spotlight',
    categoryColor: '#00D084',
    author: 'Dr. Iniobong Essien',
    date: 'Feb 5, 2026',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'NAAKIMS Launches Free Health Screening in 10 LGAs',
    excerpt: 'In partnership with Akwa Ibom State Ministry of Health, our members conducted screenings for over 4,000 community members.',
    category: 'Health Advocacy',
    categoryColor: '#10B981',
    author: 'NAAKIMS Health Desk',
    date: 'Jan 28, 2026',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'New NAAKIMS UK Chapter: Expanding Our Global Footprint',
    excerpt: 'Akwa Ibom students studying medicine across the UK officially launch a new NAAKIMS chapter, bringing our global total to 10 active chapters.',
    category: 'Chapter Updates',
    categoryColor: '#008751',
    author: 'NAAKIMS International',
    date: 'Jan 15, 2026',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
  },
];

/* ═════════════════════════════════════════════════════════════
   LatestNews — Premium Dark Editorial Magazine
   Cinematic hero article + elegant card grid with GSAP
   ═════════════════════════════════════════════════════════════ */
export default function LatestNews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const heroRef    = useRef<HTMLAnchorElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {

      /* Header: staggered clip-path wipe */
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('.bn-rev'),
          { clipPath: 'inset(0 0 100% 0)', y: 30, opacity: 0 },
          {
            clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1,
            duration: 1, stagger: 0.12, ease: 'power4.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          },
        );
      }

      /* Hero article: cinematic scale + wipe entrance */
      if (heroRef.current) {
        gsap.fromTo(heroRef.current,
          { clipPath: 'inset(8% 4% 8% 4% round 16px)', scale: 0.94, opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0% round 16px)', scale: 1, opacity: 1,
            duration: 1.4, ease: 'power3.out',
            scrollTrigger: { trigger: heroRef.current, start: 'top 82%', toggleActions: 'play none none none' },
          },
        );

        // Ken Burns on hero image
        const img = heroRef.current.querySelector('.hero-img');
        if (img) {
          gsap.fromTo(img,
            { scale: 1.15 },
            {
              scale: 1, duration: 2, ease: 'power2.out',
              scrollTrigger: { trigger: heroRef.current, start: 'top 82%', toggleActions: 'play none none none' },
            },
          );
        }

        // Text reveal inside hero
        const txts = heroRef.current.querySelectorAll('.hero-txt');
        gsap.fromTo(txts,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0,
            duration: 0.9, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: heroRef.current, start: 'top 70%', toggleActions: 'play none none none' },
          },
        );
      }

      /* Grid cards: staggered 3D entrance */
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.bn-card');
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, y: 50, rotateX: 4, scale: 0.95 },
            {
              opacity: 1, y: 0, rotateX: 0, scale: 1,
              duration: 1, delay: i * 0.12, ease: 'power3.out',
              scrollTrigger: { trigger: gridRef.current, start: 'top 82%', toggleActions: 'play none none none' },
            },
          );

          // Image parallax inside each card
          const img = card.querySelector('.bn-img') as HTMLElement | null;
          if (img) {
            gsap.to(img, {
              yPercent: -8,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            });
          }
        });
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const featured = POSTS[0]!;
  const articles = POSTS.slice(1);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #001a0e 0%, #00120a 50%, #001a0e 100%)' }}
    >
      {/* Ambient glows */}
      <div className="absolute top-0 right-[15%] w-100 h-100 bg-[#00D084]/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-0 w-80 h-80 bg-[#008751]/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Film grain texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,208,132,0.2), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-36">

        {/* ══════════ HEADER ══════════ */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="bn-rev flex items-center gap-3 mb-5">
              <span className="h-0.75 w-9 rounded-full bg-[#00D084]" />
              <span
                className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-[#00D084]/70"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Blog &amp; News
              </span>
            </div>
            <h2
              className="bn-rev text-[clamp(1.8rem,4.2vw,3rem)] font-extrabold leading-[1.07] tracking-[-0.03em] text-white mb-3"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Stories, Updates &amp;{' '}
              <span className="text-[#00D084]">Insights</span>
            </h2>
            <p
              className="bn-rev text-white/25 text-[14px] sm:text-[15px] leading-[1.8] max-w-md"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Stay connected with the latest from the NAAKIMS community worldwide.
            </p>
          </div>

          <Link
            href="/blog"
            className="bn-rev group shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-[#008751] text-white text-[12px] sm:text-[13px] font-bold tracking-wide hover:bg-[#006d41] active:scale-[0.97] transition-all duration-300 shadow-lg shadow-[#008751]/25"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            View All Posts
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* ══════════ FEATURED HERO ARTICLE ══════════ */}
        <Link
          ref={heroRef}
          href="/blog"
          className="group relative block rounded-2xl overflow-hidden mb-6 sm:mb-8 opacity-0"
          style={{ boxShadow: '0 8px 48px rgba(0,0,0,0.3)' }}
        >
          {/* Full-bleed image */}
          <div className="relative overflow-hidden" style={{ height: 'clamp(280px, 48vh, 480px)' }}>
            <div className="hero-img absolute inset-0">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-out"
                sizes="100vw"
                priority
              />
            </div>

            {/* Cinematic gradient stack */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,12,8,0.95) 0%, rgba(0,12,8,0.5) 40%, rgba(0,12,8,0.1) 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,12,8,0.6) 0%, transparent 60%)' }} />
            {/* Green hover shimmer */}
            <div className="absolute inset-0 bg-[#008751]/0 group-hover:bg-[#008751]/8 transition-all duration-700" />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-12">
            {/* Category badge */}
            <div className="hero-txt mb-4">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm"
                style={{
                  color: featured.categoryColor,
                  background: `${featured.categoryColor}15`,
                  border: `1px solid ${featured.categoryColor}25`,
                  fontFamily: 'var(--font-inter)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: featured.categoryColor }} />
                {featured.category}
              </span>
            </div>

            <h3
              className="hero-txt text-white text-[clamp(1.3rem,3vw,2.2rem)] font-extrabold leading-[1.12] tracking-[-0.025em] mb-3 sm:mb-4 max-w-3xl group-hover:text-[#00D084] transition-colors duration-500"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              {featured.title}
            </h3>

            <p
              className="hero-txt text-white/40 text-[13px] sm:text-[15px] leading-[1.7] mb-5 max-w-2xl line-clamp-2"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {featured.excerpt}
            </p>

            {/* Meta row */}
            <div className="hero-txt flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3 text-[11px] sm:text-[12px] text-white/30" style={{ fontFamily: 'var(--font-inter)' }}>
                <span className="font-semibold text-white/55">{featured.author}</span>
                <span className="w-0.5 h-0.5 bg-white/20 rounded-full" />
                <span>{featured.date}</span>
                <span className="w-0.5 h-0.5 bg-white/20 rounded-full" />
                <span>{featured.readTime}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#00D084] group-hover:gap-2.5 transition-all duration-300" style={{ fontFamily: 'var(--font-inter)' }}>
                Read Article
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D084] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
          </div>

          {/* Featured badge */}
          <div className="absolute top-5 right-5 sm:top-6 sm:right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 backdrop-blur-md border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70" style={{ fontFamily: 'var(--font-inter)' }}>Featured</span>
          </div>
        </Link>

        {/* ══════════ ARTICLE GRID ══════════ */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {articles.map((post) => (
            <Link
              key={post.title}
              href="/blog"
              className="bn-card group relative rounded-xl overflow-hidden block opacity-0"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '180px' }}>
                <div className="bn-img absolute inset-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {/* Gradient */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,12,8,0.7) 0%, transparent 50%)' }} />
                {/* Green accent hover */}
                <div className="absolute inset-0 bg-[#008751]/0 group-hover:bg-[#008751]/12 transition-all duration-500" />

                {/* Category badge (floating) */}
                <div className="absolute top-3 left-3">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.18em] backdrop-blur-sm"
                    style={{
                      color: post.categoryColor,
                      background: `${post.categoryColor}18`,
                      border: `1px solid ${post.categoryColor}20`,
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    <span className="w-1 h-1 rounded-full" style={{ background: post.categoryColor }} />
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h4
                  className="text-white text-[15px] sm:text-[16px] font-bold leading-snug tracking-[-0.01em] mb-3 line-clamp-2 group-hover:text-[#00D084] transition-colors duration-400"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {post.title}
                </h4>

                <p
                  className="text-white/30 text-[12px] sm:text-[13px] leading-[1.7] mb-4 line-clamp-2"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {post.excerpt}
                </p>

                {/* Meta + arrow */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-white/25" style={{ fontFamily: 'var(--font-inter)' }}>
                    <span className="font-semibold text-white/40">{post.author}</span>
                    <span className="w-0.5 h-0.5 bg-white/15 rounded-full" />
                    <span>{post.date}</span>
                  </div>
                  <svg
                    width="14" height="14" viewBox="0 0 16 16" fill="none"
                    className="text-white/15 group-hover:text-[#00D084] group-hover:translate-x-0.5 transition-all duration-300 shrink-0"
                  >
                    <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D084] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,208,132,0.15), transparent)' }} />
    </section>
  );
}
