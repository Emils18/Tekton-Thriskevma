'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTABanner() {
  return (
    <motion.section
      className="py-24 bg-brand-green text-white text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build Your Vision?</h2>
        <p className="text-xl opacity-90 mb-8">Let's discuss your project. Get a free consultation today.</p>
        <Link
          href="/contact"
          className="inline-block px-8 py-4 bg-white text-brand-green rounded-pill font-semibold hover:bg-brand-accent hover:text-white transition-colors shadow-lg"
        >
          Start Your Project
        </Link>
      </div>
    </motion.section>
  );
}