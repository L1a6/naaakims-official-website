'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NAV_LINKS, SOCIAL_MEDIA, CONTACT_INFO, BRAND } from '@/lib/constants';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/* ── footer link groups ─────────────────────────────────── */
const FOOTER_GROUPS = [
  {
    heading: 'About',
    links: NAV_LINKS.filter(l => ['About', 'Executives', 'Achievements'].includes(l.label)),
  },
  {
    heading: 'Explore',
    links: NAV_LINKS.filter(l => ['Chapters', 'Events', 'Gallery'].includes(l.label)),
  },
  {
    heading: 'Resources',
    links: NAV_LINKS.filter(l => ['Blog', 'Sponsors', 'Contact'].includes(l.label)),
  },
];

/* ── social icons (SVG path data) ────────────────────────── */
const SOCIALS = [
  { label: 'Facebook',  href: SOCIAL_MEDIA.FACEBOOK,  icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label: 'Twitter',   href: SOCIAL_MEDIA.TWITTER,   icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { label: 'Instagram', href: SOCIAL_MEDIA.INSTAGRAM, icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { label: 'LinkedIn',  href: SOCIAL_MEDIA.LINKEDIN,  icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { label: 'WhatsApp',  href: SOCIAL_MEDIA.WHATSAPP,  icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
  { label: 'YouTube',   href: SOCIAL_MEDIA.YOUTUBE,   icon: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
];

/* ── quick stat badges for the CTA ───────────────────────── */
const CTA_STATS = [
  { value: '5,000+',  label: 'Members' },
  { value: '20+',     label: 'Chapters' },
  { value: '15+',     label: 'Years' },
];

/* ═════════════════════════════════════════════════════════════
   JoinCtaFooter — Cinematic full-bleed CTA + premium footer
   ═════════════════════════════════════════════════════════════ */
export default function JoinCtaFooter() {
  const sectionRef  = useRef<HTMLElement>(null);
  const ctaInner    = useRef<HTMLDivElement>(null);
  const footerRef   = useRef<HTMLElement>(null);

  /* ── CTA Animations ──────────────────────────────────── */
  useEffect(() => {
    const s = sectionRef.current;
    const inner = ctaInner.current;
    if (!s || !inner) return;

    const ctx = gsap.context(() => {
      /* image parallax on scroll */
      const img = s.querySelector('.cta-bg-img') as HTMLElement | null;
      if (img) {
        gsap.fromTo(img, { yPercent: -8 }, {
          yPercent: 8, ease: 'none',
          scrollTrigger: { trigger: s, start: 'top bottom', end: 'bottom top', scrub: 0.4 },
        });
      }

      /* clip-path reveal — rounded rect wipe-in from center */
      gsap.fromTo(s.querySelector('.cta-clip'),
        { clipPath: 'inset(8% 8% 8% 8% round 24px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'power2.out',
          scrollTrigger: { trigger: s, start: 'top 85%', end: 'top 35%', scrub: 0.5 },
        },
      );

      /* staggered content reveals */
      const els = inner.querySelectorAll('.cta-el');
      if (els.length) {
        gsap.fromTo(els,
          { opacity: 0, y: 50, filter: 'blur(4px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 0.9, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: inner, start: 'top 75%', toggleActions: 'play none none none' },
          },
        );
      }

      /* stat badges pop-in from bottom */
      const stats = inner.querySelectorAll('.cta-stat');
      if (stats.length) {
        gsap.fromTo(stats,
          { opacity: 0, scale: 0.7, y: 30 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: inner, start: 'top 65%', toggleActions: 'play none none none' },
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  /* ── Footer Animations ───────────────────────────────── */
  useEffect(() => {
    if (!footerRef.current) return;
    const ctx = gsap.context(() => {
      const cols = footerRef.current!.querySelectorAll('.ft-col');
      if (!cols.length) return;
      gsap.fromTo(cols,
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        },
      );

      /* social icons elastic entrance */
      const socials = footerRef.current!.querySelectorAll('.ft-social');
      if (socials.length) {
        gsap.fromTo(socials,
          { opacity: 0, scale: 0, rotation: -45 },
          {
            opacity: 1, scale: 1, rotation: 0,
            duration: 0.5, stagger: 0.06, ease: 'back.out(2)',
            scrollTrigger: { trigger: footerRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ━━━━ CINEMATIC CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={sectionRef} className="relative overflow-hidden">
        {/* clip-path animated wrapper */}
        <div className="cta-clip relative" style={{ clipPath: 'inset(8% 8% 8% 8% round 24px)' }}>
          {/* background image with parallax */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80"
              alt=""
              fill
              className="cta-bg-img object-cover will-change-transform"
              sizes="100vw"
            />
            {/* cinematic overlay — multi-layer */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(0,20,10,0.88) 0%, rgba(0,30,16,0.78) 40%, rgba(0,80,42,0.72) 100%)' }} />
            <div className="absolute inset-0 bg-linear-to-t from-[#001a0e]/60 via-transparent to-transparent" />
            {/* film grain */}
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
          </div>

          {/* ambient glow orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/3 right-0 w-125 h-125 bg-[#00D084]/8 rounded-full blur-[120px] translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-100 h-100 bg-[#008751]/6 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4" />
          </div>

          {/* content */}
          <div ref={ctaInner} className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
            <div className="text-center max-w-2xl mx-auto">
              {/* label */}
              <p className="cta-el flex items-center justify-center gap-3 mb-5">
                <span className="block w-10 h-px bg-[#00D084]/40" />
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.35em] text-[#00D084]/80" style={{ fontFamily: 'var(--font-inter)' }}>
                  Student Portal
                </span>
                <span className="block w-10 h-px bg-[#00D084]/40" />
              </p>

              {/* heading */}
              <h2
                className="cta-el text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white mb-5"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Ready to Get{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#00D084]">Started</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-0.75 bg-[#00D084]/30 rounded-full" />
                </span>
                ?
              </h2>

              {/* body */}
              <p className="cta-el text-white/45 text-[14px] sm:text-[15px] leading-[1.8] max-w-lg mx-auto mb-9" style={{ fontFamily: 'var(--font-inter)' }}>
                Access the NAAKIMS student portal to manage your membership, stay updated with chapter activities, and connect with the community.
              </p>

              {/* CTA buttons */}
              <div className="cta-el flex flex-col sm:flex-row items-center justify-center gap-4">
                <span
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[#008751] text-white text-sm font-bold tracking-wide transition-all duration-300"
                >
                  Get Started
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border border-white/20 text-white text-sm font-medium tracking-wide backdrop-blur-sm transition-all duration-300"
                >
                  Explore NAAKIMS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━ PREMIUM FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer
        ref={footerRef}
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #001a0e 0%, #001208 100%)' }}
      >
        {/* decorative top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#00D084]/12 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-8">

          {/* upper footer grid */}
          <div className="grid grid-cols-2 sm:grid-cols-12 gap-y-10 gap-x-6 mb-14">

            {/* brand column */}
            <div className="ft-col col-span-2 sm:col-span-4 lg:col-span-5">
              <span className="inline-flex items-center gap-3 mb-5 group cursor-default">
                <Image
                  src="/logo.png"
                  alt={BRAND.NAME}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-xl object-contain"
                />
                <span className="text-white/50 text-[13px] font-semibold tracking-[0.01em]" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {BRAND.NAME}
                </span>
              </span>
              <p className="text-white/25 text-[12.5px] leading-[1.75] max-w-xs mb-5" style={{ fontFamily: 'var(--font-inter)' }}>
                {BRAND.FULL_NAME}. United by origin, driven by excellence in medical education and community health.
              </p>
              {/* contact info */}
              <div className="space-y-2">
                <span
                  className="flex items-center gap-2 text-white/30 text-[12px] cursor-default"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  <svg className="w-3.5 h-3.5 shrink-0 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {CONTACT_INFO.EMAIL}
                </span>
                <p className="flex items-start gap-2 text-white/20 text-[11.5px] leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                  <svg className="w-3.5 h-3.5 shrink-0 opacity-40 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {CONTACT_INFO.ADDRESS}
                </p>
              </div>
            </div>

            {/* link columns */}
            {FOOTER_GROUPS.map((col) => (
              <div key={col.heading} className="ft-col col-span-1 sm:col-span-2 lg:col-span-2">
                <h4 className="text-white/40 text-[10px] font-semibold uppercase tracking-[0.22em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                  {col.heading}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <span
                        className="group/link inline-flex items-center gap-1.5 text-white/30 text-[12.5px] transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        <span className="block w-0 h-px bg-[#00D084] transition-all duration-300 group-hover/link:w-3" />
                        {link.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* divider */}
          <div className="h-px bg-linear-to-r from-transparent via-white/6 to-transparent mb-8" />

          {/* bottom bar */}
          <div className="ft-col flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* socials */}
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <span
                  key={s.label}
                  className="ft-social w-9 h-9 rounded-full bg-white/4 hover:bg-[#00D084]/15 border border-white/6 hover:border-[#00D084]/20 flex items-center justify-center text-white/25 hover:text-[#00D084] transition-all duration-300 cursor-pointer"
                  aria-label={s.label}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon} /></svg>
                </span>
              ))}
            </div>

            {/* copyright */}
            <p className="text-white/15 text-[11px] tracking-wide" style={{ fontFamily: 'var(--font-inter)' }}>
              &copy; {new Date().getFullYear()} {BRAND.NAME}. All rights reserved.
            </p>
          </div>

          {/* ── Powered-by credit ── */}
          <div className="mt-6 flex items-center justify-center">
            <a
              href="https://www.larrydavid.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="dev-credit-shimmer group/dev inline-flex items-center gap-2 hover:opacity-50 transition-opacity duration-500"
            >
              <span className="text-[8.5px] text-white/50 tracking-[0.15em] uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
                Engineered by
              </span>
              <span
                className="text-[9px] font-bold tracking-[0.08em] text-white/60 group-hover/dev:text-white/80 transition-colors duration-300"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                LD
              </span>
              <span className="text-[7px] text-white/25 group-hover/dev:text-white/60 transition-colors duration-300 leading-none">&rsaquo;</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
