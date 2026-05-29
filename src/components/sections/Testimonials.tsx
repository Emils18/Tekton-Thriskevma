'use client';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '@/lib/motion';
import { testimonialBg } from '@/lib/images';
import { getBgImageStyle } from '@/lib/imageUtils';

const testimonials = [
  { name: 'Juan dela Cruz', role: 'Homeowner', text: 'Tekton built our dream home. Professional, on time, and beautiful craftsmanship.' },
  { name: 'Maria Santos', role: 'Business Owner', text: 'Our office renovation was seamless. They handled everything from design to finishing.' },
  { name: 'Engr. Reyes', role: 'Project Consultant', text: 'Reliable partner for large-scale projects. Their team delivers quality consistently.' },
];

export default function Testimonials() {
  return (
    <motion.section
      className="py-20 relative bg-cover bg-center bg-fixed"
      style={getBgImageStyle(testimonialBg, '#1B5E20')}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-brand-green/80 backdrop-blur-sm" />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.h2 className="text-4xl font-bold text-center text-white mb-16" variants={fadeIn}>
          What Our Clients Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              className="bg-white/10 backdrop-blur-md rounded-[3rem] p-8 shadow-lg border border-white/20 text-white text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-accent/30 flex items-center justify-center mb-4">
                <span className="text-2xl">“</span>
              </div>
              <p className="italic mb-4">{t.text}</p>
              <h4 className="font-semibold">{t.name}</h4>
              <p className="text-sm opacity-70">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}