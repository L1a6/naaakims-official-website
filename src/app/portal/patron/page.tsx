'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DashboardLayout from '@/components/portal/DashboardLayout';
import gsap from 'gsap';

const mockUser = {
  name: 'Alhaji Suleiman Bello',
  regNo: 'NAAKIMS/PAT/2020/0045',
  email: 'suleiman.bello@business.ng',
  tier: 'Gold',
  company: 'Bello Holdings Ltd',
  location: 'Abuja, Nigeria',
  totalContributions: 2500000,
  membershipType: 'Lifetime',
  photoUrl: '',
  memberSince: 2020,
};

const tierConfig = {
  Bronze: { color: 'bg-amber-700', min: 0 },
  Silver: { color: 'bg-gray-400', min: 500000 },
  Gold: { color: 'bg-amber-500', min: 1000000 },
  Platinum: { color: 'bg-purple-400', min: 5000000 },
};

const recentContributions = [
  { purpose: 'Student Bursary Fund', amount: 500000, date: 'Feb 2026' },
  { purpose: 'Dinner Night Sponsorship', amount: 300000, date: 'Jan 2026' },
  { purpose: 'Health Mission', amount: 200000, date: 'Dec 2025' },
];

export default function PatronDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.dash-section',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out', delay: 0.05 }
      );
      gsap.fromTo('.stat-item',
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.2 }
      );
      gsap.fromTo('.impact-num',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', delay: 0.25 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <DashboardLayout
      memberType="patron"
      userName={mockUser.name}
      userRegNo={mockUser.regNo}
    >
      <div ref={containerRef} className="max-w-5xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="dash-section flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative w-12 h-12 rounded-full bg-[#008751]/8 flex items-center justify-center shrink-0">
            {mockUser.photoUrl ? (
              <Image src={mockUser.photoUrl} alt={mockUser.name} fill className="object-cover rounded-full" />
            ) : (
              <span className="text-lg font-semibold text-[#008751]">{mockUser.name.charAt(0)}</span>
            )}
            <div className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 ${tierConfig[mockUser.tier as keyof typeof tierConfig].color} rounded-full flex items-center justify-center`}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-[-0.025em]">{mockUser.name}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{mockUser.company} &middot; {mockUser.location}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold text-white ${tierConfig[mockUser.tier as keyof typeof tierConfig].color}`}>
                {mockUser.tier} Patron
              </span>
              <span className="text-xs text-gray-400">Since {mockUser.memberSince}</span>
            </div>
          </div>

          <Link
            href="/portal/patron/contribute"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#008751] text-white font-medium rounded-lg text-sm hover:bg-[#006d42] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Contribute
          </Link>
        </div>

        {/* Total Contributions Banner */}
        <div className="dash-section relative overflow-hidden rounded-xl p-6 bg-[#008751] text-white">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-white/50 uppercase tracking-wider">Total Contributions</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 tracking-[-0.03em]">{formatCurrency(mockUser.totalContributions)}</p>
            </div>
            <div className="flex gap-6 sm:gap-8">
              {[
                { value: '15', label: 'Students Supported' },
                { value: '3', label: 'Events Sponsored' },
                { value: '500+', label: 'Lives Impacted' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="impact-num text-xl font-bold">{stat.value}</p>
                  <p className="text-[10px] font-medium text-white/40 uppercase tracking-wider mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="dash-section grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <div className="stat-item rounded-xl bg-amber-50/50 px-3 py-3 sm:px-4 sm:py-4">
            <p className="text-[9px] sm:text-[10px] font-medium text-amber-600/60 uppercase tracking-wider">Tier Level</p>
            <p className="text-xs sm:text-sm font-bold text-amber-700 mt-0.5 sm:mt-1">{mockUser.tier}</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">Next: Platinum at 5M</p>
          </div>
          <div className="stat-item rounded-xl bg-gray-50/80 px-3 py-3 sm:px-4 sm:py-4">
            <p className="text-[9px] sm:text-[10px] font-medium text-gray-500/60 uppercase tracking-wider">Membership</p>
            <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 sm:mt-1">{mockUser.membershipType}</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">Since {mockUser.memberSince}</p>
          </div>
          <div className="stat-item rounded-xl bg-emerald-50/40 px-3 py-3 sm:px-4 sm:py-4">
            <p className="text-[9px] sm:text-[10px] font-medium text-emerald-600/50 uppercase tracking-wider">This Year</p>
            <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 sm:mt-1">{formatCurrency(800000)}</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">3 contributions</p>
          </div>
          <div className="stat-item rounded-xl bg-rose-50/40 px-3 py-3 sm:px-4 sm:py-4">
            <p className="text-[9px] sm:text-[10px] font-medium text-rose-600/50 uppercase tracking-wider">Next Event</p>
            <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 sm:mt-1">Mar 15</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5 truncate">Dinner &amp; Awards</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="dash-section">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'View ID Card', desc: 'Digital patron card', href: '/portal/patron/card', gradient: 'from-slate-700 to-slate-800', iconBg: 'bg-white/[0.12]', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg> },
                  { label: 'Impact Report', desc: 'See your contribution impact', href: '/portal/patron/impact', gradient: 'from-[#008751] to-[#006d42]', iconBg: 'bg-white/[0.12]', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
                  { label: 'Edit Profile', desc: 'Update your details', href: '/portal/patron/profile', gradient: 'from-teal-700 to-teal-800', iconBg: 'bg-white/[0.12]', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
                  { label: 'Contribute', desc: 'Support students & events', href: '/portal/patron/contribute', gradient: 'from-indigo-700 to-indigo-800', iconBg: 'bg-white/[0.12]', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className={`group relative overflow-hidden rounded-xl bg-linear-to-br ${action.gradient} p-4 sm:p-5 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/[0.07] -translate-y-6 translate-x-6 sm:-translate-y-8 sm:translate-x-8" />
                    <div className="absolute bottom-0 left-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/[0.05] translate-y-6 -translate-x-4 sm:translate-y-8 sm:-translate-x-6" />
                    <div className="relative">
                      <span className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${action.iconBg} mb-3`}>
                        {action.icon}
                      </span>
                      <p className="text-xs sm:text-sm font-bold leading-tight">{action.label}</p>
                      <p className="text-[10px] sm:text-[11px] text-white/60 mt-0.5 leading-snug">{action.desc}</p>
                    </div>
                    <svg className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-4 h-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Contributions */}
            <div className="dash-section rounded-xl bg-[#008751]/[0.03] p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900">Recent Contributions</h2>
                <Link href="/portal/patron/history" className="text-xs font-medium text-[#008751] hover:text-[#006d42] transition-colors duration-200">View All</Link>
              </div>
              <div className="space-y-1">
                {recentContributions.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/60 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg bg-[#008751]/8 flex items-center justify-center text-[#008751] shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{item.purpose}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 shrink-0">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Patron Card */}
            <div className="dash-section relative overflow-hidden rounded-xl p-5 bg-gray-900 text-white">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Image src="/logo.png" alt="NAAKIMS" width={24} height={24} className="w-6 h-6 opacity-90" />
                  <span className="text-xs font-medium text-white/50 uppercase tracking-wider">NAAKIMS Patron</span>
                </div>
                <p className="text-sm font-mono font-bold tracking-wide">{mockUser.regNo}</p>
                <div className="mt-4 pt-3.5 border-t border-white/8 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-medium text-white/30 uppercase tracking-wider">Tier</p>
                    <p className="text-sm font-bold mt-0.5">{mockUser.tier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-medium text-white/30 uppercase tracking-wider">Membership</p>
                    <p className="text-sm font-semibold mt-0.5">{mockUser.membershipType}</p>
                  </div>
                </div>
                <Link 
                  href="/portal/patron/card"
                  className="mt-4 block w-full py-2 bg-white/8 hover:bg-white/12 rounded-md text-center text-xs font-medium transition-colors duration-200"
                >
                  View Full Card
                </Link>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="dash-section rounded-xl bg-gray-50/70 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Upcoming Events</h3>
              <div className="space-y-1">
                {[
                  { name: 'Dinner & Awards Night', date: 'Mar 15, 2026', note: 'VIP Table Reserved', featured: true },
                  { name: 'Patrons Appreciation Dinner', date: 'Apr 20, 2026', note: 'Abuja', featured: false },
                ].map((event, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/80 transition-colors duration-200">
                    <div className={`w-10 h-10 rounded-lg ${event.featured ? 'bg-[#008751]/6 text-[#008751]' : 'bg-gray-200/50 text-gray-400'} flex items-center justify-center shrink-0`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{event.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{event.date} &middot; {event.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="dash-section rounded-xl bg-white/60 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { text: 'Thank you for your recent contribution', time: '2 hours ago', color: '#008751' },
                  { text: 'VIP invitation: Dinner Night 2026', time: '1 day ago', color: '#6366f1' },
                  { text: 'Gold tier benefits unlocked', time: '1 week ago', color: '#f59e0b' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: item.color }} />
                    <div>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Contribute Button */}
        <div className="sm:hidden">
          <Link
            href="/portal/patron/contribute"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#008751] text-white font-medium rounded-lg text-sm hover:bg-[#006d42] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Make a Contribution
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
