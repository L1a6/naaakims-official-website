import type { Metadata } from 'next';
import SponsorsShowcase from '@/components/sponsors/SponsorsShowcase';

export const metadata: Metadata = {
  title: 'Sponsors & Patrons | NAAKIMS Worldwide',
  description: 'Honoring the distinguished leaders, patrons, and sponsors whose support makes the NAAKIMS vision possible.',
};

export default function SponsorsPage() {
  return (
    <main className="min-h-screen">
      <SponsorsShowcase />
    </main>
  );
}
