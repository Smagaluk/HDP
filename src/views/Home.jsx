"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';
import Hero from '@/components/home/Hero';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Capabilities from '@/components/home/Capabilities';
import Partners from '@/components/home/Partners';
import CTA from '@/components/home/CTA';

export default function Home() {
  const { data: projects } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: () => api.entities.Project.filter({ featured: true }, 'order', 3),
    initialData: [],
  });

  return (
    <div>
      <Hero />
      <FeaturedProjects projects={projects} />
      <Capabilities />
      <Partners />
      <CTA />
    </div>
  );
}