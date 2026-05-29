'use client';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '@/lib/motion';
import { services } from '@/lib/mockData';
import { serviceImages } from '@/lib/images';
import { getBgImageStyle } from '@/lib/imageUtils';

export default function ServicesPage() {
  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-16"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-4xl font-bold text-brand-green text-center mb-12" variants={fadeIn}>
        Our Services
      </motion.h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <motion.div
            key={service.id}
            id={service.slug}
            className="bg-white/60 backdrop-blur-sm rounded-[3rem] overflow-hidden shadow-md border border-white/50 hover:shadow-xl transition-all"
            variants={fadeIn}
            whileHover={{ scale: 1.03 }}
          >
            <div
              className="h-48 bg-cover bg-center"
              style={getBgImageStyle(serviceImages[idx % serviceImages.length], '#2E7D32')}
            />
            <div className="p-6">
              <span className="text-3xl mb-2 block">{service.icon}</span>
              <h2 className="text-2xl font-semibold text-brand-green">{service.title}</h2>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <ul className="mt-4 space-y-1">
                {service.features.map(f => (
                  <li key={f} className="text-sm text-brand-green/70 flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-accent rounded-full" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}