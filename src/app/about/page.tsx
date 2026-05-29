'use client';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '@/lib/motion';
import { team } from '@/lib/mockData';

export default function About() {
  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-16"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-4xl font-bold text-brand-green text-center mb-12" variants={fadeIn}>
        About Us
      </motion.h1>
      <motion.div className="max-w-3xl mx-auto space-y-8 text-center" variants={fadeIn}>
        <p className="text-lg text-brand-green/80">
          Founded in 2022, Tekton Thriskevma Corp. brings over a decade of combined experience in construction and development.
        </p>
        <blockquote className="border-l-4 border-brand-accent pl-6 italic text-brand-green/70">
          “To build with purpose—providing construction solutions that are high‑quality, visually inspiring, and environmentally responsible.”
        </blockquote>
      </motion.div>
      <motion.h2 className="text-2xl font-bold text-brand-green text-center mt-16 mb-8" variants={fadeIn}>
        Leadership Team
      </motion.h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map(person => (
          <motion.div
            key={person.name}
            className="bg-white/60 backdrop-blur-sm rounded-[3rem] p-6 shadow-md border border-white/50 text-center"
            variants={fadeIn}
            whileHover={{ scale: 1.03 }}
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-brand-light-green mb-4 flex items-center justify-center text-2xl">👤</div>
            <h3 className="font-semibold text-brand-green">{person.name}</h3>
            <p className="text-sm text-brand-green/60">{person.role}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}