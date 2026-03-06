'use client';

import React from 'react';
import Image from 'next/image';

type MemberType = 'student' | 'alumni' | 'patron';

interface MembershipCardProps {
  memberType: MemberType;
  name: string;
  regNo: string;
  chapter: string;
  validUntil: string;
  status: 'active' | 'inactive' | 'pending';
}

const typeLabels: Record<MemberType, string> = {
  student: 'Student Member',
  alumni: 'Alumni Member',
  patron: 'Patron',
};

const typeColors: Record<MemberType, { primary: string; secondary: string }> = {
  student: { primary: '#00D084', secondary: '#008751' },
  alumni: { primary: '#FFD700', secondary: '#FFA500' },
  patron: { primary: '#E040FB', secondary: '#7C4DFF' },
};

const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: 'Active', color: '#00D084' },
  inactive: { label: 'Inactive', color: '#FF5252' },
  pending: { label: 'Pending', color: '#FFD700' },
};

export default function MembershipCard({
  memberType,
  name,
  regNo,
  chapter,
  validUntil,
  status,
}: MembershipCardProps) {
  const colors = typeColors[memberType];
  const statusInfo = statusLabels[status];

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Card */}
      <div 
        className="relative aspect-[1.6/1] rounded-2xl p-6 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.secondary}10 100%)`,
          border: `1px solid ${colors.primary}30`,
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Top row */}
        <div className="relative flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="NAAKIMS"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <div>
              <p className="text-white text-sm font-semibold">NAAKIMS</p>
              <p className="text-white/50 text-xs">{typeLabels[memberType]}</p>
            </div>
          </div>
          <div 
            className="px-2 py-1 rounded text-xs font-medium"
            style={{ backgroundColor: `${statusInfo.color}20`, color: statusInfo.color }}
          >
            {statusInfo.label}
          </div>
        </div>

        {/* Member info */}
        <div className="relative mt-auto">
          <p className="text-white text-xl font-bold tracking-wide mb-1">{name}</p>
          <p className="text-white/60 text-sm mb-4">{chapter}</p>
          
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Member ID</p>
              <p className="text-white font-mono text-sm" style={{ color: colors.primary }}>
                {regNo}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Valid Until</p>
              <p className="text-white/80 text-sm">{validUntil}</p>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div 
          className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full opacity-10"
          style={{ backgroundColor: colors.primary }}
        />
      </div>
    </div>
  );
}
