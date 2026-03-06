'use client';

import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/portal/DashboardLayout';
import gsap from 'gsap';

const mockUser = {
  name: 'Inyeneobong Godwin Inyang',
  regNo: 'NAAKIMS/STU/2024/0892',
};

const duesOptions = [
  { id: 'semester', label: 'Semester Dues', amount: 2500, period: '6 months' },
  { id: 'annual', label: 'Annual Dues', amount: 4500, period: '12 months', recommended: true },
];

const paymentHistory = [
  { reference: 'NAAKIMS-2025-001234', amount: 4500, date: 'Jan 15, 2025', status: 'success' },
  { reference: 'NAAKIMS-2024-004567', amount: 4500, date: 'Jan 10, 2024', status: 'success' },
  { reference: 'NAAKIMS-2023-007890', amount: 2500, date: 'Aug 20, 2023', status: 'success' },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);

export default function DuesPage() {
  const [selectedPlan, setSelectedPlan] = useState('annual');
  const [isProcessing, setIsProcessing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.dues-section',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment simulation complete! In production, this would redirect to Paystack.');
    }, 2000);
  };

  return (
    <DashboardLayout memberType="student" userName={mockUser.name} userRegNo={mockUser.regNo}>
      <div ref={containerRef} className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="dues-section">
          <h1 className="text-base sm:text-xl font-semibold text-gray-900 tracking-[-0.025em]">Pay Dues</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">Keep your membership active by paying your dues</p>
        </div>

        {/* Current Status */}
        <div className="dues-section bg-[#008751]/6 border border-[#008751]/10 rounded-xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#008751]/10 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-[#008751]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-[14px]">Your dues are up to date</p>
            <p className="text-gray-500 text-[12px] mt-0.5">Valid until December 2026</p>
          </div>
        </div>

        {/* Plan Selection */}
        <div className="dues-section">
          <h2 className="text-[14px] font-semibold text-gray-900 tracking-[-0.01em] mb-3.5">Select Payment Plan</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {duesOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedPlan(option.id)}
                className={`
                  relative p-5 rounded-xl border text-left transition-all duration-300
                  ${selectedPlan === option.id
                    ? 'border-[#008751] bg-[#008751]/[0.04]'
                    : 'border-gray-200 bg-white hover:border-gray-300'}
                `}
              >
                {option.recommended && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#008751]/8 text-[#008751] uppercase tracking-wider">
                    Recommended
                  </span>
                )}
                <p className="text-gray-900 font-semibold text-[13px]">{option.label}</p>
                <p className="text-[22px] font-bold text-gray-900 mt-2 tracking-[-0.02em]">
                  {formatCurrency(option.amount)}
                  <span className="text-[12px] font-normal text-gray-400 ml-1.5">/ {option.period}</span>
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Pay Button */}
        <div className="dues-section">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full py-3.5 rounded-xl bg-[#008751] text-white font-semibold text-[14px] hover:bg-[#007545] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                Pay {formatCurrency(duesOptions.find(o => o.id === selectedPlan)?.amount || 0)}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Payment History */}
        <div className="dues-section">
          <h2 className="text-[14px] font-semibold text-gray-900 tracking-[-0.01em] mb-3.5">Payment History</h2>
          <div className="bg-gray-50/80 rounded-xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-4 px-5 py-3 bg-gray-50/60 border-b border-gray-100/60">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Reference</p>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Amount</p>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Date</p>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-right">Status</p>
            </div>
            {paymentHistory.map((payment, idx) => (
              <div key={idx} className="sm:grid sm:grid-cols-4 px-5 py-3.5 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors duration-300">
                <p className="text-gray-700 text-[12px] font-mono truncate">{payment.reference}</p>
                <p className="text-gray-900 text-[12px] font-semibold mt-1 sm:mt-0">{formatCurrency(payment.amount)}</p>
                <p className="text-gray-400 text-[12px] mt-0.5 sm:mt-0">{payment.date}</p>
                <div className="flex sm:justify-end mt-1.5 sm:mt-0">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#008751]/8 text-[#008751] uppercase tracking-wider">
                    Paid
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
