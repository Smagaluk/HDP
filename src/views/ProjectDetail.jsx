"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Building2, CheckCircle } from 'lucide-react';
import ProjectGallery from '@/components/projects/ProjectGallery';

const defaultProjects = {
  'factory-yards': {
    name: 'Factory Yards',
    location: 'Grand Rapids, MI',
    status: 'In Development',
    project_type: 'Mixed-Use',
    overview: 'Factory Yards represents one of the most significant adaptive reuse projects in Grand Rapids. This large-scale mixed-use development transforms a historic industrial complex into a vibrant neighborhood featuring residential, retail, and commercial spaces.',
    investment_thesis: 'The project capitalizes on Grand Rapids\' growing demand for urban living combined with the city\'s strong preservation incentives. By combining adaptive reuse of historic structures with strategic ground-up development, the project achieves an attractive cost basis while creating a distinctive sense of place.',
    highlights: [
      'Historic industrial complex transformation',
      'Mixed-use program with residential, retail, and office',
      'Complex capital stack utilizing multiple incentive programs',
      'Public-private partnership structure',
      'Phased development approach reducing execution risk'
    ],
    square_feet: '450,000 SF',
    units: '280 residential units',
    image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    ],
  },
  'the-amo': {
    name: 'The Amo',
    location: 'Detroit, MI',
    status: 'Stabilized',
    project_type: 'Multifamily',
    overview: 'The Amo is a value-add multifamily repositioning in Detroit\'s historic Brush Park neighborhood. The project focuses on operational excellence, tenant experience improvements, and strategic capital investments to drive income growth and long-term value.',
    investment_thesis: 'Detroit\'s multifamily market presents compelling value-add opportunities as the city\'s revitalization continues. The Amo benefits from strong submarket fundamentals, limited new supply, and meaningful upside through improved operations and targeted renovations.',
    highlights: [
      'Value-add acquisition with below-market rents',
      'Comprehensive renovation program',
      'Operational improvements driving NOI growth',
      'Strong submarket with limited new supply',
      'Proximity to major employers and amenities'
    ],
    square_feet: '125,000 SF',
    units: '142 units',
    image_url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    ],
  },
  'trinity-health-gr': {
    name: 'Trinity Health Grand Rapids',
    location: 'Grand Rapids, MI',
    status: 'Planning',
    project_type: 'Mixed-Use',
    overview: 'Trinity Health Grand Rapids is an early-stage mixed-use development opportunity in partnership with one of Michigan\'s largest health systems. The project is currently in the feasibility and stakeholder alignment phase.',
    investment_thesis: 'Healthcare-anchored developments benefit from stable, creditworthy tenants and community support. This project explores the potential for a mixed-use development that serves both the healthcare system\'s needs and the surrounding community.',
    highlights: [
      'Healthcare system partnership',
      'Early-stage feasibility analysis',
      'Community stakeholder engagement',
      'Mixed-use program evaluation',
      'Long-term ground lease structure under consideration'
    ],
    square_feet: 'TBD',
    units: 'TBD',
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    ],
  },
  'FYNC': {
    name: 'Factory Yards - North Commercial',
    location: 'Grand Rapids, MI',
    status: 'In Development',
    project_type: 'Commercial',
    overview: 'Factory Yards North Commercial is a modern commercial development within the larger Factory Yards complex, featuring flexible industrial and office space designed to meet the needs of today\'s businesses.',
    investment_thesis: 'This development capitalizes on strong demand for quality commercial space in the Grand Rapids market, offering modern amenities and strategic location within the established Factory Yards development.',
    highlights: [
      'Modern commercial design',
      'Flexible space configurations',
      'Part of the larger Factory Yards development',
      'Strategic Grand Rapids location',
      'High-quality construction and finishes'
    ],
    square_feet: 'TBD',
    units: 'N/A',
    image_url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698a455ff3c68745519ec29b/538c79b0d_VIEW01-3.png',
    gallery_images: [
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698a455ff3c68745519ec29b/538c79b0d_VIEW01-3.png',
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698a455ff3c68745519ec29b/15759a85e_VIEW02-3.png',
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698a455ff3c68745519ec29b/d59b77f9c_VIEW03-3.png',
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698a455ff3c68745519ec29b/2bf1c40a3_VIEW04-3.png',
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698a455ff3c68745519ec29b/961717902_VIEW05-3.png',
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698a455ff3c68745519ec29b/6d66ddc57_VIEW06B.png',
    ],
  },
};

export default function ProjectDetail({ slug: slugProp }) {
  const slugFromUrl =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('slug')
      : null;
  const slug = slugProp ?? slugFromUrl ?? 'factory-yards';

  const { data: projects } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => api.entities.Project.filter({ slug }),
    enabled: !!slug,
    initialData: [],
  });

  const project = projects?.[0] || defaultProjects[slug] || defaultProjects['factory-yards'];

  return (
    <div className="pt-20 lg:pt-24">
      {/* Back Link */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <Link
            href={createPageUrl('Projects')}
            className="inline-flex items-center text-sm text-[#474E5E] hover:text-[#070707] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>

      {/* Hero Image Carousel */}
      <ProjectGallery 
        images={project.gallery_images?.length > 0 
          ? project.gallery_images 
          : [project.image_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80']
        } 
      />

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs font-semibold tracking-widest uppercase text-[#1B2944] mb-4">
                  {project.project_type}
                </p>
                <h1 className="text-4xl lg:text-5xl font-medium text-[#070707] tracking-tight">
                  {project.name}
                </h1>
                
                <div className="mt-8 prose prose-stone max-w-none">
                  <h2 className="text-xl font-medium text-[#070707] mt-0">Overview</h2>
                  <p className="text-[#474E5E] leading-relaxed">
                    {project.overview}
                  </p>

                  <h2 className="text-xl font-medium text-[#070707] mt-10">Investment Thesis</h2>
                  <p className="text-[#474E5E] leading-relaxed">
                    {project.investment_thesis}
                  </p>

                  <h2 className="text-xl font-medium text-[#070707] mt-10">Development Highlights</h2>
                  <ul className="space-y-3 mt-4">
                    {project.highlights?.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3 text-[#474E5E]">
                        <CheckCircle className="w-5 h-5 text-[#1B2944] flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Video Embed for FYNC */}
                  {slug === 'FYNC' && (
                    <div className="mt-10 flex justify-center">
                      <iframe 
                        title="vimeo-player" 
                        src="https://player.vimeo.com/video/917642924?h=128b1ac127" 
                        width="640" 
                        height="360" 
                        frameBorder="0" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                        allowFullScreen
                        className="max-w-full"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-32"
              >
                <div className="bg-[#F3F2ED] p-8">
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-[#474E5E] mb-6">
                    Project Details
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-[#474E5E]/60 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#474E5E] uppercase tracking-wide mb-1">Location</p>
                        <p className="text-[#070707] font-medium">{project.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Calendar className="w-5 h-5 text-[#474E5E]/60 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#474E5E] uppercase tracking-wide mb-1">Status</p>
                        <p className="text-[#070707] font-medium">{project.status}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Building2 className="w-5 h-5 text-[#474E5E]/60 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#474E5E] uppercase tracking-wide mb-1">Project Type</p>
                        <p className="text-[#070707] font-medium">{project.project_type}</p>
                      </div>
                    </div>

                    {project.square_feet && (
                      <div className="pt-6 border-t border-[#474E5E]/20">
                        <p className="text-xs text-[#474E5E] uppercase tracking-wide mb-1">Size</p>
                        <p className="text-[#070707] font-medium">{project.square_feet}</p>
                      </div>
                    )}

                    {project.units && (
                      <div>
                        <p className="text-xs text-[#474E5E] uppercase tracking-wide mb-1">Units</p>
                        <p className="text-[#070707] font-medium">{project.units}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#474E5E]/20">
                    <Link
                      href={createPageUrl('Contact')}
                      className="block w-full text-center px-6 py-3 bg-[#1B2944] text-white text-sm font-medium hover:bg-[#070707] transition-colors"
                    >
                      Inquire About This Project
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}