'use client';
import { motion } from 'framer-motion';
import { staggerContainer, scaleUp, hoverScale } from '@/lib/motion';
import { services } from '@/lib/mockData';
import { serviceImages } from '@/lib/images';
import { getBgImageStyle } from '@/lib/imageUtils';
import Link from 'next/link';

export default function ServiceCards() {
  return (
    <motion.section
      className="py-20 max-w-7xl mx-auto px-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2 className="text-4xl font-bold text-center text-brand-green mb-16" variants={scaleUp}>
        Our Services
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <motion.div
            key={service.id}
            variants={scaleUp}
            {...hoverScale}
            className="rounded-[3rem] overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow group"
          >
            <div
              className="h-48 bg-cover bg-center"
              style={getBgImageStyle(serviceImages[idx % serviceImages.length], '#2E7D32')}
            />
            <div className="p-6 text-center">
              <span className="text-4xl mb-3 block">{service.icon}</span>
              <h3 className="font-semibold text-xl text-brand-green mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
              <Link
                href={`/services#${service.slug}`}
                className="mt-4 inline-block text-brand-accent text-sm font-medium hover:underline"
              >
                Learn more →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}