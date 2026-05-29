'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { heroImage } from '@/lib/images';
import { getBgImageStyle } from '@/lib/imageUtils';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with fallback gradient */}
      <motion.div
        className="absolute inset-0"
        style={{ ...getBgImageStyle(heroImage, '#1B5E20'), y }}
      />
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-green/70 to-brand-green/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
        <motion.h1
          className="text-4xl md:text-7xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Building with Purpose,<br />
          <span className="text-brand-accent">Shaping Communities</span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Premium construction services in Mandaue City – residential, commercial, industrial.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
         <AnimatedButton href="/projects">View Our Work</AnimatedButton>
<AnimatedButton
  href="/contact"
  className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-green"
>
  Contact Us
</AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}