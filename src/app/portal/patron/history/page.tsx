'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/portal/DashboardLayout';
import gsap from 'gsap';

const contributions = [
  { purpose: 'Student Bursary Fund', amount: 500000, date: 'Feb 15, 2026', status: 'completed', reference: 'PAT-2026-0234' },
  { purpose: 'Dinner Night Sponsorship', amount: 300000, date: 'Jan 20, 2026', status: 'completed', reference: 'PAT-2026-0198' },
  { purpose: 'Health Mission', amount: 200000, date: 'Dec 10, 2025', status: 'completed', reference: 'PAT-2025-0892' },
  { purpose: 'Scholarship Fund', amount: 750000, date: 'Nov 5, 2025', status: 'completed', reference: 'PAT-2025-0756' },
  { purpose: 'Chapter Infrastructure', amount: 400000, date: 'Oct 1, 2025', status: 'completed', reference: 'PAT-2025-0601' },
  { purpose: 'General Fund', amount: 150000, date: 'Sep 15, 2025', status: 'completed', reference: 'PAT-2025-0489' },
  { purpose: 'Student Bursary Fund', amount: 200000, date: 'Aug 8, 2025', status: 'completed', reference: 'PAT-2025-0345' },
];

const totalContributed = contributions.reduce((sum, c) => sum + c.amount, 0);

export default function PatronHistoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hist-section',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      );
      gsap.fromTo('.hist-row',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out', delay: 0.3 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <DashboardLayout memberType="patron" userName="Alhaji Suleiman Bello" userRegNo="NAAKIMS/PAT/2020/0045">
      <div ref={containerRef} className="max-w-4xl mx-auto space-y-5">
        {/* Header */}
        <div className="hist-section flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-base sm:text-xl font-semibold text-gray-900 tracking-[-0.025em]">Contribution History</h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">A complete record of your generous support</p>
          </div>
          <Link
            href="/portal/patron/contribute"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#008751] text-white font-medium rounded-lg text-[11px] sm:text-[12px] hover:bg-[#006d42] transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            New Contribution
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="hist-section grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Total Contributed', value: formatCurrency(totalContributed) },
            { label: 'Contributions', value: contributions.length.toString() },
            { label: 'This Year', value: formatCurrency(1000000) },
            { label: 'Avg. Contribution', value: formatCurrency(Math.round(totalContributed / contributions.length)) },
          ].map((stat, i) => (
            <div key={i} className={`group rounded-xl px-3 py-3 sm:px-4 sm:py-4 transition-all duration-200 ${i % 2 === 0 ? 'bg-[#008751]/3' : 'bg-gray-50/80'} hover:bg-[#008751]/6`}>
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold text-gray-300 uppercase tracking-widest">{stat.label}</p>
                <div className="w-1.5 h-1.5 rounded-full bg-[#008751]/30 group-hover:bg-[#008751] transition-colors duration-300" />
              </div>
              <p className="text-sm sm:text-base font-bold text-gray-900 tracking-[-0.02em] mt-1.5">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Contributions List */}
        <div className="hist-section bg-gray-50/80 rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 border-b border-gray-50 bg-gray-50/50">
            <span className="col-span-4 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Purpose</span>
            <span className="col-span-2 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Date</span>
            <span className="col-span-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Reference</span>
            <span className="col-span-1 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Status</span>
            <span className="col-span-2 text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-right">Amount</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-50">
            {contributions.map((item, idx) => (
              <div key={idx} className="hist-row sm:grid grid-cols-12 gap-4 px-5 py-4 hover:bg-gray-50/60 transition-colors duration-200">
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#008751]/6 flex items-center justify-center text-[#008751] shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1" /></svg>
                  </div>
                  <p className="text-gray-800 font-medium text-xs">{item.purpose}</p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-gray-400 text-[10px] sm:text-[11px]">{item.date}</p>
                </div>
                <div className="col-span-3 flex items-center">
                  <p className="text-gray-300 text-[11px] font-mono">{item.reference}</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#008751]/8 text-[#008751] text-[9px] font-semibold uppercase tracking-wider">
                    <div className="w-1 h-1 rounded-full bg-[#008751]" />
                    Done
                  </span>
                </div>
                <div className="col-span-2 flex items-center justify-end">
                  <p className="text-gray-900 font-bold text-xs">{formatCurrency(item.amount)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="hist-section text-center py-2">
          <p className="text-gray-300 text-[11px]">Showing all {contributions.length} contributions</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
