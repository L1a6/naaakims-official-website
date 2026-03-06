import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NAAKIMS Portal',
  description: 'NAAKIMS Members Portal - Access your membership dashboard',
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {children}
    </div>
  );
}
