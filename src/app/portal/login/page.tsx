'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

type MemberType = 'student' | 'alumni' | 'patron';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [memberType, setMemberType] = useState<MemberType>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.brand-panel', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 });
      tl.fromTo('.form-el', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.05 }, '-=0.4');
      gsap.to('.float-shape-1', { y: -16, x: 8, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.float-shape-2', { y: 12, x: -10, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    gsap.to('.submit-btn', { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 });
    setTimeout(() => { router.push(`/portal/${memberType}`); }, 600);
  };

  const memberTypes: { value: MemberType; label: string; desc: string; icon: React.ReactNode; accent: string }[] = [
    { value: 'student', label: 'Student', desc: 'Current medical student', accent: 'border-emerald-400 bg-emerald-50/60 text-emerald-700', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg> },
    { value: 'alumni', label: 'Alumni', desc: 'Graduate member', accent: 'border-blue-400 bg-blue-50/60 text-blue-700', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg> },
    { value: 'patron', label: 'Patron', desc: 'Supporting member', accent: 'border-amber-400 bg-amber-50/60 text-amber-700', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg> },
  ];

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
              <h1 className="text-[36px] xl:text-[42px] font-bold text-white leading-[1.08] tracking-[-0.03em]">
                Your medical<br />community<br />
                <span className="text-white/40">awaits.</span>
              </h1>
            </div>
            <p className="text-white/40 text-[14px] leading-relaxed max-w-[280px]">
              Access dashboards, connect with colleagues, and manage your NAAKIMS membership - all in one place.
            </p>

            <div className="flex gap-8 pt-2">
              {[
                { num: '2,400+', label: 'Members' },
                { num: '15', label: 'Chapters' },
                { num: '98%', label: 'Active' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-white text-lg font-bold tracking-tight">{s.num}</p>
                  <p className="text-white/25 text-[10px] font-semibold uppercase tracking-wider mt-0.5">{s.label}</p>
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
            <p className="text-white/30 text-[11px] font-medium">Trusted by medical professionals nationwide</p>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex flex-col min-h-screen bg-[#FAFBFC]">
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
                <span className="text-white/40 text-[8px] font-semibold tracking-[0.15em] uppercase">Portal</span>
              </div>
            </Link>
            <Link href="/" className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center text-white/50 hover:text-white/80 hover:bg-white/12 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </Link>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-8 lg:py-12">
          <div className="w-full max-w-[400px]">
            {/* Header */}
            <div className="form-el mb-7">
              <h2 className="text-[24px] sm:text-[28px] font-bold text-gray-900 tracking-[-0.03em] leading-tight">Welcome back</h2>
              <p className="text-gray-400 text-sm mt-1.5">Sign in to your NAAKIMS account</p>
            </div>

            {/* Member Type Selector */}
            <div className="form-el mb-6">
              <label className="block text-[11px] font-semibold text-gray-400 mb-2.5 uppercase tracking-wider">I am a</label>
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

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="form-el">
                <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Email</label>
                <div className="relative group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#008751] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008751]/12 focus:border-[#008751]/30 transition-all duration-200 text-sm"
                  />
                </div>
              </div>

              <div className="form-el">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                  <Link href="#" className="text-[11px] text-[#008751] hover:text-[#006B41] font-semibold transition-colors">Forgot?</Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#008751] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-11 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008751]/12 focus:border-[#008751]/30 transition-all duration-200 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-el pt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="submit-btn w-full py-3 rounded-xl bg-[#008751] text-white font-semibold text-sm hover:bg-[#007545] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5">
                      Sign In
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="form-el relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-[#FAFBFC] text-gray-300 text-[10px] font-semibold uppercase tracking-[0.15em]">or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="form-el grid grid-cols-2 gap-2.5">
              <button type="button" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 text-[12px] font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 text-[12px] font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Apple
              </button>
            </div>

            {/* Footer */}
            <div className="form-el mt-7 flex items-center justify-between">
              <p className="text-gray-400 text-[12px]">
                No account?{' '}
                <Link href="/portal/register" className="text-[#008751] hover:text-[#006B41] font-semibold transition-colors">Sign up free</Link>
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
