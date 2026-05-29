'use client';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

const stats = [
  { label: 'Projects Completed', value: 50 },
  { label: 'Years Experience', value: 12 },
  { label: 'Happy Clients', value: 30 },
  { label: 'Team Members', value: 25 },
];

function AnimatedNumber({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: 'easeOut' });
    return controls.stop;
  }, []);

  return <motion.span>{rounded}</motion.span>;
}

export default function Stats() {
  return (
    <section className="py-16 bg-white/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-4xl md:text-5xl font-bold text-brand-accent">
              <AnimatedNumber value={stat.value} />+
            </p>
            <p className="text-sm text-brand-green/70">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}