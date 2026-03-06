'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DashboardLayout from '@/components/portal/DashboardLayout';
import gsap from 'gsap';

// Mock patron data
const initialData = {
  firstName: 'Suleiman',
  lastName: 'Bello',
  title: 'Alhaji',
  email: 's.bello@healthcare.ng',
  phone: '+234 805 678 9012',
  regNo: 'NAAKIMS/PTN/2020/0023',
  organization: 'Bello Healthcare Foundation',
  organizationType: 'Non-Profit',
  position: 'Chairman',
  city: 'Abuja',
  photoUrl: '',
  preferredContact: 'email',
  notifyEvents: true,
  notifyReports: true,
  publicRecognition: true,
};

const organizationTypes = [
  'Hospital',
  'Pharmaceutical',
  'Non-Profit',
  'Private Practice',
  'Corporate',
  'Individual',
  'Government',
  'Educational',
  'Other',
];

export default function PatronProfilePage() {
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
      memberType="patron"
      userName={`${formData.title} ${formData.firstName} ${formData.lastName}`}
      userRegNo={formData.regNo}
    >
      <div ref={containerRef} className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <Link 
            href="/portal/patron" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-xs mb-3"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-base sm:text-xl font-semibold text-gray-900 tracking-[-0.025em]">Edit Profile</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Update your patron information and preferences</p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Profile Photo Section */}
          <div className="profile-section bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Profile Photo</h2>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#008751]/5 flex items-center justify-center overflow-hidden border-2 border-[#008751]/10">
                  {photoPreview || formData.photoUrl ? (
                    <Image 
                      src={photoPreview || formData.photoUrl} 
                      alt="Profile" 
                      fill 
                      className="object-cover" 
                    />
                  ) : (
                    <span className="text-xl sm:text-2xl font-bold text-[#008751]">
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
                  className="px-3 py-1.5 text-xs bg-[#008751] text-white font-medium rounded-lg hover:bg-[#006B41] transition-colors"
                >
                  Upload Photo
                </button>
                <p className="text-gray-400 text-xs mt-2">JPG or PNG. Max 2MB.</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="profile-section bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Personal Information</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2 sm:w-1/3">
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g., Alhaji, Chief, Dr., Prof."
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/50/20 focus:border-[#008751]/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/50/20 focus:border-[#008751]/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/50/20 focus:border-[#008751]/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/50/20 focus:border-[#008751]/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/50/20 focus:border-[#008751]/50 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Patron/Organization Information */}
          <div className="profile-section bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Organization Information</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Patron ID</label>
                <input
                  type="text"
                  value={formData.regNo}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Organization Type</label>
                <select
                  value={formData.organizationType}
                  onChange={(e) => handleChange('organizationType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/50/20 focus:border-[#008751]/50 transition-all"
                >
                  {organizationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Organization Name</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => handleChange('organization', e.target.value)}
                  placeholder="e.g., Bello Healthcare Foundation"
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/50/20 focus:border-[#008751]/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Your Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleChange('position', e.target.value)}
                  placeholder="e.g., Chairman, CEO"
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/50/20 focus:border-[#008751]/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="e.g., Abuja"
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/50/20 focus:border-[#008751]/50 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="profile-section bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Preferences</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Preferred Contact Method</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={(e) => handleChange('preferredContact', e.target.value)}
                      className="w-4 h-4 text-[#008751] focus:ring-[#008751]/50"
                    />
                    <span className="text-xs text-gray-700">Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={(e) => handleChange('preferredContact', e.target.value)}
                      className="w-4 h-4 text-[#008751] focus:ring-[#008751]/50"
                    />
                    <span className="text-xs text-gray-700">Phone</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="both"
                      checked={formData.preferredContact === 'both'}
                      onChange={(e) => handleChange('preferredContact', e.target.value)}
                      className="w-4 h-4 text-[#008751] focus:ring-[#008751]/50"
                    />
                    <span className="text-xs text-gray-700">Both</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#008751]/5 rounded-xl">
                <div>
                  <h3 className="text-xs font-medium text-gray-900">Event Notifications</h3>
                  <p className="text-[10px] sm:text-[11px] text-gray-500">Receive updates about VIP events</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifyEvents}
                    onChange={(e) => handleChange('notifyEvents', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#008751]/50/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#008751]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#008751]/5 rounded-xl">
                <div>
                  <h3 className="text-xs font-medium text-gray-900">Impact Reports</h3>
                  <p className="text-[10px] sm:text-[11px] text-gray-500">Receive quarterly impact reports</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifyReports}
                    onChange={(e) => handleChange('notifyReports', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#008751]/50/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#008751]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#008751]/5 rounded-xl">
                <div>
                  <h3 className="text-xs font-medium text-gray-900">Public Recognition</h3>
                  <p className="text-[10px] sm:text-[11px] text-gray-500">Show my name on the public patrons list</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.publicRecognition}
                    onChange={(e) => handleChange('publicRecognition', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#008751]/50/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#008751]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 sm:gap-4">
            <Link
              href="/portal/patron"
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-gray-600 text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#008751] text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-[#006B41] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
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
