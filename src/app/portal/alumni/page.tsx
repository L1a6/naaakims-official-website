'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DashboardLayout from '@/components/portal/DashboardLayout';
import gsap from 'gsap';

const mockUser = {
  name: 'Dr. Fatima Abubakar',
  regNo: 'NAAKIMS/ALU/2018/0234',
  email: 'fatima.abubakar@hospital.ng',
  chapter: 'University of Uyo',
  graduationYear: '2018',
  specialization: 'Internal Medicine',
  hospital: 'Lagos University Teaching Hospital',
  location: 'Lagos, Nigeria',
  membershipType: 'Lifetime',
  photoUrl: '',
};

const mentees = [
  { name: 'Adeola Okonkwo', level: '400 Level', chapter: 'University of Ibadan', status: 'active' },
  { name: 'Emmanuel Udo', level: '300 Level', chapter: 'University of Lagos', status: 'active' },
];

export default function AlumniDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

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
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const yearsAlumni = new Date().getFullYear() - parseInt(mockUser.graduationYear);

  return (
    <DashboardLayout
      memberType="alumni"
      userName={mockUser.name}
      userRegNo={mockUser.regNo}
    >
      <div ref={containerRef} className="max-w-5xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="dash-section flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#008751]/8 flex items-center justify-center shrink-0">
            {mockUser.photoUrl ? (
              <Image src={mockUser.photoUrl} alt={mockUser.name} fill className="object-cover rounded-full" />
            ) : (
              <span className="text-lg font-semibold text-[#008751]">{mockUser.name.split(' ')[1]?.charAt(0) || 'A'}</span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-[-0.025em]">Welcome, {mockUser.name}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{mockUser.specialization} &middot; Class of {mockUser.graduationYear}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#008751]/8 text-[#008751] text-[10px] font-semibold uppercase tracking-wider">
                Alumni
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                {mockUser.hospital}
              </span>
            </div>
          </div>

          <Link
            href="/portal/alumni/profile"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
          >
            Edit Profile
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        {/* Mobile Edit Profile Link */}
        <Link
          href="/portal/alumni/profile"
          className="dash-section sm:hidden flex items-center justify-between px-3 py-2.5 rounded-xl bg-gray-50 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
        >
          <span>Edit Profile</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
        </Link>

        {/* Stats */}
        <div className="dash-section grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <div className="stat-item rounded-xl bg-indigo-50/50 px-3 py-3 sm:px-4 sm:py-4">
            <p className="text-[9px] sm:text-[10px] font-medium text-indigo-600/60 uppercase tracking-wider">Years Alumni</p>
            <p className="text-xs sm:text-sm font-bold text-indigo-700 mt-0.5 sm:mt-1">{yearsAlumni} yrs</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">Class of {mockUser.graduationYear}</p>
          </div>
          <div className="stat-item rounded-xl bg-gray-50/80 px-3 py-3 sm:px-4 sm:py-4">
            <p className="text-[9px] sm:text-[10px] font-medium text-gray-500/60 uppercase tracking-wider">Specialization</p>
            <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 sm:mt-1 truncate">Internal Med</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5 truncate">{mockUser.hospital}</p>
          </div>
          <div className="stat-item rounded-xl bg-emerald-50/40 px-3 py-3 sm:px-4 sm:py-4">
            <p className="text-[9px] sm:text-[10px] font-medium text-emerald-600/50 uppercase tracking-wider">Active Mentees</p>
            <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 sm:mt-1">{mentees.length}</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">Students mentored</p>
          </div>
          <div className="stat-item rounded-xl bg-amber-50/40 px-3 py-3 sm:px-4 sm:py-4">
            <p className="text-[9px] sm:text-[10px] font-medium text-amber-600/50 uppercase tracking-wider">Next Event</p>
            <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 sm:mt-1">Mar 15</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5 truncate">Dinner &amp; Awards Night</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <div className="dash-section">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h2>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                {[
                  { label: 'View ID Card', desc: 'Digital alumni card', href: '/portal/alumni/card', gradient: 'from-slate-700 to-slate-800', iconBg: 'bg-white/[0.12]', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg> },
                  { label: 'Directory', desc: 'Find alumni members', href: '/portal/alumni/directory', gradient: 'from-[#008751] to-[#006d42]', iconBg: 'bg-white/[0.12]', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
                  { label: 'Edit Profile', desc: 'Update your details', href: '/portal/alumni/profile', gradient: 'from-teal-700 to-teal-800', iconBg: 'bg-white/[0.12]', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
                  { label: 'Contribute', desc: 'Support students & chapters', href: '/portal/alumni/contribute', gradient: 'from-indigo-700 to-indigo-800', iconBg: 'bg-white/[0.12]', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
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

            {/* Mentees */}
            <div className="dash-section rounded-xl bg-[#008751]/[0.03] p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900">Your Mentees</h2>
                <button className="text-xs font-medium text-[#008751] hover:text-[#006d42] transition-colors duration-200">Add Mentee</button>
              </div>
              {mentees.length > 0 ? (
                <div className="space-y-1">
                  {mentees.map((mentee, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/60 transition-colors duration-200">
                      <div className="w-9 h-9 rounded-lg bg-[#008751]/8 flex items-center justify-center text-[#008751] font-semibold text-xs shrink-0">
                        {mentee.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800">{mentee.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{mentee.level} &middot; {mentee.chapter}</p>
                      </div>
                      <button className="px-2.5 py-1 text-[10px] font-semibold text-[#008751] hover:bg-[#008751]/6 rounded-md transition-colors duration-200 uppercase tracking-wider">
                        Message
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-400">No mentees yet</p>
                  <button className="mt-2 text-xs text-[#008751] font-medium hover:text-[#006d42]">Find students to mentor</button>
                </div>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="dash-section rounded-xl bg-gray-50/70 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900">Upcoming Events</h2>
                <Link href="/events" className="text-xs font-medium text-[#008751] hover:text-[#006d42] transition-colors duration-200">View all</Link>
              </div>
              <div className="space-y-1">
                {[
                  { name: 'NAAKIMS Dinner & Awards Night', date: 'Mar 15, 2026', location: 'Lagos', status: 'Registered' },
                  { name: 'Alumni Networking Mixer', date: 'Apr 3, 2026', location: 'Abuja', status: 'Open' },
                  { name: 'Health Mission Outreach', date: 'Apr 22, 2026', location: 'Uyo', status: 'Open' },
                ].map((event, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/80 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg bg-[#008751]/6 flex items-center justify-center text-[#008751] shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{event.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{event.date} &middot; {event.location}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 uppercase tracking-wider ${event.status === 'Registered' ? 'bg-[#008751]/8 text-[#008751]' : 'bg-gray-200/60 text-gray-500'}`}>
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Membership Card */}
            <div className="dash-section relative overflow-hidden rounded-xl p-5 bg-[#008751] text-white">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Image src="/logo.png" alt="NAAKIMS" width={24} height={24} className="w-6 h-6 opacity-90" />
                  <span className="text-xs font-medium text-white/60 uppercase tracking-wider">Alumni Member</span>
                </div>
                <p className="text-sm font-mono font-bold tracking-wide">{mockUser.regNo}</p>
                <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Membership</p>
                    <p className="text-sm font-semibold mt-0.5">{mockUser.membershipType}</p>
                  </div>
                  <Link 
                    href="/portal/alumni/card"
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-md text-xs font-medium transition-colors duration-200"
                  >
                    View Card
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="dash-section rounded-xl bg-white/60 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { text: 'Mentee Adeola requested a session', time: '2 hours ago', color: '#008751' },
                  { text: 'Alumni dinner event next month', time: '1 day ago', color: '#6366f1' },
                  { text: 'New mentee matched: Emmanuel Udo', time: '3 days ago', color: '#008751' },
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

            {/* Contribute CTA */}
            <div className="dash-section rounded-xl bg-[#008751]/[0.04] p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5">Support Students</h3>
              <p className="text-xs text-gray-400 mb-3.5 leading-relaxed">Help fund student bursaries and chapter activities.</p>
              <Link
                href="/portal/alumni/contribute"
                className="block w-full py-2.5 bg-[#008751] hover:bg-[#006d42] text-white rounded-lg text-center text-sm font-medium transition-colors duration-200"
              >
                Make a Contribution
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
