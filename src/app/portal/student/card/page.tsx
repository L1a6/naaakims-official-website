'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DashboardLayout from '@/components/portal/DashboardLayout';
import gsap from 'gsap';

const mockUser = {
  name: 'Inyeneobong Godwin Inyang',
  regNo: 'NAAKIMS/STU/2024/0892',
  chapter: 'University of Uyo',
  level: '400 Level',
  program: 'Medicine & Surgery',
  validUntil: 'Dec 2026',
  duesStatus: 'paid' as const,
  photoUrl: '',
  admissionYear: 2021,
};

export default function StudentCardPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.card-section',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out', delay: 0.05 }
      );
      gsap.fromTo('.id-card',
        { scale: 0.97, opacity: 0, y: 12 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.12 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <DashboardLayout memberType="student" userName={mockUser.name} userRegNo={mockUser.regNo}>
      <div ref={containerRef} className="max-w-3xl mx-auto space-y-5">
        {/* Header */}
        <div className="card-section flex items-center justify-between">
          <div>
            <h1 className="text-base sm:text-xl font-semibold text-gray-900 tracking-[-0.025em]">Membership Card</h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">Your virtual NAAKIMS ID</p>
          </div>
          <button
            onClick={() => window.print()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] sm:text-[12px] font-medium bg-[#008751] text-white hover:bg-[#006d42] transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print
          </button>
        </div>

        {/* Virtual Card */}
        <div className="id-card relative overflow-hidden rounded-2xl bg-linear-to-br from-[#006d42] via-[#008751] to-[#00a864]">
          <div className="aspect-[1.7/1] relative p-5 sm:p-7 flex flex-col justify-between">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-white/[0.04] rounded-full -translate-y-20 translate-x-20" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/[0.03] rounded-full translate-y-16 -translate-x-16" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 0.5px, transparent 0.5px)', backgroundSize: '18px 18px' }} />

            {/* Top Row */}
            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <Image src="/logo.png" alt="NAAKIMS" width={32} height={32} className="w-7 h-7 sm:w-8 sm:h-8 brightness-0 invert opacity-90" />
                <div>
                  <p className="text-white text-xs sm:text-sm font-bold tracking-[-0.01em]">NAAKIMS</p>
                  <p className="text-white/40 text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.15em]">Student Member</p>
                </div>
              </div>
              <div className={`px-2 py-0.5 rounded-md text-[8px] sm:text-[9px] font-bold uppercase tracking-wider ${mockUser.duesStatus === 'paid' ? 'bg-white/15 text-white/90' : 'bg-red-400/20 text-red-200'}`}>
                {mockUser.duesStatus === 'paid' ? 'Active' : 'Inactive'}
              </div>
            </div>

            {/* Chip */}
            <div className="relative my-auto">
              <div className="w-9 h-7 sm:w-10 sm:h-8 rounded-md bg-white/15 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <div className="w-5 h-4 sm:w-6 sm:h-5 rounded-[3px] bg-white/10 border border-white/15" />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="relative">
              <p className="text-white text-[15px] sm:text-[19px] font-bold tracking-[0.04em] uppercase">{mockUser.name}</p>
              <div className="flex items-center justify-between mt-2 sm:mt-3">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div>
                    <p className="text-white/30 text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.15em]">Member ID</p>
                    <p className="text-white/90 text-[10px] sm:text-[12px] font-mono font-bold mt-0.5">{mockUser.regNo}</p>
                  </div>
                  <div>
                    <p className="text-white/30 text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.15em]">Valid Thru</p>
                    <p className="text-white/90 text-[10px] sm:text-[12px] font-bold mt-0.5">{mockUser.validUntil}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-white/30 text-[8px] font-semibold uppercase tracking-[0.15em]">Level</p>
                    <p className="text-white/90 text-[12px] font-bold mt-0.5">{mockUser.level}</p>
                  </div>
                </div>
                {/* Photo */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  {mockUser.photoUrl ? (
                    <Image src={mockUser.photoUrl} alt={mockUser.name} fill className="object-cover rounded-lg" />
                  ) : (
                    <span className="text-base sm:text-lg font-bold text-white/70">{mockUser.name.charAt(0)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Details */}
        <div className="card-section grid sm:grid-cols-2 gap-3">
          <div className="bg-[#008751]/[0.03] rounded-xl px-4 py-4 sm:px-5 sm:py-5">
            <h3 className="text-[11px] sm:text-[12px] font-semibold text-gray-900 mb-3">Card Information</h3>
            <div className="space-y-2.5">
              {[
                { label: 'Full Name', value: mockUser.name },
                { label: 'Registration Number', value: mockUser.regNo },
                { label: 'Chapter', value: mockUser.chapter },
                { label: 'Program', value: mockUser.program },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{item.label}</p>
                  <p className="text-[12px] sm:text-[13px] text-gray-700 font-medium mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50/80 rounded-xl px-4 py-4 sm:px-5 sm:py-5">
            <h3 className="text-[11px] sm:text-[12px] font-semibold text-gray-900 mb-3">Membership Status</h3>
            <div className="space-y-2.5">
              <div>
                <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Status</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${mockUser.duesStatus === 'paid' ? 'bg-[#008751]' : 'bg-red-500'}`} />
                  <p className="text-[12px] sm:text-[13px] font-medium text-gray-700">{mockUser.duesStatus === 'paid' ? 'Active Member' : 'Inactive'}</p>
                </div>
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Valid Until</p>
                <p className="text-[12px] sm:text-[13px] text-gray-700 font-medium mt-0.5">{mockUser.validUntil}</p>
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Admission Year</p>
                <p className="text-[12px] sm:text-[13px] text-gray-700 font-medium mt-0.5">{mockUser.admissionYear}</p>
              </div>
            </div>
            <Link
              href="/portal/student/dues"
              className="mt-4 block w-full py-2.5 bg-[#008751] text-white rounded-lg text-center text-[11px] sm:text-[12px] font-medium hover:bg-[#006d42] transition-all duration-200"
            >
              Renew Membership
            </Link>
          </div>
        </div>

        {/* Actions */}
        <div className="card-section flex flex-col sm:flex-row gap-2.5">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-gray-50/80 rounded-xl text-[11px] sm:text-[12px] font-medium text-gray-600 hover:bg-gray-100/80 active:scale-[0.98] transition-all duration-200">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download PDF
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-gray-50/80 rounded-xl text-[11px] sm:text-[12px] font-medium text-gray-600 hover:bg-gray-100/80 active:scale-[0.98] transition-all duration-200">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            Share Card
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
