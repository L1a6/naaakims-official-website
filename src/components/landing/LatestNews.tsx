'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
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
    title: 'NAAKIMS Worldwide Dinner Night: An Unforgettable Evening Awaits',
    excerpt: 'Get ready for the grandest gathering in NAAKIMS history — an elegant dinner night uniting members, alumni, executives, and distinguished guests from across the globe for an evening of celebration, networking, and excellence.',
    category: 'Upcoming Event',
    categoryColor: '#F59E0B',
    author: 'NAAKIMS Media',
    date: 'Coming Soon',
    readTime: '4 min read',
    image: '/images/dinnernight.jpg',
    featured: true,
  },
  {
    title: 'NAAKIMS UniUyo Chapter Welcomes New Administration',
    excerpt: 'The University of Uyo chapter of NAAKIMS officially inaugurates its new executive council, ushering in a fresh era of leadership, vision, and commitment to student welfare.',
    category: 'Chapter Updates',
    categoryColor: '#008751',
    author: 'NAAKIMS Media',
    date: 'Feb 16, 2026',
    readTime: '3 min',
    image: '/images/newadministration.jpg',
  },
  {
    title: 'NAAKIMS Presents Voluntary Blood Donation at St. Luke\u2019s Hospital, Anua',
    excerpt: 'Every blood donor is a lifesaver. NAAKIMS members turned up in remarkable numbers at St. Luke\u2019s Hospital, Anua, donating blood to save lives and embodying the spirit of selfless service that defines our association.',
    category: 'Health Advocacy',
    categoryColor: '#10B981',
    author: 'NAAKIMS WW Committee on Health & Welfare',
    date: 'Feb 19, 2026',
    readTime: '3 min',
    image: '/images/bloodonation.jpg',
  },
  {
    title: 'NAAKIMS UCC Chapter Swearing-In Ceremony Marks New Beginning',
    excerpt: 'The University of Cape Coast chapter held a solemn and inspiring swearing-in ceremony on February 12th, officially commissioning its new executive team to lead with integrity, purpose, and excellence.',
    category: 'Chapter Updates',
    categoryColor: '#008751',
    author: 'NAAKIMS International',
    date: 'Feb 12, 2026',
    readTime: '3 min',
    image: '/images/swearingin.jpg',
  },
];

/* ═════════════════════════════════════════════════════════════
   LatestNews — Premium Dark Editorial Magazine
   Cinematic hero article + elegant card grid with GSAP
   ═════════════════════════════════════════════════════════════ */
export default function LatestNews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const heroRef    = useRef<HTMLDivElement>(null);
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

          <span
            className="bn-rev group shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#008751] text-white text-[12px] sm:text-[13px] font-bold tracking-wide transition-all duration-300 shadow-lg shadow-[#008751]/25"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            View All Posts
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* ══════════ FEATURED HERO ARTICLE ══════════ */}
        <div
          ref={heroRef}
          className="group relative block rounded-2xl overflow-hidden mb-6 sm:mb-8 opacity-0 cursor-default"
          style={{ boxShadow: '0 8px 48px rgba(0,0,0,0.3)' }}
        >
          {/* Full-bleed image */}
          <div className="relative overflow-hidden" style={{ height: 'clamp(280px, 48vh, 480px)' }}>
            <div className="hero-img absolute inset-0">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                quality={100}
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

            <h3
              className="hero-txt text-white text-[clamp(1.3rem,3vw,2.2rem)] font-extrabold leading-[1.12] tracking-[-0.025em] mb-3 sm:mb-4 max-w-3xl group-hover:text-[#00D084] transition-colors duration-500"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              {featured.title}
            </h3>

            <p
              className="hero-txt text-white/50 text-[14px] sm:text-[16px] leading-[1.75] mb-6 max-w-2xl line-clamp-2"
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
        </div>

        {/* ══════════ ARTICLE GRID ══════════ */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {articles.map((post) => (
            <div
              key={post.title}
              className="bn-card group relative rounded-2xl overflow-hidden block opacity-0 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '200px' }}>
                <div className="bn-img absolute inset-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    quality={100}
                    className="object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {/* Gradient */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,12,8,0.7) 0%, transparent 50%)' }} />
                {/* Green accent hover */}
                <div className="absolute inset-0 bg-[#008751]/0 group-hover:bg-[#008751]/12 transition-all duration-500" />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h4
                  className="text-white text-[16px] sm:text-[17px] font-bold leading-[1.35] tracking-[-0.01em] mb-3 line-clamp-2 group-hover:text-[#00D084] transition-colors duration-400"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {post.title}
                </h4>

                <p
                  className="text-white/35 text-[13px] sm:text-[14px] leading-[1.75] mb-5 line-clamp-2"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {post.excerpt}
                </p>

                {/* Meta + arrow */}
                <div className="flex items-center justify-between pt-4 border-t border-white/6">
                  <div className="flex items-center gap-2 text-[11px] text-white/25" style={{ fontFamily: 'var(--font-inter)' }}>
                    <span className="font-semibold text-white/45">{post.author}</span>
                    <span className="w-0.5 h-0.5 bg-white/15 rounded-full" />
                    <span>{post.date}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#00D084]/60 group-hover:text-[#00D084] group-hover:gap-2 transition-all duration-300" style={{ fontFamily: 'var(--font-inter)' }}>
                    Read
                    <svg
                      width="12" height="12" viewBox="0 0 16 16" fill="none"
                      className="group-hover:translate-x-0.5 transition-all duration-300 shrink-0"
                    >
                      <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D084] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,208,132,0.15), transparent)' }} />
    </section>
  );
}
