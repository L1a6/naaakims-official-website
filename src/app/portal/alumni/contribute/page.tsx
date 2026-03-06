'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/portal/DashboardLayout';
import gsap from 'gsap';

const contributionAreas = [
  { id: 'bursary', label: 'Student Bursary Fund', description: 'Support students with financial needs' },
  { id: 'events', label: 'Event Sponsorship', description: 'Fund chapter events and conferences' },
  { id: 'health', label: 'Health Mission', description: 'Support community health outreach programs' },
  { id: 'general', label: 'General Fund', description: 'Flexible contribution for NAAKIMS operations' },
];

const presetAmounts = [5000, 10000, 25000, 50000, 100000, 250000];

export default function AlumniContributePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedArea, setSelectedArea] = useState('general');
  const [amount, setAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contrib-section',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  return (
    <DashboardLayout memberType="alumni" userName="Dr. Fatima Abubakar" userRegNo="NAAKIMS/ALU/2018/0234">
      <div ref={containerRef} className="max-w-3xl mx-auto space-y-5">
        {/* Header */}
        <div className="contrib-section">
          <h1 className="text-base sm:text-xl font-semibold text-gray-900 tracking-[-0.025em]">Make a Contribution</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">Support NAAKIMS initiatives and help fellow members</p>
        </div>

        {/* Impact Banner */}
        <div className="contrib-section relative overflow-hidden rounded-xl p-4 sm:p-5 bg-[#008751] text-white">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl translate-x-10 -translate-y-10" />
          <div className="relative flex items-center gap-6">
            <div className="flex-1">
              <p className="text-white/60 text-[11px] font-semibold uppercase tracking-widest">Your contributions help</p>
              <p className="text-sm sm:text-base font-bold mt-1">Fund student bursaries, sponsor events, and support health missions</p>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              {[{ value: '200+', label: 'Students Helped' }, { value: '15', label: 'Chapters' }].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-[22px] font-bold">{stat.value}</p>
                  <p className="text-[9px] font-semibold text-white/40 uppercase tracking-widest mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contribution Form */}
        <div className="contrib-section bg-[#008751]/3 rounded-xl px-4 py-4 sm:px-5 sm:py-5">
          <h2 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3">Select Contribution Area</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {contributionAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`text-left p-3 rounded-xl ring-1 transition-all duration-300 ${
                  selectedArea === area.id
                    ? 'ring-[#008751] bg-[#008751]/6'
                    : 'ring-gray-200 hover:ring-gray-300 hover:bg-gray-50/80'
                }`}
              >
                <p className={`text-xs font-semibold ${selectedArea === area.id ? 'text-[#008751]' : 'text-gray-900'}`}>{area.label}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{area.description}</p>
              </button>
            ))}
          </div>

          <h2 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3">Select Amount</h2>
          <div className="grid grid-cols-3 gap-2.5 mb-3">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset.toString())}
                className={`py-2.5 rounded-xl text-[11px] sm:text-[12px] font-semibold ring-1 transition-all duration-300 ${
                  amount === preset.toString()
                    ? 'ring-[#008751] bg-[#008751]/6 text-[#008751]'
                    : 'ring-gray-200 text-gray-600 hover:ring-gray-300 hover:bg-gray-50'
                }`}
              >
                {formatCurrency(preset)}
              </button>
            ))}
          </div>

          <div className="relative mb-4">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">NGN</span>
            <input
              type="text"
              placeholder="Or enter custom amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl ring-1 ring-gray-200 text-xs sm:text-sm text-gray-900 placeholder:text-gray-300 focus:ring-[#008751] focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Recurring toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/80 mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-900">Make it monthly</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Auto-contribute every month</p>
            </div>
            <button
              onClick={() => setIsRecurring(!isRecurring)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${isRecurring ? 'bg-[#008751]' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${isRecurring ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
            </button>
          </div>

          <button
            disabled={!amount}
            className="w-full py-3 bg-[#008751] text-white rounded-lg text-[11px] sm:text-[12px] font-semibold hover:bg-[#006d42] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {amount ? `Contribute ${formatCurrency(Number(amount))}` : 'Enter an amount to continue'}
            {amount && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>}
          </button>
        </div>

        {/* Previous Contributions */}
        <div className="contrib-section bg-gray-50/80 rounded-xl px-4 py-4 sm:px-5 sm:py-5">
          <h2 className="text-[11px] sm:text-[12px] font-semibold text-gray-900 mb-3">Your Contribution History</h2>
          <div className="space-y-2">
            {[
              { purpose: 'Student Bursary Fund', amount: 25000, date: 'Feb 2026' },
              { purpose: 'Health Mission', amount: 10000, date: 'Jan 2026' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3.5 p-3.5 rounded-xl hover:bg-gray-50/80 transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#008751]/6 flex items-center justify-center text-[#008751] shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium text-xs">{item.purpose}</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">{item.date}</p>
                </div>
                <span className="text-gray-900 font-bold text-xs shrink-0">{formatCurrency(item.amount)}</span>
              </div>
            ))}
          </div>
          <Link href="/portal/alumni" className="mt-3 block text-center text-[11px] text-[#008751] font-semibold hover:underline underline-offset-2">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
