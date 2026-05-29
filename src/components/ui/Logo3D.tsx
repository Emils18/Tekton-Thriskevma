'use client';
import { motion } from 'framer-motion';

export default function Logo3D() {
  return (
    <div className="w-12 h-12 relative flex items-center justify-center">
      {/* Rotating ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-brand-accent"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      {/* Inner ring (smaller) */}
      <motion.div
        className="absolute inset-1 rounded-full border border-brand-green"
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      {/* Glowing dot */}
      <motion.div
        className="absolute top-0.5 left-1/2 w-1 h-1 bg-brand-accent rounded-full -translate-x-1/2"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* "T" in center */}
      <span className="relative text-brand-green font-bold text-xl z-10">T</span>
    </div>
  );
}