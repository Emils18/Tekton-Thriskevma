'use client';
import { motion } from 'framer-motion';
import { projects } from '@/lib/mockData';
import { projectImages } from '@/lib/images';
import { getBgImageStyle } from '@/lib/imageUtils';
import { notFound } from 'next/navigation';

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  const imgIndex = projects.findIndex(p => p.slug === params.slug);

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white/60 backdrop-blur-sm rounded-[4rem] p-8 md:p-12 shadow-xl border border-white/50">
        <div
          className="h-64 md:h-96 bg-cover bg-center rounded-[3rem] mb-8"
          style={getBgImageStyle(projectImages[imgIndex % projectImages.length], '#1B5E20')}
        />
        <h1 className="text-3xl font-bold text-brand-green">{project.title}</h1>
        <p className="text-brand-accent mt-1">
          {project.category} · {project.location} · {project.year}
        </p>
        <p className="mt-6 text-gray-700 leading-relaxed">{project.description}</p>
      </div>
    </motion.div>
  );
}