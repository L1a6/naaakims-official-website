'use client';

import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { sortedUniversities } from '@/data/nigerianUniversities';
import gsap from 'gsap';

type MemberType = 'student' | 'alumni' | 'patron';
type Gender = 'male' | 'female';

const memberTypes: { value: MemberType; label: string; desc: string; icon: React.ReactNode; accent: string }[] = [
  { value: 'student', label: 'Student', desc: 'Current student', accent: 'border-emerald-400 bg-emerald-50/60 text-emerald-700', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg> },
  { value: 'alumni', label: 'Alumni', desc: 'Graduate member', accent: 'border-blue-400 bg-blue-50/60 text-blue-700', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg> },
  { value: 'patron', label: 'Patron', desc: 'Supporting member', accent: 'border-amber-400 bg-amber-50/60 text-amber-700', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg> },
];

const courses = [
  { value: 'medicine', label: 'Medicine & Surgery' },
  { value: 'dentistry', label: 'Dentistry' },
];

const levels = ['100', '200', '300', '400', '500', '600'];

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = (searchParams.get('type') as MemberType) || 'student';
  const pageRef = useRef<HTMLDivElement>(null);

  const [memberType, setMemberType] = useState<MemberType>(initialType);
  const [isLoading, setIsLoading] = useState(false);
  const [uniSearch, setUniSearch] = useState('');
  const [showUniDropdown, setShowUniDropdown] = useState(false);

  const filteredUniversities = useMemo(() => {
    if (!uniSearch) return sortedUniversities;
    const q = uniSearch.toLowerCase();
    return sortedUniversities.filter(
      u => u.label.toLowerCase().includes(q) || u.state.toLowerCase().includes(q)
    );
  }, [uniSearch]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    gender: '' as Gender | '',
    chapter: '',
    courseOfStudy: '',
    matricNo: '',
    level: '',
    graduationYear: '',
    specialization: '',
    hospital: '',
    occupation: '',
    company: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.brand-panel', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 });
      tl.fromTo('.reg-field', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power3.out' }, '-=0.4');
      gsap.to('.float-shape-1', { y: -14, x: 10, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.float-shape-2', { y: 12, x: -8, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    gsap.to('.reg-submit', { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 });
    setTimeout(() => { router.push(`/portal/${memberType}`); }, 800);
  };

  const inputCls = "w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008751]/12 focus:border-[#008751]/30 transition-all duration-200 text-[13px]";
  const labelCls = "block text-[10px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider";
  const selectCls = "w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/12 focus:border-[#008751]/30 transition-all duration-200 text-[13px] appearance-none";

  return (
    <div ref={pageRef} className="min-h-screen bg-white flex">
      {/* Left Panel — Abstract art with floating shapes */}
      <div className="brand-panel hidden lg:flex lg:w-[480px] xl:w-[520px] relative overflow-hidden bg-[#008751]">
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 0.6px, transparent 0.6px)', backgroundSize: '18px 18px' }} />

        {/* Large decorative circles — layered depth */}
        <div className="absolute -top-32 -right-32 w-[340px] h-[340px] rounded-full border border-white/[0.07]" />
        <div className="absolute -top-24 -right-24 w-[280px] h-[280px] rounded-full border border-white/[0.05]" />
        <div className="absolute -top-16 -right-16 w-[220px] h-[220px] rounded-full bg-[#00D084]/[0.06]" />

        {/* Bottom left cluster */}
        <div className="absolute -bottom-20 -left-20 w-[260px] h-[260px] rounded-full border border-white/[0.06]" />
        <div className="absolute -bottom-10 -left-10 w-[180px] h-[180px] rounded-full bg-white/[0.03]" />

        {/* Floating mid blobs */}
        <div className="float-shape-1 absolute top-[35%] right-8 w-24 h-24 rounded-full bg-[#00D084]/[0.08] blur-xl" />
        <div className="float-shape-2 absolute top-[55%] left-12 w-20 h-20 rounded-full bg-white/[0.04] blur-lg" />

        {/* Accent ring — center right */}
        <div className="absolute top-1/2 -translate-y-1/2 right-[-60px] w-[160px] h-[160px] rounded-full border-2 border-white/[0.05]" />
        <div className="absolute top-1/2 -translate-y-1/2 right-[-40px] w-[120px] h-[120px] rounded-full border border-[#00D084]/[0.08]" />

        {/* Small scattered circles */}
        <div className="absolute top-24 left-16 w-3 h-3 rounded-full bg-white/[0.12]" />
        <div className="absolute top-40 right-24 w-2 h-2 rounded-full bg-[#00D084]/20" />
        <div className="absolute bottom-40 left-32 w-4 h-4 rounded-full bg-white/[0.06]" />
        <div className="absolute bottom-24 right-16 w-2.5 h-2.5 rounded-full bg-white/[0.10]" />
        <div className="absolute top-[60%] left-[45%] w-5 h-5 rounded-full border border-white/[0.08]" />

        {/* Elongated pill shape */}
        <div className="absolute top-16 left-[55%] w-16 h-6 rounded-full bg-white/[0.04] rotate-45" />
        <div className="absolute bottom-32 right-[40%] w-12 h-5 rounded-full bg-[#00D084]/[0.05] -rotate-12" />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-14 w-full">
          <div>
            <span className="text-white/30 text-[10px] font-bold tracking-[0.25em] uppercase">Member Portal</span>
          </div>

          <div className="space-y-7">
            <div>
              <div className="w-10 h-1 rounded-full bg-[#00D084]/40 mb-6" />
              <h1 className="text-[36px] xl:text-[40px] font-bold text-white leading-[1.08] tracking-[-0.03em]">
                Join the<br />community<br />
                <span className="text-white/40">today.</span>
              </h1>
            </div>
            <p className="text-white/40 text-[14px] leading-relaxed max-w-[280px]">
              Create your account and connect with the largest network of medical professionals from Akwa Ibom State.
            </p>
            <div className="space-y-2.5 pt-1">
              {['Digital Membership ID', 'Member Directory', 'Event Registration', 'Academic Resources'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/8 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-white/50 text-[13px] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['M', 'F', 'A', 'S'].map((l, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/50 border-2 border-[#008751]">{l}</div>
              ))}
            </div>
            <p className="text-white/30 text-[11px] font-medium">2,400+ members nationwide</p>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-[#FAFBFC]">
        {/* Mobile Header */}
        <div className="lg:hidden bg-[#008751] px-5 py-3.5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.04] rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10 flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Image src="/logo.png" alt="NAAKIMS" width={20} height={20} className="w-5 h-5" />
              </div>
              <div>
                <span className="text-white text-sm font-bold block leading-tight">NAAKIMS</span>
                <span className="text-white/40 text-[8px] font-semibold tracking-[0.15em] uppercase">Create Account</span>
              </div>
            </Link>
            <Link href="/" className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center text-white/50 hover:text-white/80 hover:bg-white/12 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </Link>
          </div>
        </div>

        <div className="flex-1 flex items-start justify-center px-5 sm:px-8 py-7 lg:py-10">
          <div className="w-full max-w-[420px]">
            {/* Header */}
            <div className="reg-field mb-6">
              <h2 className="text-[22px] sm:text-[26px] font-bold text-gray-900 tracking-[-0.03em] leading-tight">Create your account</h2>
              <p className="text-gray-400 text-[13px] mt-1.5">
                Already a member?{' '}
                <Link href="/portal/login" className="text-[#008751] hover:text-[#006B41] font-semibold transition-colors">Sign in</Link>
              </p>
            </div>

            {/* Member Type Selector */}
            <div className="reg-field mb-5">
              <label className={labelCls}>I am a</label>
              <div className="grid grid-cols-3 gap-2.5">
                {memberTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setMemberType(type.value)}
                    className={`relative flex flex-col items-center gap-1.5 px-3 py-3.5 rounded-xl text-center transition-all duration-250 border-[1.5px] ${
                      memberType === type.value
                        ? type.accent
                        : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/60'
                    }`}
                  >
                    <span className={`transition-colors duration-200 ${memberType === type.value ? '' : 'text-gray-300'}`}>{type.icon}</span>
                    <p className={`text-[12px] font-bold ${memberType === type.value ? '' : 'text-gray-600'}`}>{type.label}</p>
                    <p className={`text-[9px] leading-tight ${memberType === type.value ? 'opacity-60' : 'text-gray-400'}`}>{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Name */}
              <div className="reg-field grid grid-cols-2 gap-2.5">
                <div>
                  <label className={labelCls}>First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" className={inputCls} required />
                </div>
                <div>
                  <label className={labelCls}>Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" className={inputCls} required />
                </div>
              </div>

              {/* Gender */}
              <div className="reg-field">
                <label className={labelCls}>Gender</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['male', 'female'] as Gender[]).map((g) => (
                    <button
                      key={g} type="button"
                      onClick={() => setFormData({ ...formData, gender: g })}
                      className={`py-2.5 px-3 rounded-xl border-[1.5px] text-[12px] font-semibold transition-all duration-200 ${
                        formData.gender === g
                          ? 'border-[#008751]/25 bg-[#008751]/[0.06] text-[#008751]'
                          : 'border-transparent bg-gray-50/80 text-gray-500 hover:bg-gray-100/80'
                      }`}
                    >
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="reg-field grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className={labelCls}>Email</label>
                  <div className="relative group">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#008751] transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                    </div>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={`${inputCls} pl-10`} required />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Phone</label>
                  <div className="relative group">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#008751] transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    </div>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+234 800 000 0000" className={`${inputCls} pl-10`} required />
                  </div>
                </div>
              </div>

              {/* Student-specific fields */}
              {memberType === 'student' && (
                <>
                  <div className="reg-field relative">
                    <label className={labelCls}>University (Chapter)</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={uniSearch || (formData.chapter ? sortedUniversities.find(u => u.value === formData.chapter)?.label || '' : '')}
                        onChange={(e) => { setUniSearch(e.target.value); setShowUniDropdown(true); setFormData({ ...formData, chapter: '' }); }}
                        onFocus={() => setShowUniDropdown(true)}
                        placeholder="Search universities..."
                        className={inputCls}
                        required={!formData.chapter}
                      />
                      {formData.chapter && (
                        <button type="button" onClick={() => { setFormData({ ...formData, chapter: '' }); setUniSearch(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                    {showUniDropdown && !formData.chapter && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-44 overflow-y-auto">
                        {filteredUniversities.length > 0 ? filteredUniversities.map((uni) => (
                          <button key={uni.value} type="button" onClick={() => { setFormData({ ...formData, chapter: uni.value }); setUniSearch(''); setShowUniDropdown(false); }} className="w-full text-left px-3.5 py-2 text-[12px] hover:bg-[#008751]/5 text-gray-700 flex justify-between border-b border-gray-50 last:border-0">
                            <span className="font-medium">{uni.label}</span>
                            <span className="text-gray-300 text-[10px]">{uni.state}</span>
                          </button>
                        )) : (
                          <p className="px-3.5 py-2.5 text-[12px] text-gray-400">No universities found</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="reg-field">
                    <label className={labelCls}>Course</label>
                    <select name="courseOfStudy" value={formData.courseOfStudy} onChange={handleChange} className={selectCls} required>
                      <option value="">Select course</option>
                      {courses.map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
                    </select>
                  </div>
                  <div className="reg-field grid grid-cols-2 gap-2.5">
                    <div>
                      <label className={labelCls}>Matric No.</label>
                      <input type="text" name="matricNo" value={formData.matricNo} onChange={handleChange} placeholder="2020/12345" className={inputCls} required />
                    </div>
                    <div>
                      <label className={labelCls}>Level</label>
                      <select name="level" value={formData.level} onChange={handleChange} className={selectCls} required>
                        <option value="">Select</option>
                        {levels.map((l) => (<option key={l} value={l}>{l} Level</option>))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Alumni-specific fields */}
              {memberType === 'alumni' && (
                <>
                  <div className="reg-field relative">
                    <label className={labelCls}>University (Chapter)</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={uniSearch || (formData.chapter ? sortedUniversities.find(u => u.value === formData.chapter)?.label || '' : '')}
                        onChange={(e) => { setUniSearch(e.target.value); setShowUniDropdown(true); setFormData({ ...formData, chapter: '' }); }}
                        onFocus={() => setShowUniDropdown(true)}
                        placeholder="Search universities..."
                        className={inputCls}
                        required={!formData.chapter}
                      />
                      {formData.chapter && (
                        <button type="button" onClick={() => { setFormData({ ...formData, chapter: '' }); setUniSearch(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                    {showUniDropdown && !formData.chapter && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-44 overflow-y-auto">
                        {filteredUniversities.length > 0 ? filteredUniversities.map((uni) => (
                          <button key={uni.value} type="button" onClick={() => { setFormData({ ...formData, chapter: uni.value }); setUniSearch(''); setShowUniDropdown(false); }} className="w-full text-left px-3.5 py-2 text-[12px] hover:bg-[#008751]/5 text-gray-700 flex justify-between border-b border-gray-50 last:border-0">
                            <span className="font-medium">{uni.label}</span>
                            <span className="text-gray-300 text-[10px]">{uni.state}</span>
                          </button>
                        )) : (
                          <p className="px-3.5 py-2.5 text-[12px] text-gray-400">No universities found</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="reg-field grid grid-cols-2 gap-2.5">
                    <div>
                      <label className={labelCls}>Graduation Year</label>
                      <input type="text" name="graduationYear" value={formData.graduationYear} onChange={handleChange} placeholder="2020" className={inputCls} required />
                    </div>
                    <div>
                      <label className={labelCls}>Specialization</label>
                      <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Surgery" className={inputCls} />
                    </div>
                  </div>
                  <div className="reg-field">
                    <label className={labelCls}>Current Hospital</label>
                    <input type="text" name="hospital" value={formData.hospital} onChange={handleChange} placeholder="Lagos University Teaching Hospital" className={inputCls} />
                  </div>
                </>
              )}

              {/* Patron-specific fields */}
              {memberType === 'patron' && (
                <>
                  <div className="reg-field">
                    <label className={labelCls}>Occupation</label>
                    <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="CEO" className={inputCls} required />
                  </div>
                  <div className="reg-field">
                    <label className={labelCls}>Company / Organization</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="XYZ Holdings Ltd" className={inputCls} />
                  </div>
                </>
              )}

              {/* Password */}
              <div className="reg-field">
                <label className={labelCls}>Password</label>
                <div className="relative group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#008751] transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                  </div>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a secure password" className={`${inputCls} pl-10`} required />
                </div>
              </div>

              {/* Submit */}
              <div className="reg-field pt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="reg-submit w-full py-3 rounded-xl bg-[#008751] text-white font-semibold text-sm hover:bg-[#007545] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5">
                      Create Account
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </span>
                  )}
                </button>
              </div>

              <p className="reg-field text-center text-gray-300 text-[10px]">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="text-gray-400 hover:text-gray-600 transition-colors">Terms</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-gray-400 hover:text-gray-600 transition-colors">Privacy Policy</Link>
              </p>
            </form>

            <div className="reg-field mt-6 flex items-center justify-between">
              <p className="text-gray-400 text-[12px]">
                Have an account?{' '}
                <Link href="/portal/login" className="text-[#008751] hover:text-[#006B41] font-semibold transition-colors">Sign in</Link>
              </p>
              <Link href="/" className="inline-flex items-center gap-1 text-gray-300 hover:text-gray-500 text-[11px] font-medium transition-colors">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#008751] border-t-transparent rounded-full" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
