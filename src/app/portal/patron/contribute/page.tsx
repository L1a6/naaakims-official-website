'use client';

import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/portal/DashboardLayout';
import gsap from 'gsap';

const contributionAreas = [
  { id: 'bursary', label: 'Student Bursary Fund', description: 'Directly support students with financial needs' },
  { id: 'events', label: 'Event Sponsorship', description: 'Fund dinner nights, conferences & outreach' },
  { id: 'health', label: 'Health Mission', description: 'Support community health outreach programs' },
  { id: 'infrastructure', label: 'Chapter Infrastructure', description: 'Build and equip chapter facilities' },
  { id: 'scholarships', label: 'Scholarship Fund', description: 'Full or partial scholarships for students' },
  { id: 'general', label: 'General Fund', description: 'Flexible contribution for NAAKIMS operations' },
];

const presetAmounts = [100000, 250000, 500000, 1000000, 2500000, 5000000];

const tierInfo = [
  { name: 'Bronze', min: 0, color: '#92400e' },
  { name: 'Silver', min: 500000, color: '#6b7280' },
  { name: 'Gold', min: 1000000, color: '#d97706' },
  { name: 'Platinum', min: 5000000, color: '#7c3aed' },
];

export default function PatronContributePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedArea, setSelectedArea] = useState('general');
  const [amount, setAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [dedicateTo, setDedicateTo] = useState('');

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
    <DashboardLayout memberType="patron" userName="Alhaji Suleiman Bello" userRegNo="NAAKIMS/PAT/2020/0045">
      <div ref={containerRef} className="max-w-3xl mx-auto space-y-5">
        {/* Header */}
        <div className="contrib-section">
          <h1 className="text-base sm:text-xl font-semibold text-gray-900 tracking-[-0.025em]">Make a Contribution</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">Your generosity powers NAAKIMS growth and student welfare</p>
        </div>

        {/* Impact Banner */}
        <div className="contrib-section relative overflow-hidden rounded-xl p-4 sm:p-5 bg-[#008751] text-white">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-x-12 -translate-y-12" />
          <div className="relative">
            <p className="text-white/60 text-[11px] font-semibold uppercase tracking-widest">Your Total Contributions</p>
            <p className="text-lg sm:text-xl font-bold mt-1 tracking-[-0.03em]">{formatCurrency(2500000)}</p>
            <div className="flex items-center gap-6 mt-4">
              {[{ value: '15', label: 'Students Supported' }, { value: '3', label: 'Events Sponsored' }, { value: '500+', label: 'Lives Impacted' }].map((stat, idx) => (
                <div key={idx}>
                  <p className="text-[18px] font-bold">{stat.value}</p>
                  <p className="text-[9px] font-semibold text-white/40 uppercase tracking-widest mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tier Progress */}
        <div className="contrib-section bg-gray-50/80 rounded-xl px-4 py-4 sm:px-5 sm:py-5">
          <h2 className="text-[11px] sm:text-[12px] font-semibold text-gray-900 mb-3">Tier Progress</h2>
          <div className="flex items-center gap-2 mb-2">
            {tierInfo.map((tier, i) => (
              <div key={i} className="flex-1">
                <div className={`h-1.5 rounded-full ${2500000 >= tier.min ? 'bg-[#008751]' : 'bg-gray-100'}`} />
                <p className="text-[9px] font-semibold mt-1.5 uppercase tracking-widest" style={{ color: 2500000 >= tier.min ? tier.color : '#d1d5db' }}>{tier.name}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-400 mt-2">You are currently at <span className="font-bold text-amber-600">Gold</span> tier. Contribute {formatCurrency(2500000)} more to reach Platinum.</p>
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

          <div className="relative mb-3">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">NGN</span>
            <input
              type="text"
              placeholder="Or enter custom amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl ring-1 ring-gray-200 text-xs sm:text-sm text-gray-900 placeholder:text-gray-300 focus:ring-[#008751] focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Dedication */}
          <div className="mb-3">
            <label className="text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 block uppercase tracking-wider">Dedicate this contribution (optional)</label>
            <input
              type="text"
              placeholder="e.g. In memory of Dr. Aminu Kano"
              value={dedicateTo}
              onChange={(e) => setDedicateTo(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl ring-1 ring-gray-200 text-xs sm:text-sm text-gray-900 placeholder:text-gray-300 focus:ring-[#008751] focus:outline-none transition-all duration-300"
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
      </div>
    </DashboardLayout>
  );
}
