import HeroSlideshow from '@/components/landing/HeroSlideshow';
import AboutPreview from '@/components/landing/AboutPreview';
import ProgramsInitiatives from '@/components/landing/ProgramsInitiatives';
import LeadershipShowcase from '@/components/landing/LeadershipShowcase';
import LatestNews from '@/components/landing/LatestNews';
import TestimonialsShowcase from '@/components/landing/TestimonialsShowcase';
import JoinCtaFooter from '@/components/landing/JoinCtaFooter';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSlideshow />
      <AboutPreview />
      <ProgramsInitiatives />
      <LeadershipShowcase />
      <LatestNews />
      <TestimonialsShowcase />
      <JoinCtaFooter />
    </main>
  );
}
