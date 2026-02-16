import HeroSlideshow from '@/components/landing/HeroSlideshow';
import AboutPreview from '@/components/landing/AboutPreview';
import ProgramsShowcase from '@/components/landing/ProgramsShowcase';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSlideshow />

      {/* About NAAKIMS Preview */}
      <AboutPreview />

      {/* Programs & Initiatives */}
      <ProgramsShowcase />
    </main>
  );
}
