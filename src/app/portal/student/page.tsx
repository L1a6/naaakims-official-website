'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DashboardLayout from '@/components/portal/DashboardLayout';
import gsap from 'gsap';

const mockUser = {
  name: 'Inyeneobong Godwin Inyang',
  regNo: 'NAAKIMS/STU/2024/0892',
  email: 'inyeneobong.inyang@student.uniuyo.edu.ng',
  chapter: 'University of Uyo',
  level: '400 Level',
  program: 'Medicine & Surgery',
  duesStatus: 'paid' as const,
  validUntil: 'Dec 2026',
  photoUrl: '',
  admissionYear: 2021,
  expectedGraduation: 2027,
  isMBYear: true,
};

const levels = ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level', '600 Level'];

const levelCourses: Record<string, { name: string; code: string }[]> = {
  '100 Level': [{ name: 'Introduction to Medicine', code: 'MED 101' }, { name: 'Biology', code: 'BIO 101' }, { name: 'Chemistry', code: 'CHM 101' }],
  '200 Level': [{ name: 'Anatomy', code: 'ANA 201' }, { name: 'Biochemistry', code: 'BCH 201' }, { name: 'Physiology', code: 'PHY 201' }],
  '300 Level': [{ name: 'Anatomy', code: 'ANA 301' }, { name: 'Biochemistry', code: 'BCH 301' }, { name: 'Physiology', code: 'PHY 301' }],
  '400 Level': [{ name: 'Pharmacology', code: 'PHA 401' }, { name: 'Pathology', code: 'PAT 401' }, { name: 'Medicine', code: 'MED 401' }],
  '500 Level': [{ name: 'Surgery', code: 'SUR 501' }, { name: 'Medicine', code: 'MED 501' }, { name: 'Paediatrics', code: 'PAE 501' }],
  '600 Level': [{ name: 'Obstetrics & Gynaecology', code: 'OBG 601' }, { name: 'Community Medicine', code: 'COM 601' }, { name: 'Psychiatry', code: 'PSY 601' }],
};

const resources = [
  { name: 'Clinical Rotation Guide 2026', type: 'PDF', size: '2.4 MB', category: 'Clinical' },
  { name: 'Anatomy Atlas - Upper Limb', type: 'PDF', size: '18 MB', category: 'Anatomy' },
  { name: 'Pharmacology Mnemonics', type: 'PDF', size: '1.1 MB', category: 'Pharmacology' },
];

export default function StudentDashboard() {
  const [selectedLevel, setSelectedLevel] = useState(mockUser.level);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentYear = new Date().getFullYear();
  const isEligibleForUpgrade = currentYear >= mockUser.expectedGraduation;
  const levelNum = parseInt(selectedLevel);
  const isMBYear = levelNum === 300;

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

  const courses = levelCourses[selectedLevel] || [];

  return (
    <DashboardLayout
      memberType="student"
      userName={mockUser.name}
      userRegNo={mockUser.regNo}
    >
      <div ref={containerRef} className="max-w-5xl mx-auto space-y-5">
        {/* Welcome Header */}
        <div className="dash-section flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#008751]/8 flex items-center justify-center shrink-0">
            {mockUser.photoUrl ? (
              <Image src={mockUser.photoUrl} alt={mockUser.name} fill className="object-cover rounded-full" />
            ) : (
              <span className="text-base sm:text-lg font-semibold text-[#008751]">{mockUser.name.charAt(0)}</span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-base sm:text-xl font-semibold text-gray-900 tracking-[-0.025em]">Welcome back, {mockUser.name.split(' ')[0]}</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">{mockUser.program} &middot; {mockUser.chapter}</p>
            <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
              {mockUser.duesStatus === 'paid' && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#008751]/8 text-[#008751] text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Active
                </span>
              )}
              <button 
                onClick={() => setShowLevelModal(true)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] sm:text-xs font-medium hover:bg-gray-200/70 transition-colors duration-200"
              >
                {selectedLevel}
                <svg className="w-2.5 h-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {isMBYear && (
                <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">MB Year</span>
              )}
            </div>
          </div>

          <Link
            href="/portal/student/profile"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
          >
            Edit Profile
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        {/* Stats - compact, mobile-first */}
        <div className="dash-section grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <div className="stat-item rounded-xl bg-emerald-50/50 px-3 py-3 sm:px-4 sm:py-4">
            <p className="text-[9px] sm:text-[10px] font-medium text-emerald-600/60 uppercase tracking-wider">Dues Status</p>
            <p className="text-xs sm:text-sm font-bold text-emerald-700 mt-0.5 sm:mt-1">Paid</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">2024/2025 Session</p>
          </div>
          <div className="stat-item rounded-xl bg-gray-50/80 px-3 py-3 sm:px-4 sm:py-4">
            <p className="text-[9px] sm:text-[10px] font-medium text-gray-500/60 uppercase tracking-wider">Chapter</p>
            <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 sm:mt-1 truncate">UniUyo</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">Uyo, Akwa Ibom</p>
          </div>
          <div className="stat-item rounded-xl bg-sky-50/40 px-3 py-3 sm:px-4 sm:py-4">
            <p className="text-[9px] sm:text-[10px] font-medium text-sky-600/50 uppercase tracking-wider">Current Level</p>
            <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 sm:mt-1">{selectedLevel.replace(' Level', '')}</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">Grad: {mockUser.expectedGraduation}</p>
          </div>
          <div className="stat-item rounded-xl bg-amber-50/40 px-3 py-3 sm:px-4 sm:py-4">
            <p className="text-[9px] sm:text-[10px] font-medium text-amber-600/50 uppercase tracking-wider">Next Event</p>
            <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 sm:mt-1">Mar 15</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5 truncate">Dinner &amp; Awards</p>
          </div>
        </div>

        {/* Courses for your level */}
        <div className="dash-section rounded-xl border border-gray-100/80 bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-gray-900">Your Courses</h2>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{selectedLevel} {isMBYear ? '(MB Year)' : ''} curriculum</p>
            </div>
            <Link href="/portal/student/resources" className="text-[10px] sm:text-xs font-medium text-[#008751] hover:text-[#006d42] transition-colors">Browse Materials</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {courses.map((course, idx) => {
              const courseAccents = [
                { border: 'border-l-[#008751]', dot: 'bg-[#008751]' },
                { border: 'border-l-indigo-500', dot: 'bg-indigo-500' },
                { border: 'border-l-amber-500', dot: 'bg-amber-500' },
              ];
              const c = courseAccents[idx % courseAccents.length];
              return (
              <Link
                key={idx}
                href={`/portal/student/resources?course=${encodeURIComponent(course.code)}`}
                className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-lg border-l-[3px] ${c.border} bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200`}
              >
                <div className={`w-2 h-2 rounded-full ${c.dot} shrink-0`} />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-800 truncate group-hover:text-gray-900 transition-colors">{course.name}</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400">{course.code}</p>
                </div>
              </Link>
              );
            })}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Quick Actions */}
            <div className="dash-section">
              <h2 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'View ID Card', desc: 'Digital membership card', href: '/portal/student/card', gradient: 'from-slate-700 to-slate-800', iconBg: 'bg-white/[0.12]', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg> },
                  { label: 'Pay Dues', desc: 'Session fee payment', href: '/portal/student/dues', gradient: 'from-[#008751] to-[#006d42]', iconBg: 'bg-white/[0.12]', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
                  { label: 'Bursary', desc: 'Financial aid application', href: '/portal/student/bursary', gradient: 'from-teal-700 to-teal-800', iconBg: 'bg-white/[0.12]', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
                  { label: 'Resources', desc: 'Study materials & guides', href: '/portal/student/resources', gradient: 'from-indigo-700 to-indigo-800', iconBg: 'bg-white/[0.12]', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
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

            {/* Upcoming Events */}
            <div className="dash-section rounded-xl bg-gray-50/70 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs sm:text-sm font-semibold text-gray-900">Upcoming Events</h2>
                <Link href="/events" className="text-[10px] sm:text-xs font-medium text-[#008751] hover:text-[#006d42] transition-colors duration-200">View all</Link>
              </div>
              <div className="space-y-1">
                {[
                  { name: 'NAAKIMS Dinner & Awards Night', date: 'Mar 15, 2026', location: 'Lagos', status: 'Registered' },
                  { name: 'Health Mission Outreach', date: 'Mar 22, 2026', location: 'Uyo', status: 'Open' },
                  { name: 'Medical Students Conference', date: 'Apr 5, 2026', location: 'Abuja', status: 'Open' },
                ].map((event, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 sm:gap-3 px-2.5 py-2.5 sm:px-3 sm:py-3 rounded-lg hover:bg-white/80 transition-colors duration-200">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#008751]/6 flex items-center justify-center text-[#008751] shrink-0">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{event.name}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{event.date} &middot; {event.location}</p>
                    </div>
                    <span className={`hidden sm:inline px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 uppercase tracking-wider ${event.status === 'Registered' ? 'bg-[#008751]/8 text-[#008751]' : 'bg-gray-200/60 text-gray-500'}`}>
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Resources */}
            <div className="dash-section rounded-xl bg-[#008751]/[0.03] p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs sm:text-sm font-semibold text-gray-900">Study Resources</h2>
                <Link href="/portal/student/resources" className="text-[10px] sm:text-xs font-medium text-[#008751] hover:text-[#006d42] transition-colors duration-200">View all</Link>
              </div>
              <div className="space-y-1">
                {resources.map((resource, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 sm:gap-3 px-2.5 py-2.5 sm:px-3 sm:py-3 rounded-lg hover:bg-white/60 transition-colors duration-200 group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/80 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{resource.name}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{resource.category} &middot; {resource.size}</p>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-white/80 text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider shrink-0">{resource.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Membership Card */}
            <div className="dash-section relative overflow-hidden rounded-xl p-4 sm:p-5 bg-[#008751] text-white">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Image src="/logo.png" alt="NAAKIMS" width={20} height={20} className="w-5 h-5 opacity-90" />
                  <span className="text-[10px] sm:text-xs font-medium text-white/60 uppercase tracking-wider">Student Member</span>
                </div>
                <p className="text-xs sm:text-sm font-mono font-bold tracking-wide">{mockUser.regNo}</p>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-medium text-white/40 uppercase tracking-wider">Valid until</p>
                    <p className="text-xs sm:text-sm font-semibold mt-0.5">{mockUser.validUntil}</p>
                  </div>
                  <Link 
                    href="/portal/student/card"
                    className="px-2.5 py-1.5 bg-white/10 hover:bg-white/15 rounded-md text-[10px] sm:text-xs font-medium transition-colors duration-200"
                  >
                    View Card
                  </Link>
                </div>
              </div>
            </div>

            {/* Academic Progress */}
            <div className="dash-section rounded-xl bg-gray-50/70 p-4 sm:p-5">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3">Academic Progress</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[10px] sm:text-xs mb-1.5">
                    <span className="text-gray-500 font-medium">Program Completion</span>
                    <span className="text-gray-900 font-semibold">{Math.round(((currentYear - mockUser.admissionYear) / (mockUser.expectedGraduation - mockUser.admissionYear)) * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 sm:h-2 rounded-full bg-gray-200/60 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-[#008751] transition-all duration-500"
                      style={{ width: `${Math.min(Math.round(((currentYear - mockUser.admissionYear) / (mockUser.expectedGraduation - mockUser.admissionYear)) * 100), 100)}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="rounded-lg bg-white/80 px-2.5 py-2">
                    <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium uppercase tracking-wider">Admitted</p>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-0.5">{mockUser.admissionYear}</p>
                  </div>
                  <div className="rounded-lg bg-white/80 px-2.5 py-2">
                    <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium uppercase tracking-wider">Graduating</p>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-0.5">{mockUser.expectedGraduation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bursary Quick Access */}
            <div className="dash-section rounded-xl bg-blue-50/60 p-4 sm:p-5">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100/80 flex items-center justify-center text-blue-600 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Bursary Application</h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 leading-relaxed">Verify your academic details and apply for financial support.</p>
                  <Link href="/portal/student/bursary" className="mt-2 inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    Apply Now
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Upgrade to Alumni */}
            {isEligibleForUpgrade && (
              <div className="dash-section rounded-xl bg-[#008751]/[0.04] p-4 sm:p-5">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#008751]/8 flex items-center justify-center text-[#008751] shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Upgrade to Alumni</h3>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">You&apos;re eligible to upgrade your membership status.</p>
                    <button className="mt-2 px-3 py-1.5 bg-[#008751] text-white text-[10px] sm:text-xs font-medium rounded-lg hover:bg-[#006d42] transition-colors duration-200">
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="dash-section rounded-xl bg-white/60 p-4 sm:p-5">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3">Recent Activity</h3>
              <div className="space-y-2.5">
                {[
                  { text: 'New resource: Clinical Rotation Guide 2026', time: '2 hours ago', color: '#008751' },
                  { text: 'Event reminder: Dinner Night in 2 weeks', time: '1 day ago', color: '#6366f1' },
                  { text: 'Dues payment confirmed for 2024/2025', time: '3 days ago', color: '#008751' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: item.color }} />
                    <div>
                      <p className="text-[11px] sm:text-sm text-gray-600 leading-relaxed">{item.text}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Level Selection Modal */}
      {showLevelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-5 sm:p-6 w-full max-w-sm">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 tracking-[-0.01em]">Select Your Level</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 mb-4">Update your current academic level</p>
            <div className="space-y-1">
              {levels.map((level) => {
                const lvlNum = parseInt(level);
                const isMB = lvlNum === 300;
                return (
                  <button
                    key={level}
                    onClick={() => { setSelectedLevel(level); setShowLevelModal(false); }}
                    className={`w-full p-3 rounded-lg text-left text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center justify-between ${
                      selectedLevel === level 
                        ? 'bg-[#008751] text-white' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{level}</span>
                    {isMB && <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${selectedLevel === level ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-600'}`}>MB Year</span>}
                  </button>
                );
              })}
            </div>
            <button 
              onClick={() => setShowLevelModal(false)}
              className="w-full mt-3 py-2 text-gray-400 text-xs sm:text-sm font-medium hover:text-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
