import HeroSlideshow from '@/components/landing/HeroSlideshow';
import AboutPreview from '@/components/landing/AboutPreview';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSlideshow />

      {/* About NAAKIMS Preview */}
      <AboutPreview />
    </main>
  );
}
