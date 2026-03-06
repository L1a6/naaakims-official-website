'use client';

import React, { useEffect, useRef } from 'react';
import DashboardLayout from '@/components/portal/DashboardLayout';
import gsap from 'gsap';

const impactAreas = [
  {
    title: 'Student Bursaries',
    description: 'Financial support for students in need across all chapters',
    amount: 1200000,
    beneficiaries: 15,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg>
    ),
  },
  {
    title: 'Events & Conferences',
    description: 'Sponsorship for dinner nights, medical conferences, and outreach',
    amount: 800000,
    beneficiaries: 300,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
  },
  {
    title: 'Health Missions',
    description: 'Community health outreach and free medical services',
    amount: 350000,
    beneficiaries: 500,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
    ),
  },
  {
    title: 'Infrastructure',
    description: 'Building and equipping chapter facilities nationwide',
    amount: 150000,
    beneficiaries: 5,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    ),
  },
];

const milestones = [
  { year: '2026', event: 'Funded 15 student bursaries across 5 chapters' },
  { year: '2025', event: 'Sponsored 3 major NAAKIMS events' },
  { year: '2024', event: 'Joined as Gold Tier Patron' },
  { year: '2020', event: 'First contribution to NAAKIMS' },
];

export default function PatronImpactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.impact-section',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      );
      gsap.fromTo('.impact-card',
        { y: 24, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out', delay: 0.3 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  };

  const totalAmount = impactAreas.reduce((sum, a) => sum + a.amount, 0);
  const totalBeneficiaries = impactAreas.reduce((sum, a) => sum + a.beneficiaries, 0);

  return (
    <DashboardLayout memberType="patron" userName="Alhaji Suleiman Bello" userRegNo="NAAKIMS/PAT/2020/0045">
      <div ref={containerRef} className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="impact-section">
          <h1 className="text-base sm:text-xl font-semibold text-gray-900 tracking-[-0.025em]">Your Impact Report</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">See how your contributions are making a difference</p>
        </div>

        {/* Hero Stats */}
        <div className="impact-section relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-[#008751] text-white">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-x-12 -translate-y-12" />
          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: formatCurrency(totalAmount), label: 'Total Directed' },
              { value: `${totalBeneficiaries}+`, label: 'Lives Impacted' },
              { value: '15', label: 'Chapters Reached' },
              { value: '4', label: 'Initiatives Funded' },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-base sm:text-xl font-bold tracking-[-0.03em]">{stat.value}</p>
                <p className="text-[8px] sm:text-[9px] font-semibold text-white/40 uppercase tracking-widest mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Areas */}
        <div className="impact-section">
          <h2 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3">Where Your Money Goes</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {impactAreas.map((area, idx) => (
              <div key={idx} className={`impact-card rounded-xl px-4 py-4 sm:px-5 sm:py-5 transition-all duration-200 ${idx % 2 === 0 ? 'bg-[#008751]/[0.03]' : 'bg-gray-50/80'} hover:bg-[#008751]/[0.06]`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#008751]/6 flex items-center justify-center text-[#008751] shrink-0">
                    {area.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-semibold text-gray-900">{area.title}</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{area.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div>
                        <p className="text-[15px] font-bold text-[#008751]">{formatCurrency(area.amount)}</p>
                        <p className="text-[9px] text-gray-300 uppercase tracking-widest">Contributed</p>
                      </div>
                      <div className="w-px h-8 bg-gray-100" />
                      <div>
                        <p className="text-[15px] font-bold text-gray-900">{area.beneficiaries}+</p>
                        <p className="text-[9px] text-gray-300 uppercase tracking-widest">Beneficiaries</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="impact-section bg-gray-50/80 rounded-xl px-4 py-4 sm:px-5 sm:py-5">
          <h2 className="text-[13px] font-semibold text-gray-900 mb-4">Your Milestones</h2>
          <div className="relative">
            <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gray-100" />
            <div className="space-y-4">
              {milestones.map((m, idx) => (
                <div key={idx} className="flex items-start gap-4 relative">
                  <div className="w-9 h-9 rounded-lg bg-[#008751]/8 flex items-center justify-center text-[#008751] text-[11px] font-bold shrink-0 z-10">
                    {m.year.slice(2)}
                  </div>
                  <div className="pt-1.5">
                    <p className="text-[12px] text-gray-400 font-medium">{m.year}</p>
                    <p className="text-[13px] text-gray-800 font-medium mt-0.5">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="impact-section text-center py-4">
          <p className="text-gray-400 text-[12px] mb-3">Continue making an impact with NAAKIMS</p>
          <a
            href="/portal/patron/contribute"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#008751] text-white rounded-lg text-[12px] font-semibold hover:bg-[#006d42] transition-all duration-200"
          >
            Make Another Contribution
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}
