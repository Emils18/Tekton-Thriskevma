'use client';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn, hoverScale, glowOnHover } from '@/lib/motion';
import { projects } from '@/lib/mockData';
import { projectImages } from '@/lib/images';
import { getBgImageStyle } from '@/lib/imageUtils';
import Link from 'next/link';

export default function FeaturedProjects() {
  const featured = projects.filter(p => p.featured);
  return (
    <motion.section
      className="py-20 bg-brand-light-green/30"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 className="text-4xl font-bold text-center text-brand-green mb-16" variants={fadeIn}>
          Featured Projects
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featured.map((project, idx) => (
            <motion.div key={project.id} variants={fadeIn} {...hoverScale}>
              <Link href={`/projects/${project.slug}`}>
                <div className={`rounded-[3rem] overflow-hidden bg-white shadow-xl ${glowOnHover}`}>
                  <div
                    className="h-64 bg-cover bg-center"
                   style={getBgImageStyle(projectImages[idx % projectImages.length], '#1B5E20')}
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-2xl text-brand-green mb-2">{project.title}</h3>
                    <p className="text-sm text-brand-green/70">{project.location} · {project.year}</p>
                    <p className="mt-2 text-gray-600">{project.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}