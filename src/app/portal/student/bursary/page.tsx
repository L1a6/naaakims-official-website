'use client';

import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/portal/DashboardLayout';
import gsap from 'gsap';

const mockUser = {
  name: 'Inyeneobong Godwin Inyang',
  regNo: 'NAAKIMS/STU/2024/0892',
  email: 'inyeneobong.inyang@student.uniuyo.edu.ng',
  chapter: 'University of Uyo',
  level: '400 Level',
  program: 'Medicine & Surgery',
};

type Step = 'academic' | 'personal' | 'account' | 'review';

const steps: { id: Step; label: string; description: string }[] = [
  { id: 'academic', label: 'Academic Info', description: 'Verify your academic details' },
  { id: 'personal', label: 'Personal Details', description: 'Date of birth, location, etc.' },
  { id: 'account', label: 'Account Details', description: 'Bank account for disbursement' },
  { id: 'review', label: 'Review', description: 'Confirm and submit application' },
];

const nigerianBanks = [
  'Access Bank', 'First Bank of Nigeria', 'Guaranty Trust Bank', 'United Bank for Africa',
  'Zenith Bank', 'Fidelity Bank', 'Union Bank', 'Sterling Bank', 'Wema Bank', 'Polaris Bank',
  'Stanbic IBTC', 'Ecobank', 'Keystone Bank', 'FCMB', 'Jaiz Bank', 'Kuda Bank', 'Opay', 'Palmpay',
];

export default function BursaryPage() {
  const [currentStep, setCurrentStep] = useState<Step>('academic');
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    // Academic
    institution: mockUser.chapter,
    program: mockUser.program,
    level: mockUser.level,
    matricNo: '2021/ME/0892',
    admissionYear: '2021',
    expectedGraduation: '2027',
    // Personal
    dateOfBirth: '',
    stateOfOrigin: '',
    lga: '',
    address: '',
    phoneNumber: '',
    emergencyContact: '',
    // Account
    bankName: '',
    accountNumber: '',
    accountName: '',
    bvn: '',
  });

  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [admissionFile, setAdmissionFile] = useState<File | null>(null);
  const certificateInputRef = useRef<HTMLInputElement>(null);
  const admissionInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.bursary-section',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out', delay: 0.05 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo('.step-content',
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
    );
  }, [currentStep]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const currentStepIdx = steps.findIndex(s => s.id === currentStep);
  const isFirstStep = currentStepIdx === 0;
  const isLastStep = currentStepIdx === steps.length - 1;

  const goNext = () => {
    if (isLastStep) {
      setSubmitted(true);
      return;
    }
    setCurrentStep(steps[currentStepIdx + 1].id);
  };

  const goBack = () => {
    if (!isFirstStep) setCurrentStep(steps[currentStepIdx - 1].id);
  };

  const inputCls = "w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all duration-200 text-xs sm:text-sm";
  const labelCls = "block text-[10px] sm:text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider";
  const selectCls = "w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008751]/15 focus:border-[#008751]/40 transition-all duration-200 text-xs sm:text-sm appearance-none";

  if (submitted) {
    return (
      <DashboardLayout memberType="student" userName={mockUser.name} userRegNo={mockUser.regNo}>
        <div ref={containerRef} className="max-w-2xl mx-auto">
          <div className="bursary-section text-center py-16 sm:py-20">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-[#008751]/8 flex items-center justify-center mb-5">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#008751]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Application Submitted</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
              Your bursary application has been received. We will verify your details and notify you within 5-7 working days.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#008751]/[0.04] text-[#008751] text-xs sm:text-sm font-medium">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Application ID: BUR-2026-{Math.floor(Math.random() * 9000) + 1000}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout memberType="student" userName={mockUser.name} userRegNo={mockUser.regNo}>
      <div ref={containerRef} className="max-w-3xl mx-auto space-y-5">
        {/* Header */}
        <div className="bursary-section">
          <h1 className="text-base sm:text-xl font-semibold text-gray-900 tracking-[-0.025em]">Bursary Application</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Verify your details and apply for financial support</p>
        </div>

        {/* Status Banner */}
        <div className="bursary-section rounded-xl bg-blue-50/70 px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-100/80 flex items-center justify-center text-blue-600 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-blue-800">Eligibility: Active Student Member</p>
            <p className="text-[10px] sm:text-[11px] text-blue-600/70 mt-0.5">Dues must be current to qualify for bursary disbursement</p>
          </div>
        </div>

        {/* Step Progress */}
        <div className="bursary-section">
          <div className="flex items-center gap-1 sm:gap-2">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 w-full px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all duration-200 ${
                    currentStep === step.id
                      ? 'bg-[#008751]/[0.06]'
                      : idx < currentStepIdx
                        ? 'bg-[#008751]/[0.03]'
                        : 'bg-gray-50/80'
                  }`}
                >
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 text-[9px] sm:text-[10px] font-bold ${
                    currentStep === step.id
                      ? 'bg-[#008751] text-white'
                      : idx < currentStepIdx
                        ? 'bg-[#008751]/20 text-[#008751]'
                        : 'bg-gray-200/60 text-gray-400'
                  }`}>
                    {idx < currentStepIdx ? (
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span className={`hidden sm:block text-[11px] font-medium truncate ${
                    currentStep === step.id ? 'text-[#008751]' : idx < currentStepIdx ? 'text-[#008751]/60' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="step-content space-y-4">
          {/* Academic Info */}
          {currentStep === 'academic' && (
            <div className="bursary-section rounded-xl bg-[#008751]/[0.03] px-4 py-5 sm:px-6 sm:py-6 space-y-4">
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-gray-900">Academic Information</h2>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">Confirm these details match your academic records</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Institution</label>
                  <input type="text" name="institution" value={formData.institution} onChange={handleChange} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Program</label>
                  <input type="text" name="program" value={formData.program} onChange={handleChange} className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className={labelCls}>Current Level</label>
                  <select name="level" value={formData.level} onChange={handleChange} className={selectCls}>
                    {['100 Level', '200 Level', '300 Level', '400 Level', '500 Level', '600 Level'].map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Matric No.</label>
                  <input type="text" name="matricNo" value={formData.matricNo} onChange={handleChange} className={inputCls} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Admission Year</label>
                  <input type="text" name="admissionYear" value={formData.admissionYear} onChange={handleChange} className={inputCls} />
                </div>
              </div>

              <div className="rounded-lg bg-white/60 px-3 py-2.5 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#008751] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <p className="text-[10px] sm:text-[11px] text-gray-500">Expected Graduation: <span className="font-semibold text-gray-700">{formData.expectedGraduation}</span></p>
              </div>

              {/* Document Uploads */}
              <div className="pt-2 space-y-3">
                <div>
                  <h3 className="text-[11px] sm:text-xs font-semibold text-gray-900 mb-0.5">Required Documents</h3>
                  <p className="text-[9px] sm:text-[10px] text-gray-400">Upload clear scans or photos (PDF, JPG, PNG - max 5MB each)</p>
                </div>

                {/* Certificate of Origin */}
                <div>
                  <label className={labelCls}>Certificate of Origin</label>
                  <input
                    ref={certificateInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => setCertificateFile(e.target.files?.[0] || null)}
                  />
                  <button
                    type="button"
                    onClick={() => certificateInputRef.current?.click()}
                    className={`w-full rounded-lg border-[1.5px] border-dashed px-4 py-4 text-center transition-all duration-200 ${
                      certificateFile
                        ? 'border-[#008751]/30 bg-[#008751]/[0.03]'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60'
                    }`}
                  >
                    {certificateFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 text-[#008751]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-xs font-medium text-gray-700 truncate max-w-[200px]">{certificateFile.name}</span>
                        <span className="text-[9px] text-gray-400">({(certificateFile.size / 1024 / 1024).toFixed(1)} MB)</span>
                      </div>
                    ) : (
                      <div>
                        <svg className="w-5 h-5 mx-auto text-gray-300 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                        <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Click to upload certificate of origin</p>
                        <p className="text-[9px] text-gray-300 mt-0.5">PDF, JPG or PNG</p>
                      </div>
                    )}
                  </button>
                </div>

                {/* Admission Letter or Student ID Card */}
                <div>
                  <label className={labelCls}>Admission Letter or Student ID Card</label>
                  <input
                    ref={admissionInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => setAdmissionFile(e.target.files?.[0] || null)}
                  />
                  <button
                    type="button"
                    onClick={() => admissionInputRef.current?.click()}
                    className={`w-full rounded-lg border-[1.5px] border-dashed px-4 py-4 text-center transition-all duration-200 ${
                      admissionFile
                        ? 'border-[#008751]/30 bg-[#008751]/[0.03]'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60'
                    }`}
                  >
                    {admissionFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 text-[#008751]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-xs font-medium text-gray-700 truncate max-w-[200px]">{admissionFile.name}</span>
                        <span className="text-[9px] text-gray-400">({(admissionFile.size / 1024 / 1024).toFixed(1)} MB)</span>
                      </div>
                    ) : (
                      <div>
                        <svg className="w-5 h-5 mx-auto text-gray-300 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                        <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Click to upload admission letter or student ID</p>
                        <p className="text-[9px] text-gray-300 mt-0.5">PDF, JPG or PNG</p>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Personal Details */}
          {currentStep === 'personal' && (
            <div className="bursary-section rounded-xl bg-gray-50/80 px-4 py-5 sm:px-6 sm:py-6 space-y-4">
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-gray-900">Personal Details</h2>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">Your personal information for verification</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Date of Birth</label>
                  <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Phone Number</label>
                  <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+234 800 000 0000" className={inputCls} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>State of Origin</label>
                  <input type="text" name="stateOfOrigin" value={formData.stateOfOrigin} onChange={handleChange} placeholder="Akwa Ibom" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>LGA</label>
                  <input type="text" name="lga" value={formData.lga} onChange={handleChange} placeholder="Uyo" className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Residential Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="123 Student Village, Uyo" className={inputCls} />
              </div>

              <div>
                <label className={labelCls}>Emergency Contact (Phone)</label>
                <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} placeholder="+234 900 000 0000" className={inputCls} />
              </div>
            </div>
          )}

          {/* Account Details */}
          {currentStep === 'account' && (
            <div className="bursary-section rounded-xl bg-blue-50/50 px-4 py-5 sm:px-6 sm:py-6 space-y-4">
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-gray-900">Bank Account Details</h2>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">Where bursary funds will be disbursed</p>
              </div>

              <div>
                <label className={labelCls}>Bank Name</label>
                <select name="bankName" value={formData.bankName} onChange={handleChange} className={selectCls}>
                  <option value="">Select your bank</option>
                  {nigerianBanks.map(b => (<option key={b} value={b}>{b}</option>))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Account Number</label>
                  <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="0123456789" maxLength={10} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Account Name</label>
                  <input type="text" name="accountName" value={formData.accountName} onChange={handleChange} placeholder="Inyeneobong Godwin Inyang" className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>BVN (Bank Verification Number)</label>
                <input type="text" name="bvn" value={formData.bvn} onChange={handleChange} placeholder="22200000000" maxLength={11} className={inputCls} />
                <p className="text-[9px] sm:text-[10px] text-gray-400 mt-1">Your BVN is securely encrypted and only used for identity verification</p>
              </div>

              <div className="rounded-lg bg-white/60 px-3 py-2.5 flex items-start gap-2">
                <svg className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <p className="text-[10px] sm:text-[11px] text-gray-500 leading-relaxed">All financial data is encrypted end-to-end. NAAKIMS does not store raw account details.</p>
              </div>
            </div>
          )}

          {/* Review */}
          {currentStep === 'review' && (
            <div className="bursary-section space-y-3">
              <div className="rounded-xl bg-[#008751]/[0.03] px-4 py-4 sm:px-5">
                <h3 className="text-[11px] sm:text-[12px] font-semibold text-gray-900 mb-2.5">Academic Details</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { label: 'Institution', value: formData.institution },
                    { label: 'Program', value: formData.program },
                    { label: 'Level', value: formData.level },
                    { label: 'Matric No.', value: formData.matricNo },
                    { label: 'Admission', value: formData.admissionYear },
                    { label: 'Graduation', value: formData.expectedGraduation },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{item.label}</p>
                      <p className="text-[11px] sm:text-[12px] text-gray-700 font-medium mt-0.5">{item.value || '-'}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100/60 grid grid-cols-2 gap-2.5">
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Certificate of Origin</p>
                    <p className="text-[11px] sm:text-[12px] text-gray-700 font-medium mt-0.5 truncate">{certificateFile ? certificateFile.name : 'Not uploaded'}</p>
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Admission Letter / ID</p>
                    <p className="text-[11px] sm:text-[12px] text-gray-700 font-medium mt-0.5 truncate">{admissionFile ? admissionFile.name : 'Not uploaded'}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gray-50/80 px-4 py-4 sm:px-5">
                <h3 className="text-[11px] sm:text-[12px] font-semibold text-gray-900 mb-2.5">Personal Details</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { label: 'Date of Birth', value: formData.dateOfBirth },
                    { label: 'State', value: formData.stateOfOrigin },
                    { label: 'LGA', value: formData.lga },
                    { label: 'Phone', value: formData.phoneNumber },
                    { label: 'Address', value: formData.address },
                    { label: 'Emergency', value: formData.emergencyContact },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{item.label}</p>
                      <p className="text-[11px] sm:text-[12px] text-gray-700 font-medium mt-0.5">{item.value || '-'}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-blue-50/50 px-4 py-4 sm:px-5">
                <h3 className="text-[11px] sm:text-[12px] font-semibold text-gray-900 mb-2.5">Bank Account</h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { label: 'Bank', value: formData.bankName },
                    { label: 'Account No.', value: formData.accountNumber ? `****${formData.accountNumber.slice(-4)}` : '-' },
                    { label: 'Account Name', value: formData.accountName },
                    { label: 'BVN', value: formData.bvn ? `${formData.bvn.slice(0, 3)}****${formData.bvn.slice(-2)}` : '-' },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{item.label}</p>
                      <p className="text-[11px] sm:text-[12px] text-gray-700 font-medium mt-0.5 font-mono">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-amber-50/70 px-3 py-2.5 flex items-start gap-2">
                <svg className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <p className="text-[10px] sm:text-[11px] text-amber-700 leading-relaxed">Please verify all information is correct before submitting. Incorrect details may delay your bursary disbursement.</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bursary-section flex items-center justify-between pt-1">
          <button
            onClick={goBack}
            disabled={isFirstStep}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-[11px] sm:text-[12px] font-medium transition-all duration-200 ${
              isFirstStep ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>

          <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium">
            Step {currentStepIdx + 1} of {steps.length}
          </p>

          <button
            onClick={goNext}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-[#008751] text-white text-[11px] sm:text-[12px] font-medium hover:bg-[#006d42] active:scale-[0.98] transition-all duration-200"
          >
            {isLastStep ? 'Submit Application' : 'Continue'}
            {!isLastStep && <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
