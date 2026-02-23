"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';
import Link from 'next/link';
import Image from 'next/image';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';

const defaultProjects = [
  {
    id: 1,
    name: 'Factory Yards',
    slug: 'factory-yards',
    location: 'Grand Rapids, MI',
    status: 'In Development',
    project_type: 'Mixed-Use',
    overview: 'Large-scale mixed-use redevelopment with adaptive reuse and ground-up components.',
    image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  },
  {
    id: 2,
    name: 'The Amo',
    slug: 'the-amo',
    location: 'Detroit, MI',
    status: 'Stabilized',
    project_type: 'Multifamily',
    overview: 'Value-add multifamily repositioning project focused on operational excellence.',
    image_url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
  },
  {
    id: 3,
    name: 'Trinity Health Grand Rapids',
    slug: 'trinity-health-gr',
    location: 'Grand Rapids, MI',
    status: 'Planning',
    project_type: 'Mixed-Use',
    overview: 'Early-stage mixed-use development partnership evaluating feasibility.',
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
];

const statusFilters = ['All', 'Planning', 'In Development', 'Under Construction', 'Stabilized', 'Completed'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.entities.Project.list('order'),
    initialData: [],
  });

  const displayProjects = projects?.length > 0 ? projects : defaultProjects;
  
  const filteredProjects = activeFilter === 'All' 
    ? displayProjects 
    : displayProjects.filter(p => p.status === activeFilter);

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-[#F3F2ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#1B2944] mb-6">
              Our Portfolio
            </p>
            <h1 className="text-4xl lg:text-5xl font-medium text-[#070707] tracking-tight leading-tight">
              Projects that create lasting value.
            </h1>
            <p className="mt-6 text-lg text-[#474E5E] leading-relaxed">
              From adaptive reuse of historic buildings to ground-up mixed-use development, 
              our portfolio reflects a disciplined approach to creating quality places.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {statusFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#1B2944] text-white'
                    : 'bg-[#F3F2ED] text-[#474E5E] hover:bg-[#474E5E]/20'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {filteredProjects.map((project, index) => (
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
                  <div className="aspect-[16/10] bg-[#F3F2ED] overflow-hidden mb-6">
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
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-[#474E5E]/60" />
                        <p className="text-sm text-[#474E5E]">{project.location}</p>
                      </div>
                      <h3 className="text-2xl font-medium text-[#070707] group-hover:text-[#1B2944] transition-colors">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-[#474E5E] leading-relaxed">
                        {project.overview}
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <span className="px-3 py-1 text-xs font-medium bg-[#F3F2ED] text-[#474E5E]">
                          {project.project_type}
                        </span>
                        <span className="px-3 py-1 text-xs font-medium bg-amber-50 text-[#1B2944]">
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-[#474E5E]/50 group-hover:text-[#1B2944] transition-colors flex-shrink-0" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#474E5E]">No projects found with this status.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}