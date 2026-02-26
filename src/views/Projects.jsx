"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';
import Link from 'next/link';
import Image from 'next/image';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';

function parseSquareFeet(value) {
  if (value == null || value === '') return 0;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value !== 'string') return 0;
  const cleaned = value.replace(/[^0-9.]/g, '');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function AnimatedTotalSqFt({ total, durationMs = 1000 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (total <= 0) {
      setDisplay(0);
      return;
    }
    let startTime = null;
    function tick(timestamp) {
      if (startTime == null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / durationMs, 1);
      const easeOut = 1 - (1 - t) ** 3;
      setDisplay(Math.round(easeOut * total));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [total, durationMs]);
  return <>{display.toLocaleString()}</>;
}

const defaultProjects = [
  { id: 1, name: '19 Central', slug: '19central', location: 'Cambridge, MA', status: 'Completed', project_type: 'Multifamily', square_feet: '32,000 sqft', image_url: '/website-assets/Project Images/19 Central/213_Somerville (4).jpg' },
  { id: 2, name: 'Factory Yards - Ground up', slug: 'FYGU', location: 'Grand Rapids, MI', status: 'Planning', project_type: 'Multifamily', square_feet: '84000', image_url: '' },
  { id: 3, name: 'Factory Yards - North Commercial', slug: 'FYNC', location: 'Grand Rapids, MI', status: 'Under Construction', project_type: 'Commercial', square_feet: '22,400 sqft', image_url: '/website-assets/Project Images/FYNC/FYNC_3.png' },
  { id: 4, name: 'Factory Yards - South Commercial', slug: 'FYSC', location: 'Grand Rapids, MI', status: 'Planning', project_type: 'Commercial', square_feet: '67,000 sqft', image_url: '/website-assets/Project Images/FYSC/East Elevation.jpg' },
  { id: 5, name: '38 Gibson', slug: 'Gibson', location: 'Cambridge, MA', status: 'Completed', project_type: 'Multifamily', square_feet: '', image_url: '/website-assets/Project Images/Gibson/016_Cambridge (14).jpg' },
  { id: 6, name: 'Factory Yards - Mixed Use', slug: 'factory-yards', location: 'Grand Rapids, MI', status: 'In Development', project_type: 'Mixed-Use', square_feet: '450,000 SF', image_url: '/website-assets/Project Images/FYMU/Site Overview-1.jpg' },
  { id: 7, name: 'The Amo', slug: 'the-amo', location: 'Detroit, MI', status: 'Stabilized', project_type: 'Multifamily', square_feet: '125,000 SF', image_url: '/website-assets/Project Images/The Amo/66 Adelaide St Detroit MI.JPG' },
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

  const totalSqFt = useMemo(() => {
    return displayProjects.reduce((sum, p) => sum + parseSquareFeet(p.square_feet ?? ''), 0);
  }, [displayProjects]);
  
  const filteredProjects = activeFilter === 'All' 
    ? displayProjects 
    : displayProjects.filter(p => p.status === activeFilter);

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-[#F3F2ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-[#1B2944] mb-6">
                Our Portfolio
              </p>
              <h1 className="text-4xl lg:text-5xl font-medium text-[#070707] tracking-tight leading-tight">
                Projects that create lasting value.
              </h1>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 items-start mt-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-[#474E5E] leading-relaxed max-w-3xl lg:col-span-7"
              >
                From adaptive reuse of historic buildings to ground-up mixed-use development, 
                our portfolio reflects a disciplined approach to creating quality places.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-10 lg:mt-0 lg:col-span-5 lg:flex lg:justify-end lg:items-center"
              >
                <div className="text-left lg:text-right">
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#1B2944] mb-2">
                    Portfolio total
                  </p>
                  <p className="text-4xl lg:text-5xl font-medium text-[#070707] tracking-tight">
                    <AnimatedTotalSqFt total={totalSqFt} durationMs={1000} />
                    <span className="text-2xl lg:text-3xl font-normal text-[#474E5E] ml-1">
                      sq ft
                    </span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
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
                      <div className="mt-3 flex items-center gap-3">
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