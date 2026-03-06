'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DashboardLayout from '@/components/portal/DashboardLayout';
import gsap from 'gsap';

const specializations = [
  'General Practice',
  'Internal Medicine',
  'Surgery',
  'Pediatrics',
  'Obstetrics & Gynecology',
  'Ophthalmology',
  'ENT',
  'Dermatology',
  'Psychiatry',
  'Radiology',
  'Anesthesia',
  'Pathology',
  'Public Health',
  'Family Medicine',
  'Emergency Medicine',
];

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

// Mock alumni data
const initialData = {
  firstName: 'Fatima',
  lastName: 'Abubakar',
  title: 'Dr.',
  email: 'f.abubakar@luth.edu.ng',
  phone: '+234 803 456 7890',
  regNo: 'NAAKIMS/ALM/2018/0156',
  chapter: 'University of Lagos',
  graduationYear: '2018',
  specialization: 'Internal Medicine',
  workplace: 'Lagos University Teaching Hospital',
  workplaceCity: 'Lagos',
  position: 'Senior Registrar',
  photoUrl: '',
  linkedin: '',
  twitter: '',
  mentorAvailable: true,
};

export default function AlumniProfilePage() {
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

  const handleChange = (field: string, value: string | boolean) => {
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
      memberType="alumni"
      userName={`${formData.title} ${formData.firstName} ${formData.lastName}`}
      userRegNo={formData.regNo}
    >
      <div ref={containerRef} className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href="/portal/alumni" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Update your professional information and preferences</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Photo Section */}
          <div className="profile-section bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Photo</h2>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-[#008751]/5 flex items-center justify-center overflow-hidden border-2 border-[#008751]/10">
                  {photoPreview || formData.photoUrl ? (
                    <Image 
                      src={photoPreview || formData.photoUrl} 
                      alt="Profile" 
                      fill 
                      className="object-cover" 
                    />
                  ) : (
                    <span className="text-4xl font-bold text-[#008751]">
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
                  className="px-4 py-2 bg-[#008751]/50 text-white text-sm font-medium rounded-lg hover:bg-[#006B41] transition-colors"
                >
                  Upload Photo
                </button>
                <p className="text-gray-400 text-xs mt-2">JPG or PNG. Max 2MB. Professional photo recommended.</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="profile-section bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 sm:w-1/4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <select
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all"
                >
                  <option value="Dr.">Dr.</option>
                  <option value="Prof.">Prof.</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Alumni/Professional Information */}
          <div className="profile-section bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NAAKIMS Alumni ID</label>
                <input
                  type="text"
                  value={formData.regNo}
                  disabled
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Former Chapter</label>
                <select
                  value={formData.chapter}
                  onChange={(e) => handleChange('chapter', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all"
                >
                  {chapters.map(chapter => (
                    <option key={chapter} value={chapter}>{chapter}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                <input
                  type="text"
                  value={formData.graduationYear}
                  onChange={(e) => handleChange('graduationYear', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <select
                  value={formData.specialization}
                  onChange={(e) => handleChange('specialization', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all"
                >
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Workplace Information */}
          <div className="profile-section bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Workplace Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Hospital / Institution</label>
                <input
                  type="text"
                  value={formData.workplace}
                  onChange={(e) => handleChange('workplace', e.target.value)}
                  placeholder="e.g., Lagos University Teaching Hospital"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={formData.workplaceCity}
                  onChange={(e) => handleChange('workplaceCity', e.target.value)}
                  placeholder="e.g., Lagos"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleChange('position', e.target.value)}
                  placeholder="e.g., Senior Registrar"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Mentorship & Social */}
          <div className="profile-section bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mentorship & Connections</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#008751]/5 rounded-xl">
                <div>
                  <h3 className="font-medium text-gray-900">Available for Mentorship</h3>
                  <p className="text-sm text-gray-500">Students can request you as their mentor</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.mentorAvailable}
                    onChange={(e) => handleChange('mentorAvailable', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#008751]/15 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#008751]/50"></div>
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn (optional)</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => handleChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter/X (optional)</label>
                  <input
                    type="text"
                    value={formData.twitter}
                    onChange={(e) => handleChange('twitter', e.target.value)}
                    placeholder="@username"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/portal/alumni"
              className="px-6 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-[#008751]/50 text-white font-medium rounded-xl hover:bg-[#006B41] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </>
              ) : saved ? (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
