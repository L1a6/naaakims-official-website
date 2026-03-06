'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES & DATA (same as SponsorsShowcase)
// ═══════════════════════════════════════════════════════════════════════════════
interface Person {
  id: string;
  name: string;
  honorific: string;
  credentials: string;
  role: string;
  bio: string;
  image: string;
  category: 'governor' | 'commissioner' | 'medical' | 'patron';
}

const ALL_SPONSORS: Person[] = [
  {
    id: 'pastor-umo-bassey-eno',
    name: 'Pastor Umo Bassey Eno',
    honorific: 'His Excellency',
    credentials: 'Ph.D',
    role: 'Executive Governor, Akwa Ibom State',
    bio: "His Excellency Pastor Umo Bassey Eno, Ph.D stands among the most transformative leaders in Akwa Ibom State's modern history. His administration's commitment to healthcare, education, and youth empowerment has reshaped the landscape of opportunity for young professionals across the state. As Distinguished Patron of NAAKIMS Worldwide, his belief in the next generation represents a personal investment in the future of medical excellence.",
    image: '/images/umoeno.webp',
    category: 'governor',
  },
  {
    id: 'dr-ekem-john',
    name: 'Dr. Ekem John',
    honorific: '',
    credentials: '',
    role: 'Commissioner for Health',
    bio: "Dr. Ekem John brings a distinguished medical background to his role overseeing one of Akwa Ibom's most critical government portfolios. His alignment with NAAKIMS reflects a shared vision of building skilled medical professionals.",
    image: '/images/ekemjohn.jpeg',
    category: 'commissioner',
  },
  {
    id: 'mrs-idongesit-etiebet',
    name: 'Mrs. Idongesit Etiebet',
    honorific: '',
    credentials: '',
    role: 'Commissioner for Education',
    bio: "Mrs. Idongesit Etiebet has been a driving force in reshaping Akwa Ibom's educational sector. Her support underscores the vital connection between academic foundations and world-class medical professionals.",
    image: '/images/idongesitetiebet.jpeg',
    category: 'commissioner',
  },
  {
    id: 'dr-ekerete-ekanem',
    name: 'Dr. Ekerete Ekanem',
    honorific: '',
    credentials: '',
    role: 'Commissioner for Youth',
    bio: "Dr. Ekerete Ekanem champions youth empowerment from the highest levels of government. His partnership with NAAKIMS is built on the belief that investing in young people is investing in Nigeria's future.",
    image: '/images/ekereteekanem.jpeg',
    category: 'commissioner',
  },
  {
    id: 'dr-aniekan-peter',
    name: 'Dr. Aniekan Peter',
    honorific: '',
    credentials: '',
    role: 'Chairman, NMA Akwa Ibom',
    bio: "Dr. Aniekan Peter's leadership of the Nigerian Medical Association positions him at the forefront of medical advocacy in the state.",
    image: '/images/aniekanpeter.jpeg',
    category: 'medical',
  },
  {
    id: 'dr-uduak-usanga',
    name: 'Dr. Uduak Usanga',
    honorific: '',
    credentials: '',
    role: 'Chairman, NMA Akwa Ibom',
    bio: "Dr. Uduak Usanga's tenure has been defined by an unrelenting commitment to raising standards across the medical profession.",
    image: '/images/uduakusanga.jpg',
    category: 'medical',
  },
  {
    id: 'prof-ememabasi-bassey',
    name: 'Prof. Ememabasi Bassey',
    honorific: '',
    credentials: '',
    role: 'CMD, UUTH',
    bio: "Prof. Ememabasi Bassey leads one of Nigeria's premier teaching hospitals. Her endorsement carries the weight of institutional authority.",
    image: '/images/ememabasibassey.jpeg',
    category: 'medical',
  },
  {
    id: 'dr-promise-jacob',
    name: 'Dr. Promise Jacob',
    honorific: '',
    credentials: '',
    role: 'President, ARD UUTH',
    bio: "Dr. Promise Jacob represents the bridge between studenthood and professional practice as President of Resident Doctors at UUTH.",
    image: '/images/promisejacob.jpg',
    category: 'medical',
  },
  {
    id: 'dr-israel-ben',
    name: 'Dr. Israel Ben',
    honorific: '',
    credentials: '',
    role: 'Pioneer President',
    bio: "Dr. Israel Ben is the architect of NAAKIMS. As Pioneer President, he built the association from the ground up — turning a vision into a global organisation.",
    image: '/images/israelben.jpg',
    category: 'patron',
  },
  {
    id: 'dr-glory-edet',
    name: 'Dr. Glory Edet',
    honorific: '',
    credentials: '',
    role: 'First Female Patron',
    bio: "Dr. Glory Edet entered NAAKIMS history as the first woman to be honoured as a patron — a milestone reflecting the progressive values of the association.",
    image: '/images/gloryedet.jpeg',
    category: 'patron',
  },
  {
    id: 'dr-ekaette-mbatt',
    name: 'Dr. Ekaette Mbatt',
    honorific: '',
    credentials: '',
    role: 'Patron',
    bio: "Dr. Ekaette Mbatt's commitment to student welfare has made her one of NAAKIMS' most steadfast champions across Nigeria and the diaspora.",
    image: '/images/ekaetembatt.jpg',
    category: 'patron',
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  governor: 'Distinguished Patron',
  commissioner: 'Cabinet Commissioner',
  medical: 'Medical Leader',
  patron: 'Founding Patron',
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function SponsorProfilePage() {
  const params = useParams();
  const pageRef = useRef<HTMLDivElement>(null);
  
  const person = ALL_SPONSORS.find(p => p.id === params.id);
  
  useEffect(() => {
    if (!person) return;
    
    gsap.fromTo('.profile-hero', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
    );
  }, [person]);

  if (!person) {
    notFound();
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FAFBFA]">

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 right-0 w-150 h-150" style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(0,208,132,0.1) 0%, transparent 60%)' }} />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#00D084 1px, transparent 1px), linear-gradient(90deg, #00D084 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-12 pb-20">
          
          {/* Back link */}
          <Link 
            href="/sponsors" 
            className="inline-flex items-center gap-2 text-[12px] font-medium text-slate-400 hover:text-[#00D084] transition-colors duration-300 mb-10 group"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Sponsors
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-16 items-start">
            
            {/* Image */}
            <div className="profile-hero">
              <div className="relative aspect-3/4 w-full max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={person.image} 
                  alt={person.name}
                  className="w-full h-full object-cover object-top"
                />
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Category badge */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-[#00D084]" />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white" style={{ fontFamily: 'var(--font-inter)' }}>
                      {CATEGORY_LABELS[person.category]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="profile-hero lg:pt-8">
              {/* Honorific */}
              {person.honorific && (
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#00D084] mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
                  {person.honorific}
                </p>
              )}
              
              {/* Name */}
              <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-black text-slate-900 leading-[0.95] tracking-tight mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                {person.name}
                {person.credentials && (
                  <span className="text-slate-300">, {person.credentials}</span>
                )}
              </h1>
              
              {/* Role */}
              <p className="text-[15px] sm:text-[17px] text-[#008751] font-medium mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
                {person.role}
              </p>
              
              {/* Divider */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-[#00D084]" />
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-slate-300" style={{ fontFamily: 'var(--font-inter)' }}>Biography</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>
              
              {/* Bio */}
              <p className="text-[15px] sm:text-[17px] leading-[1.9] text-slate-500 mb-10" style={{ fontFamily: 'var(--font-inter)' }}>
                {person.bio}
              </p>
              
              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="/sponsors"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-lg bg-[#008751] text-white text-[13px] font-bold tracking-wide shadow-lg shadow-[#008751]/20 hover:bg-[#007045] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  All Supporters
                </Link>
                
                <div className="flex items-center gap-2 px-5 py-3.5 rounded-lg bg-slate-100 text-[12px] font-semibold text-slate-400" style={{ fontFamily: 'var(--font-inter)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
                  NAAKIMS Worldwide
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="border-t border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
            <p className="text-[11px] text-slate-400" style={{ fontFamily: 'var(--font-inter)' }}>NAAKIMS Worldwide</p>
          </div>
          <p className="text-[11px] text-slate-300" style={{ fontFamily: 'var(--font-inter)' }}>Building Tomorrow&apos;s Medical Excellence</p>
        </div>
      </div>
    </div>
  );
}
