import Hero from '@/components/sections/Hero';
import ServiceCards from '@/components/sections/ServiceCards';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import Stats from '@/components/sections/Stats';
import Testimonials from '@/components/sections/Testimonials';
import CTABanner from '@/components/sections/CTABanner';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServiceCards />
      <FeaturedProjects />
      <Testimonials />
      <CTABanner />
    </>
  );
}