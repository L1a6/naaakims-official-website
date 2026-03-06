'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/portal/DashboardLayout';
import gsap from 'gsap';

const mockUser = {
  name: 'Inyeneobong Godwin Inyang',
  regNo: 'NAAKIMS/STU/2024/0892',
  level: '400',
};

type Course = { name: string; code: string; color: string };
type LevelConfig = { courses: Course[]; note?: string };

const levelCourses: Record<string, LevelConfig> = {
  '100': {
    courses: [
      { name: 'Introduction to Medicine', code: 'MED 101', color: '#008751' },
      { name: 'Biology', code: 'BIO 101', color: '#6366f1' },
      { name: 'Chemistry', code: 'CHM 101', color: '#d97706' },
      { name: 'Physics', code: 'PHY 101', color: '#dc2626' },
    ],
  },
  '200': {
    courses: [
      { name: 'Anatomy', code: 'ANA 201', color: '#008751' },
      { name: 'Biochemistry', code: 'BCH 201', color: '#7c3aed' },
      { name: 'Physiology', code: 'PHY 201', color: '#0891b2' },
    ],
  },
  '300': {
    note: 'MB Year - Pre-clinical consolidation',
    courses: [
      { name: 'Anatomy', code: 'ANA 301', color: '#008751' },
      { name: 'Biochemistry', code: 'BCH 301', color: '#7c3aed' },
      { name: 'Physiology', code: 'PHY 301', color: '#0891b2' },
    ],
  },
  '400': {
    courses: [
      { name: 'Pharmacology', code: 'PHA 401', color: '#dc2626' },
      { name: 'Pathology', code: 'PAT 401', color: '#d97706' },
      { name: 'Medicine', code: 'MED 401', color: '#008751' },
      { name: 'Microbiology', code: 'MIC 401', color: '#6366f1' },
    ],
  },
  '500': {
    courses: [
      { name: 'Surgery', code: 'SUR 501', color: '#dc2626' },
      { name: 'Medicine', code: 'MED 501', color: '#008751' },
      { name: 'Paediatrics', code: 'PAE 501', color: '#0891b2' },
      { name: 'Obstetrics & Gynaecology', code: 'OBG 501', color: '#d97706' },
    ],
  },
  '600': {
    courses: [
      { name: 'Community Medicine', code: 'COM 601', color: '#008751' },
      { name: 'Psychiatry', code: 'PSY 601', color: '#7c3aed' },
      { name: 'Ophthalmology', code: 'OPH 601', color: '#0891b2' },
      { name: 'ENT', code: 'ENT 601', color: '#d97706' },
    ],
  },
};

const allResources = [
  // 100 Level
  { id: 1, title: 'Introduction to Medical Sciences', course: 'MED 101', level: '100', category: 'Lecture Notes', downloads: 510, size: '5.2 MB' },
  { id: 2, title: 'Biology for Medical Students', course: 'BIO 101', level: '100', category: 'Textbooks', downloads: 312, size: '6.5 MB' },
  // 200 Level
  { id: 3, title: 'Anatomy - Upper Limb Lecture Notes', course: 'ANA 201', level: '200', category: 'Lecture Notes', downloads: 234, size: '4.2 MB' },
  { id: 4, title: 'Gross Anatomy Atlas - Lower Limb', course: 'ANA 201', level: '200', category: 'Textbooks', downloads: 198, size: '18.7 MB' },
  { id: 5, title: 'Biochemistry Study Guide', course: 'BCH 201', level: '200', category: 'Lecture Notes', downloads: 312, size: '6.5 MB' },
  { id: 6, title: 'Physiology Past Questions (2020-2024)', course: 'PHY 201', level: '200', category: 'Past Questions', downloads: 567, size: '2.8 MB' },
  { id: 7, title: 'Medical Physiology MCQs', course: 'PHY 201', level: '200', category: 'Past Questions', downloads: 645, size: '1.9 MB' },
  { id: 8, title: 'Histology Lab Manual', course: 'ANA 201', level: '200', category: 'Clinical Guides', downloads: 276, size: '9.4 MB' },
  // 300 Level (MB)
  { id: 9, title: 'Anatomy MB Past Questions', course: 'ANA 301', level: '300', category: 'Past Questions', downloads: 890, size: '3.1 MB' },
  { id: 10, title: 'Physiology MB Prep Guide', course: 'PHY 301', level: '300', category: 'Lecture Notes', downloads: 723, size: '4.8 MB' },
  { id: 11, title: 'Biochemistry MB Revision', course: 'BCH 301', level: '300', category: 'Past Questions', downloads: 678, size: '2.5 MB' },
  // 400 Level
  { id: 12, title: 'Pharmacology Past Questions', course: 'PHA 401', level: '400', category: 'Past Questions', downloads: 423, size: '3.1 MB' },
  { id: 13, title: 'Pathology Lecture Summaries', course: 'PAT 401', level: '400', category: 'Lecture Notes', downloads: 345, size: '5.7 MB' },
  { id: 14, title: 'Clinical Medicine Handbook', course: 'MED 401', level: '400', category: 'Clinical Guides', downloads: 189, size: '12.1 MB' },
  // 500 Level
  { id: 15, title: 'Surgery Rotation Notes', course: 'SUR 501', level: '500', category: 'Clinical Guides', downloads: 145, size: '8.3 MB' },
  { id: 16, title: 'Paediatrics Revision Guide', course: 'PAE 501', level: '500', category: 'Lecture Notes', downloads: 267, size: '4.1 MB' },
  // 600 Level
  { id: 17, title: 'Community Medicine Fieldwork Guide', course: 'COM 601', level: '600', category: 'Clinical Guides', downloads: 120, size: '6.8 MB' },
  { id: 18, title: 'Psychiatry Case Studies', course: 'PSY 601', level: '600', category: 'Lecture Notes', downloads: 98, size: '3.4 MB' },
];

const categories = ['All', 'Lecture Notes', 'Past Questions', 'Textbooks', 'Clinical Guides'];
const levels = ['100', '200', '300', '400', '500', '600'];

export default function ResourcesContent() {
  const searchParams = useSearchParams();
  const initialCourse = searchParams.get('course') || '';
  
  const [selectedLevel, setSelectedLevel] = useState(mockUser.level);
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialCourse) {
      const res = allResources.find(r => r.course === initialCourse);
      if (res) setSelectedLevel(res.level);
      setSelectedCourse(initialCourse);
    }
  }, [initialCourse]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.res-section',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out', delay: 0.05 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const currentLevelConfig = levelCourses[selectedLevel];
  const isMBYear = selectedLevel === '300';

  const filteredResources = allResources.filter((r) => {
    const matchesLevel = r.level === selectedLevel;
    const matchesCourse = !selectedCourse || r.course === selectedCourse;
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesCourse && matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout memberType="student" userName={mockUser.name} userRegNo={mockUser.regNo}>
      <div ref={containerRef} className="max-w-5xl mx-auto space-y-5">
        {/* Header */}
        <div className="res-section">
          <h1 className="text-base sm:text-xl font-semibold text-gray-900 tracking-[-0.025em]">Academic Resources</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Browse materials by level and course</p>
        </div>

        {/* Level Selector */}
        <div className="res-section flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 sm:pb-0 shrink-0">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => { setSelectedLevel(level); setSelectedCourse(''); }}
                className={`px-3 py-2 rounded-lg text-[11px] sm:text-[12px] font-semibold transition-all duration-200 whitespace-nowrap ${
                  selectedLevel === level
                    ? 'bg-[#008751] text-white'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                } ${level === '300' ? 'relative' : ''}`}
              >
                {level}L
                {level === '300' && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* MB Year Banner */}
        {isMBYear && (
          <div className="res-section rounded-xl bg-amber-50/80 px-4 py-3 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-800">MB Year</p>
              <p className="text-[10px] sm:text-[11px] text-amber-600 mt-0.5">Pre-clinical consolidation year. Focus on Anatomy, Biochemistry &amp; Physiology MB exams.</p>
            </div>
          </div>
        )}

        {/* Course Cards */}
        <div className="res-section">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
            {selectedLevel} Level Courses {currentLevelConfig?.note ? `- ${currentLevelConfig.note}` : ''}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {currentLevelConfig?.courses.map((course) => {
              const count = allResources.filter(r => r.course === course.code).length;
              const isActive = selectedCourse === course.code;
              return (
                <button
                  key={course.code}
                  onClick={() => setSelectedCourse(isActive ? '' : course.code)}
                  className={`group text-left px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive ? 'bg-gray-900 text-white' : 'bg-gray-50/80 hover:bg-gray-100/80 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: isActive ? '#fff' : course.color }} />
                    <span className={`text-[10px] sm:text-[11px] font-mono font-medium ${isActive ? 'text-white/50' : 'text-gray-400'}`}>{course.code}</span>
                  </div>
                  <p className={`text-xs sm:text-sm font-medium truncate ${isActive ? 'text-white' : ''}`}>{course.name}</p>
                  <p className={`text-[10px] mt-0.5 ${isActive ? 'text-white/40' : 'text-gray-400'}`}>{count} material{count !== 1 ? 's' : ''}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter */}
        <div className="res-section flex flex-wrap gap-1.5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-[12px] font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-[#008751]/6 text-[#008751]'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="res-section flex items-center justify-between">
          <p className="text-gray-400 text-[11px] sm:text-[12px]">
            {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
            {selectedCourse && <span className="text-gray-500 font-medium"> in {selectedCourse}</span>}
          </p>
          {selectedCourse && (
            <button onClick={() => setSelectedCourse('')} className="text-[10px] sm:text-[11px] font-medium text-[#008751] hover:text-[#006d42] transition-colors">
              Show all courses
            </button>
          )}
        </div>

        {/* Resources List */}
        <div className="res-section space-y-1.5">
          {filteredResources.map((resource, idx) => {
            const courseConfig = currentLevelConfig?.courses.find(c => c.code === resource.course);
            return (
              <div
                key={resource.id}
                className={`group flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-xl transition-all duration-200 ${
                  idx % 2 === 0 ? 'bg-[#008751]/3 hover:bg-[#008751]/6' : 'bg-gray-50/70 hover:bg-gray-100/70'
                }`}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${courseConfig?.color || '#008751'}12` }}>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: courseConfig?.color || '#008751' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 font-medium text-xs sm:text-sm truncate group-hover:text-[#008751] transition-colors duration-200">{resource.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 mt-0.5">
                    <span className="text-[10px] sm:text-[11px] font-medium" style={{ color: courseConfig?.color || '#666' }}>{resource.course}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-200 hidden sm:block" />
                    <span className="text-gray-400 text-[10px] sm:text-[11px]">{resource.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-200 hidden sm:block" />
                    <span className="text-gray-400 text-[10px] sm:text-[11px]">{resource.size}</span>
                  </div>
                </div>
                <button className="hidden sm:flex px-3 py-1.5 rounded-lg bg-[#008751] text-white text-[11px] sm:text-[12px] font-medium hover:bg-[#007545] active:scale-[0.98] transition-all duration-200 shrink-0 items-center gap-1.5">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
                <button className="sm:hidden w-8 h-8 rounded-lg bg-[#008751] text-white flex items-center justify-center shrink-0 hover:bg-[#007545] active:scale-[0.95] transition-all duration-200">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="res-section text-center py-12 sm:py-16 rounded-xl bg-gray-50/70">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-xl bg-gray-100 flex items-center justify-center mb-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium text-xs sm:text-sm">No resources found</p>
            <p className="text-gray-400 text-[11px] sm:text-[12px] mt-1">Try adjusting your search, course, or category filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
