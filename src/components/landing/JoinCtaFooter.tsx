'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NAV_LINKS, SOCIAL_MEDIA, CONTACT_INFO, BRAND } from '@/lib/constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}



/* ─────────────────────────────────────────────────────────────
   FOOTER LINK GROUPS — organized from real NAV_LINKS
   ───────────────────────────────────────────────────────────── */
const FOOTER_GROUPS = [
  {
    heading: 'About',
    links: NAV_LINKS.filter(l =>
      ['About', 'Executives', 'Achievements'].includes(l.label),
    ),
  },
  {
    heading: 'Explore',
    links: NAV_LINKS.filter(l =>
      ['Chapters', 'Events', 'Gallery'].includes(l.label),
    ),
  },
  {
    heading: 'Resources',
    links: NAV_LINKS.filter(l =>
      ['Blog', 'Sponsors', 'Contact'].includes(l.label),
    ),
  },
];

/* ─────────────────────────────────────────────────────────────
   SOCIAL ICONS
   ───────────────────────────────────────────────────────────── */
const SOCIALS = [
  { label: 'Facebook', href: SOCIAL_MEDIA.FACEBOOK, icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label: 'Twitter', href: SOCIAL_MEDIA.TWITTER, icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { label: 'Instagram', href: SOCIAL_MEDIA.INSTAGRAM, icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { label: 'LinkedIn', href: SOCIAL_MEDIA.LINKEDIN, icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { label: 'WhatsApp', href: SOCIAL_MEDIA.WHATSAPP, icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
  { label: 'YouTube', href: SOCIAL_MEDIA.YOUTUBE, icon: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
];

/* ═════════════════════════════════════════════════════════════
   ClosingSection + Footer
   ═════════════════════════════════════════════════════════════ */
export default function JoinCtaFooter() {
  const ctaRef       = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLDivElement>(null);
  const footerRef    = useRef<HTMLElement>(null);

  /* ── ScrollTrigger — CTA headline reveal ───────────────── */
  useEffect(() => {
    if (!headlineRef.current) return;
    const ctx = gsap.context(() => {
      const subs = headlineRef.current!.querySelectorAll('.cta-el');
      if (subs.length) {
        gsap.fromTo(subs,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);


  /* ── ScrollTrigger — Footer columns stagger ────────────── */
  useEffect(() => {
    if (!footerRef.current) return;
    const ctx = gsap.context(() => {
      const cols = footerRef.current!.querySelectorAll('.ft-col');
      if (!cols.length) return;

      gsap.fromTo(cols,
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0,
          duration: 0.7, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ━━━━ CLOSING CTA — rich dark green with image overlay ━━━━ */}
      <section
        ref={ctaRef}
        className="relative overflow-hidden"
      >
        {/* Background image + overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,26,14,0.82) 0%, rgba(0,18,10,0.85) 50%, rgba(0,26,14,0.80) 100%)' }} />
          {/* Subtle grain texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
        </div>

        {/* Decorative glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#00D084]/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-[#008751]/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-32">

          {/* ── Headline block ── */}
          <div ref={headlineRef} className="text-center max-w-2xl mx-auto">
            <p className="cta-el flex items-center justify-center gap-3 mb-4">
              <span className="block w-8 h-px bg-[#00D084]/40" />
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-[#00D084]/70" style={{ fontFamily: 'var(--font-inter)' }}>
                Stay Connected
              </span>
              <span className="block w-8 h-px bg-[#00D084]/40" />
            </p>

            <h2
              className="cta-el text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em] text-white mb-5"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Discover What <span className="text-[#00D084]">NAAKIMS</span> Is All About
            </h2>

            <p className="cta-el text-white/45 text-[14px] sm:text-[15px] leading-[1.75] max-w-xl mx-auto mb-10" style={{ fontFamily: 'var(--font-inter)' }}>
              Learn more about our mission, explore our chapters, browse upcoming events, or get in touch with us directly.
            </p>

            {/* CTA buttons — matching Hero style */}
            <div className="cta-el flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-[#008751] text-white text-sm font-semibold tracking-wide shadow-lg shadow-black/20 hover:bg-[#006d41] active:scale-[0.98] transition-all duration-300"
              >
                Explore NAAKIMS
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-0.5">
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded border border-white/25 text-white text-sm font-medium tracking-wide backdrop-blur-sm hover:bg-white/10 hover:border-white/40 active:scale-[0.98] transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer
        ref={footerRef}
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #001f12 0%, #001a0e 50%, #011a0e 100%)' }}
      >
        {/* Top border accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#00D084]/15 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 sm:pt-16 pb-8">

          {/* Main footer grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 sm:gap-6 mb-12">

            {/* Brand column — spans 2 cols */}
            <div className="ft-col col-span-2">
              <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
                <Image
                  src="/logo.png"
                  alt={BRAND.NAME}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-lg object-contain"
                />
                <span className="text-white/40 text-[12px] font-medium tracking-[0.01em]" style={{ fontFamily: 'var(--font-inter)' }}>
                  {BRAND.NAME}
                </span>
              </Link>
              <p className="text-white/25 text-[12px] leading-[1.7] max-w-xs mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                {BRAND.FULL_NAME}.
              </p>
              {/* Contact info */}
              <div className="space-y-1.5">
                <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="block text-white/30 text-[12px] hover:text-[#00D084] transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>
                  {CONTACT_INFO.EMAIL}
                </a>
                <p className="text-white/20 text-[11px]" style={{ fontFamily: 'var(--font-inter)' }}>
                  {CONTACT_INFO.ADDRESS}
                </p>
              </div>
            </div>

            {/* Link columns — from real NAV_LINKS */}
            {FOOTER_GROUPS.map((col) => (
              <div key={col.heading} className="ft-col">
                <h4 className="text-white/40 text-[10px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>
                  {col.heading}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-white/30 text-[12px] sm:text-[13px] hover:text-[#00D084] transition-colors duration-200"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar — socials + copyright */}
          <div className="ft-col flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#00D084]/8">
            {/* Socials */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#00D084]/15 flex items-center justify-center text-white/25 hover:text-[#00D084] transition-all duration-300"
                  aria-label={s.label}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
            {/* Copyright */}
            <p className="text-white/15 text-[11px]" style={{ fontFamily: 'var(--font-inter)' }}>
              &copy; {new Date().getFullYear()} {BRAND.NAME}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
