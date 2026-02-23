import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

export default function FeaturedProjects({ projects }) {
  const displayProjects = projects?.length > 0 ? projects : [
    {
      id: 1,
      name: 'Factory Yards',
      location: 'Grand Rapids, MI',
      project_type: 'Mixed-Use',
      status: 'In Development',
      slug: 'factory-yards',
      image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'
    },
    {
      id: 2,
      name: 'The Amo',
      location: 'Detroit, MI',
      project_type: 'Multifamily',
      status: 'Stabilized',
      slug: 'the-amo',
      image_url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80'
    },
    {
      id: 3,
      name: 'Trinity Health Grand Rapids',
      location: 'Grand Rapids, MI',
      project_type: 'Mixed-Use',
      status: 'Planning',
      slug: 'trinity-health-gr',
      image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured Projects"
            description="A selection of our current and completed developments across Michigan."
          />
          <Link
            href={createPageUrl('Projects')}
            className="inline-flex items-center text-sm font-medium text-[#474E5E] hover:text-[#1B2944] transition-colors"
          >
            View All Projects
            <ArrowUpRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={createPageUrl(`ProjectDetail?slug=${project.slug}`)}
                className="group block"
              >
                <div className="aspect-[4/3] bg-[#F3F2ED] overflow-hidden mb-6">
                  <Image
                    src={project.image_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'}
                    alt={project.name}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium tracking-wide uppercase text-[#474E5E] mb-2">
                      {project.location}
                    </p>
                    <h3 className="text-xl font-medium text-[#070707] group-hover:text-[#1B2944] transition-colors">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#474E5E]">
                      {project.project_type} · {project.status}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#474E5E] group-hover:text-[#1B2944] transition-colors flex-shrink-0 mt-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}