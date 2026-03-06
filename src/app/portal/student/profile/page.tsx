'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DashboardLayout from '@/components/portal/DashboardLayout';
import gsap from 'gsap';

const levels = ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level', '600 Level'];
const programs = ['Medicine & Surgery', 'Dentistry'];
const chapters = [
  'University of Uyo',
  'University of Lagos',
  'University of Ibadan',
  'University of Calabar',
  'University of Nigeria',
  'OAU Ile-Ife',
  'Ahmadu Bello University',
  'University of Benin',
  'LAUTECH',
  'University of Port Harcourt',
  'UNIJOS',
];

// Mock user data
const initialData = {
  firstName: 'Inyeneobong',
  lastName: 'Inyang',
  email: 'inyeneobong.inyang@student.uniuyo.edu.ng',
  phone: '+234 801 234 5678',
  regNo: 'NAAKIMS/STU/2024/0892',
  chapter: 'University of Uyo',
  level: '400 Level',
  program: 'Medicine & Surgery',
  admissionYear: '2021',
  expectedGraduation: '2027',
  photoUrl: '',
};

export default function StudentProfilePage() {
  const [formData, setFormData] = useState(initialData);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.profile-section',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.1 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <DashboardLayout
      memberType="student"
      userName={`${formData.firstName} ${formData.lastName}`}
      userRegNo={formData.regNo}
    >
      <div ref={containerRef} className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <Link 
            href="/portal/student" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-xs mb-3"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-base sm:text-xl font-semibold text-gray-900 tracking-[-0.025em]">Edit Profile</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Update your personal information and profile photo</p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Profile Photo Section */}
          <div className="profile-section bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Profile Photo</h2>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                  {photoPreview || formData.photoUrl ? (
                    <Image 
                      src={photoPreview || formData.photoUrl} 
                      alt="Profile" 
                      fill 
                      className="object-cover" 
                    />
                  ) : (
                    <span className="text-xl sm:text-2xl font-bold text-gray-400">
                      {formData.firstName.charAt(0)}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 text-xs bg-[#008751] text-white font-medium rounded-lg hover:bg-[#007545] transition-colors"
                >
                  Upload Photo
                </button>
                <p className="text-gray-400 text-xs mt-2">JPG or PNG. Max 2MB. Passport-style recommended.</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="profile-section bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Personal Information</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/20 focus:border-[#008751] transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/20 focus:border-[#008751] transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/20 focus:border-[#008751] transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/20 focus:border-[#008751] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="profile-section bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Academic Information</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">NAAKIMS ID</label>
                <input
                  type="text"
                  value={formData.regNo}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Chapter</label>
                <select
                  value={formData.chapter}
                  onChange={(e) => handleChange('chapter', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/20 focus:border-[#008751] transition-all"
                >
                  {chapters.map(chapter => (
                    <option key={chapter} value={chapter}>{chapter}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Program</label>
                <select
                  value={formData.program}
                  onChange={(e) => handleChange('program', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/20 focus:border-[#008751] transition-all"
                >
                  {programs.map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Current Level</label>
                <select
                  value={formData.level}
                  onChange={(e) => handleChange('level', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/20 focus:border-[#008751] transition-all"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Admission Year</label>
                <input
                  type="text"
                  value={formData.admissionYear}
                  onChange={(e) => handleChange('admissionYear', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/20 focus:border-[#008751] transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Expected Graduation</label>
                <input
                  type="text"
                  value={formData.expectedGraduation}
                  onChange={(e) => handleChange('expectedGraduation', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/20 focus:border-[#008751] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 sm:gap-4">
            <Link
              href="/portal/student"
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-gray-600 text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#008751] text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-[#007545] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </>
              ) : saved ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Saved!
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
