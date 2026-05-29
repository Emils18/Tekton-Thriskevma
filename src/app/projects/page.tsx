'use client';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '@/lib/motion';
import { projects } from '@/lib/mockData';
import { projectImages } from '@/lib/images';
import { getBgImageStyle } from '@/lib/imageUtils';
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-16"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-4xl font-bold text-brand-green text-center mb-12" variants={fadeIn}>
        Our Projects
      </motion.h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div key={project.id} variants={fadeIn} whileHover={{ scale: 1.03 }}>
            <Link href={`/projects/${project.slug}`}>
              <div className="rounded-[4rem] overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow">
                <div
                  className="h-56 bg-cover bg-center"
                  style={getBgImageStyle(projectImages[idx % projectImages.length], '#1B5E20')}
                />
                <div className="p-6">
                  <h2 className="font-bold text-xl text-brand-green">{project.title}</h2>
                  <p className="text-sm text-brand-green/70">{project.location} · {project.year}</p>
                  <p className="text-sm text-gray-600 mt-2">{project.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}