'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════
interface Person {
  id: string;
  name: string;
  honorific: string;
  credentials: string;
  role: string;
  bio: string;
  image: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════════
const GOVERNOR: Person = {
  id: 'pastor-umo-bassey-eno',
  name: 'Pastor Umo Bassey Eno',
  honorific: 'His Excellency',
  credentials: 'Ph.D',
  role: 'Executive Governor, Akwa Ibom State',
  bio: "His Excellency Pastor Umo Bassey Eno, Ph.D stands among the most transformative leaders in Akwa Ibom State's modern history. His administration's commitment to healthcare, education, and youth empowerment has reshaped the landscape of opportunity for young professionals across the state. As Distinguished Patron of NAAKIMS Worldwide, his belief in the next generation represents a personal investment in the future of medical excellence.",
  image: '/images/umoeno.webp',
};

const COMMISSIONERS: Person[] = [
  {
    id: 'dr-ekem-john',
    name: 'Dr. Ekem John',
    honorific: '',
    credentials: '',
    role: 'Commissioner for Health',
    bio: "Dr. Ekem John brings a distinguished medical background to his role overseeing one of Akwa Ibom's most critical government portfolios. His alignment with NAAKIMS reflects a shared vision of building skilled medical professionals.",
    image: '/images/ekemjohn.jpeg',
  },
  {
    id: 'mrs-idongesit-etiebet',
    name: 'Mrs. Idongesit Etiebet',
    honorific: '',
    credentials: '',
    role: 'Commissioner for Education',
    bio: "Mrs. Idongesit Etiebet has been a driving force in reshaping Akwa Ibom's educational sector. Her support underscores the vital connection between academic foundations and world-class medical professionals.",
    image: '/images/idongesitetiebet.jpeg',
  },
  {
    id: 'dr-ekerete-ekanem',
    name: 'Dr. Ekerete Ekanem',
    honorific: '',
    credentials: '',
    role: 'Commissioner for Youth',
    bio: "Dr. Ekerete Ekanem champions youth empowerment from the highest levels of government. His partnership with NAAKIMS is built on the belief that investing in young people is investing in Nigeria's future.",
    image: '/images/ekereteekanem.jpeg',
  },
];

const MEDICAL_LEADERS: Person[] = [
  {
    id: 'dr-aniekan-peter',
    name: 'Dr. Aniekan Peter',
    honorific: '',
    credentials: '',
    role: 'Chairman, NMA Akwa Ibom',
    bio: "Dr. Aniekan Peter's leadership of the Nigerian Medical Association positions him at the forefront of medical advocacy in the state.",
    image: '/images/aniekanpeter.jpeg',
  },
  {
    id: 'dr-uduak-usanga',
    name: 'Dr. Uduak Usanga',
    honorific: '',
    credentials: '',
    role: 'Chairman, NMA Akwa Ibom',
    bio: "Dr. Uduak Usanga's tenure has been defined by an unrelenting commitment to raising standards across the medical profession.",
    image: '/images/uduakusanga.jpg',
  },
  {
    id: 'prof-ememabasi-bassey',
    name: 'Prof. Ememabasi Bassey',
    honorific: '',
    credentials: '',
    role: 'CMD, UUTH',
    bio: "Prof. Ememabasi Bassey leads one of Nigeria's premier teaching hospitals. Her endorsement carries the weight of institutional authority.",
    image: '/images/ememabasibassey.jpeg',
  },
  {
    id: 'dr-promise-jacob',
    name: 'Dr. Promise Jacob',
    honorific: '',
    credentials: '',
    role: 'President, ARD UUTH',
    bio: "Dr. Promise Jacob represents the bridge between studenthood and professional practice as President of Resident Doctors at UUTH.",
    image: '/images/promisejacob.jpg',
  },
];

const PATRONS: Person[] = [
  {
    id: 'dr-israel-ben',
    name: 'Dr. Israel Ben',
    honorific: '',
    credentials: '',
    role: 'Pioneer President',
    bio: "Dr. Israel Ben is the architect of NAAKIMS. As Pioneer President, he built the association from the ground up — turning a vision into a global organisation.",
    image: '/images/israelben.jpg',
  },
  {
    id: 'dr-glory-edet',
    name: 'Dr. Glory Edet',
    honorific: '',
    credentials: '',
    role: 'First Female Patron',
    bio: "Dr. Glory Edet entered NAAKIMS history as the first woman to be honoured as a patron — a milestone reflecting the progressive values of the association.",
    image: '/images/gloryedet.jpeg',
  },
  {
    id: 'dr-ekaette-mbatt',
    name: 'Dr. Ekaette Mbatt',
    honorific: '',
    credentials: '',
    role: 'Patron',
    bio: "Dr. Ekaette Mbatt's commitment to student welfare has made her one of NAAKIMS' most steadfast champions across Nigeria and the diaspora.",
    image: '/images/ekaetembatt.jpg',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// PREVIEW POPUP — Ultramodern floating preview with glass morphism
// ═══════════════════════════════════════════════════════════════════════════════
function PreviewPopup({ person, onClose }: { person: Person | null; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    gsap.to(panelRef.current, { opacity: 0, y: 20, scale: 0.95, duration: 0.25, ease: 'power2.in' });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.2, onComplete: () => { closing.current = false; onClose(); } });
  }, [onClose]);

  useEffect(() => {
    if (!person) return;
    closing.current = false;
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    gsap.fromTo(panelRef.current, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' });
    document.body.style.overflow = 'hidden';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [person, close]);

  if (!person) return null;

  // Truncate bio to ~100 chars
  const shortBio = person.bio.length > 100 ? person.bio.slice(0, 100).trim() + '...' : person.bio;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div ref={backdropRef} className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={close} />
      
      {/* Popup card */}
      <div ref={panelRef} className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl">
        {/* Image with gradient blend */}
        <div className="relative h-56 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={person.image} alt={person.name} className="w-full h-full object-cover object-top" />
          {/* Gradient overlays */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 40%, transparent 70%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,208,132,0.15) 0%, transparent 60%)' }} />
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6 -mt-6 relative z-10">
          {/* Name & role */}
          {person.honorific && (
            <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#00D084] mb-1" style={{ fontFamily: 'var(--font-inter)' }}>{person.honorific}</p>
          )}
          <h3 className="text-[22px] font-black text-slate-900 leading-tight mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>
            {person.name}
            {person.credentials && <span className="font-normal text-slate-300">, {person.credentials}</span>}
          </h3>
          <p className="text-[12px] text-[#008751] font-medium mb-4" style={{ fontFamily: 'var(--font-inter)' }}>{person.role}</p>
          
          {/* Truncated bio */}
          <p className="text-[13px] leading-[1.7] text-slate-500 mb-5" style={{ fontFamily: 'var(--font-inter)' }}>{shortBio}</p>
          
          {/* Read full profile link */}
          <Link 
            href={`/sponsors/${person.id}`}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-[#008751] text-white text-[13px] font-bold tracking-wide shadow-lg shadow-[#008751]/20 transition-all duration-300 hover:bg-[#007045]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Read Full Profile
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        
        {/* Close button */}
        <button 
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-white transition-all duration-300 shadow-lg"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GOVERNOR FEATURE — Full-width premium card with glass arrow
// ═══════════════════════════════════════════════════════════════════════════════
function GovernorCard({ person, onSelect }: { person: Person; onSelect: () => void }) {
  return (
    <div
      className="gov-card relative w-full rounded-[28px] overflow-hidden cursor-pointer group"
      style={{ background: 'linear-gradient(145deg, #00321A 0%, #004D28 50%, #006633 100%)' }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
    >
      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,208,132,0.18) 0%, transparent 70%)' }} />

      {/* Glass arrow — appears on hover */}
      <div className="absolute top-6 right-6 z-20 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 border border-white/20">
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]">
        {/* Text */}
        <div className="relative z-10 flex flex-col justify-center p-8 sm:p-10 lg:p-14 order-2 lg:order-1">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#00D084]" style={{ fontFamily: 'var(--font-inter)' }}>{person.honorific}</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-black text-white leading-[0.95] tracking-tight mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
            {person.name}
          </h2>
          <p className="text-[13px] text-white/40 mb-1" style={{ fontFamily: 'var(--font-inter)' }}>{person.credentials}</p>
          <p className="text-[12px] text-white/50 mb-8" style={{ fontFamily: 'var(--font-inter)' }}>{person.role}</p>

          {/* CTA — always visible on desktop, hover on mobile */}
          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 lg:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0 lg:translate-x-0">
            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-[#008751] text-white text-[13px] font-bold tracking-wide shadow-lg shadow-[#008751]/20 transition-all duration-300" style={{ fontFamily: 'var(--font-inter)' }}>
              View Profile
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </div>
        </div>

        {/* Photo */}
        <div className="relative h-72 sm:h-80 lg:h-auto lg:min-h-105 order-1 lg:order-2 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={person.image} 
            alt={person.name} 
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
          />
          {/* Left blend — reduced opacity */}
          <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, #00321A 0%, rgba(0,50,26,0.4) 20%, transparent 45%)' }} />
          {/* Bottom blend mobile */}
          <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to top, #00321A 0%, rgba(0,50,26,0.4) 35%, transparent 65%)' }} />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PERSON CARD — Facilitators-style with glass arrow on hover
// ═══════════════════════════════════════════════════════════════════════════════
function PersonCard({ person, onSelect, height = 'h-[400px]' }: { person: Person; onSelect: () => void; height?: string }) {
  return (
    <div
      className="person-card cursor-pointer group"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
    >
      {/* Photo container */}
      <div className={`relative w-full ${height} rounded-2xl overflow-hidden bg-slate-100`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={person.image} 
          alt={person.name} 
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" 
        />

        {/* Gradient overlay — always visible */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        {/* Glass arrow — appears on hover */}
        <div className="absolute top-4 right-4 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 border border-white/20">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {person.honorific && (
            <p className="text-[8px] font-bold tracking-[0.25em] uppercase text-[#00D084] mb-1" style={{ fontFamily: 'var(--font-inter)' }}>{person.honorific}</p>
          )}
          <h3 className="text-[17px] sm:text-[19px] font-bold text-white leading-tight mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>
            {person.name}
            {person.credentials && <span className="text-white/50">, {person.credentials}</span>}
          </h3>
          <p className="text-[11px] sm:text-[12px] text-white/60" style={{ fontFamily: 'var(--font-inter)' }}>{person.role}</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function SponsorsShowcase() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Person | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo('.sp-h', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out', delay: 0.1 });

      // Gov
      ScrollTrigger.create({
        trigger: '.gov-card',
        start: 'top 88%',
        onEnter: () => gsap.fromTo('.gov-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }),
      });

      // Cards
      gsap.utils.toArray<HTMLElement>('.person-card').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 22 }, {
          opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
          delay: (i % 4) * 0.06,
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <PreviewPopup person={selected} onClose={() => setSelected(null)} />

      <div ref={pageRef} className="min-h-screen bg-[#FAFBFA]">

        {/* HERO */}
        <div className="relative overflow-hidden">
          {/* Background shapes */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Large green gradient blob */}
            <div className="absolute -top-32 right-0 w-150 h-150" style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(0,208,132,0.12) 0%, transparent 60%)' }} />
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#00D084 1px, transparent 1px), linear-gradient(90deg, #00D084 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
            {/* Floating rings */}
            <div className="absolute top-20 right-16 w-32 h-32 border border-[#00D084]/10 rounded-full hidden lg:block" />
            <div className="absolute top-36 right-8 w-20 h-20 border border-[#00D084]/8 rounded-full hidden lg:block" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-28 sm:pt-36 pb-16 sm:pb-20">
            {/* Eyebrow */}
            <div className="sp-h flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00D084]/10 border border-[#00D084]/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#008751]" style={{ fontFamily: 'var(--font-inter)' }}>NAAKIMS Worldwide</span>
              </div>
            </div>

            {/* Main heading — big, confident, modern */}
            <h1 className="sp-h text-[44px] sm:text-[64px] lg:text-[80px] font-black text-slate-900 leading-[0.92] tracking-tight mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
              Our Distinguished
              <br />
              <span className="relative">
                <span className="text-[#00D084]">Supporters</span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#00D084]/20" viewBox="0 0 200 12" preserveAspectRatio="none"><path d="M0 6 Q50 0 100 6 T200 6" stroke="currentColor" strokeWidth="4" fill="none" /></svg>
              </span>
            </h1>

            {/* Subtext */}
            <p className="sp-h text-[15px] sm:text-[17px] text-slate-400 max-w-lg leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
              Leaders who believe in tomorrow&apos;s medical excellence.
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-20 space-y-16 sm:space-y-20">

          {/* GOVERNOR */}
          <section>
            <GovernorCard person={GOVERNOR} onSelect={() => setSelected(GOVERNOR)} />
          </section>

          {/* COMMISSIONERS */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-5 h-px bg-[#00D084]" />
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-300" style={{ fontFamily: 'var(--font-inter)' }}>Cabinet Commissioners</p>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {COMMISSIONERS.map((p) => (
                <PersonCard key={p.name} person={p} onSelect={() => setSelected(p)} height="h-[400px]" />
              ))}
            </div>
          </section>

          {/* MEDICAL LEADERS */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-5 h-px bg-[#00D084]" />
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-300" style={{ fontFamily: 'var(--font-inter)' }}>Medical Leadership</p>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {MEDICAL_LEADERS.map((p) => (
                <PersonCard key={p.name} person={p} onSelect={() => setSelected(p)} height="h-[260px] sm:h-[320px] lg:h-[380px]" />
              ))}
            </div>
          </section>

          {/* PATRONS */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-5 h-px bg-[#00D084]" />
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-300" style={{ fontFamily: 'var(--font-inter)' }}>Founding Patrons</p>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {PATRONS.map((p) => (
                <PersonCard key={p.name} person={p} onSelect={() => setSelected(p)} height="h-[340px] sm:h-[360px]" />
              ))}
            </div>
          </section>

        </div>

        {/* FOOTER */}
        <div className="border-t border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
              <p className="text-[11px] text-slate-400" style={{ fontFamily: 'var(--font-inter)' }}>NAAKIMS Worldwide</p>
            </div>
            <p className="text-[11px] text-slate-300 tabular-nums" style={{ fontFamily: 'var(--font-inter)' }}>11 distinguished supporters</p>
          </div>
        </div>

      </div>
    </>
  );
}
