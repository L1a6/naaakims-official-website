'use client';

import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/portal/DashboardLayout';
import gsap from 'gsap';

const mockUser = {
  name: 'Dr. Fatima Abubakar',
  regNo: 'NAAKIMS/ALU/2018/0234',
};

const alumniMembers = [
  { id: 1, name: 'Dr. Abubakar Musa', year: '2018', chapter: 'University of Lagos', specialization: 'Cardiology', location: 'Lagos', isMentor: true },
  { id: 2, name: 'Dr. Chioma Eze', year: '2015', chapter: 'University of Nigeria', specialization: 'Pediatrics', location: 'Owerri', isMentor: true },
  { id: 3, name: 'Dr. Ibrahim Yusuf', year: '2020', chapter: 'ABU Zaria', specialization: 'Internal Medicine', location: 'Zaria', isMentor: false },
  { id: 4, name: 'Dr. Amina Bello', year: '2012', chapter: 'University of Ibadan', specialization: 'General Surgery', location: 'Ibadan', isMentor: true },
  { id: 5, name: 'Dr. Emmanuel Okonkwo', year: '2019', chapter: 'University of Benin', specialization: 'Family Medicine', location: 'Benin City', isMentor: false },
  { id: 6, name: 'Dr. Hadiza Mohammed', year: '2016', chapter: 'University of Uyo', specialization: 'OB/GYN', location: 'Abuja', isMentor: true },
];

const chapters = ['All Chapters', 'University of Lagos', 'University of Ibadan', 'ABU Zaria', 'University of Nigeria', 'University of Benin', 'University of Uyo'];

export default function AlumniDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('All Chapters');
  const [showMentorsOnly, setShowMentorsOnly] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.dir-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
      gsap.fromTo('.dir-filters', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.15, ease: 'power3.out' });
      gsap.fromTo('.dir-card', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, delay: 0.3, ease: 'power3.out' });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const filteredAlumni = alumniMembers.filter((alumni) => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChapter = selectedChapter === 'All Chapters' || alumni.chapter === selectedChapter;
    const matchesMentor = !showMentorsOnly || alumni.isMentor;
    return matchesSearch && matchesChapter && matchesMentor;
  });

  return (
    <DashboardLayout memberType="alumni" userName={mockUser.name} userRegNo={mockUser.regNo}>
      <div ref={pageRef} className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="dir-header">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Alumni Directory</h1>
          <p className="text-gray-400 text-sm mt-1">Connect with {alumniMembers.length} NAAKIMS alumni worldwide</p>
        </div>

        {/* Filters */}
        <div className="dir-filters flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or specialization..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all text-[14px]"
            />
          </div>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 text-[14px]"
          >
            {chapters.map((chapter) => (
              <option key={chapter} value={chapter}>{chapter}</option>
            ))}
          </select>
          <button
            onClick={() => setShowMentorsOnly(!showMentorsOnly)}
            className={`px-4 py-3 rounded-xl border text-[13px] font-semibold transition-all whitespace-nowrap ${
              showMentorsOnly
                ? 'bg-[#008751]/5 border-[#008751]/30 text-[#008751]'
                : 'border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300'
            }`}
          >
            Mentors Only
          </button>
        </div>

        <p className="text-gray-300 text-[13px]">{filteredAlumni.length} alumni found</p>

        {/* Alumni Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAlumni.map((alumni) => (
            <div key={alumni.id} className="dir-card bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-sm transition-all duration-200 group">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#008751]/8 flex items-center justify-center text-[#008751] font-bold shrink-0 text-lg">
                  {alumni.name.split(' ')[1].charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-gray-900 font-semibold text-[15px] truncate">{alumni.name}</h3>
                    {alumni.isMentor && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#008751]/8 text-[#008751] uppercase tracking-wide">Mentor</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-[13px]">{alumni.specialization}</p>
                </div>
              </div>
              <div className="space-y-1.5 text-[13px] text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13" /></svg>
                  {alumni.chapter} &apos;{alumni.year.slice(2)}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                  {alumni.location}
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <button className="flex-1 py-2 rounded-xl bg-[#008751]/8 text-[#008751] text-[13px] font-semibold hover:bg-[#008751]/12 transition-colors">
                  View Profile
                </button>
                <button className="px-3 py-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-12 h-12 mx-auto text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857" /></svg>
            <p className="text-gray-500 font-medium">No alumni found</p>
            <p className="text-gray-300 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
