import HeroSlideshow from '@/components/landing/HeroSlideshow';
import AboutPreview from '@/components/landing/AboutPreview';
import ProgramsShowcase from '@/components/landing/ProgramsShowcase';
import LeadershipShowcase from '@/components/landing/LeadershipShowcase';
import TestimonialsShowcase from '@/components/landing/TestimonialsShowcase';
import JoinCtaFooter from '@/components/landing/JoinCtaFooter';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSlideshow />

      {/* About NAAKIMS Preview */}
      <AboutPreview />

      {/* Programs & Initiatives */}
      <ProgramsShowcase />

      {/* Leadership & Executives */}
      <LeadershipShowcase />

      {/* Testimonials & Chapters */}
      <TestimonialsShowcase />

      {/* Join CTA & Footer */}
      <JoinCtaFooter />
    </main>
  );
}
