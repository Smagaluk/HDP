import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import Hero from '@/components/home/Hero';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Capabilities from '@/components/home/Capabilities';
import Partners from '@/components/home/Partners';
import CTA from '@/components/home/CTA';

export default function Home() {
  const { data: projects } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: () => base44.entities.Project.filter({ featured: true }, 'order', 3),
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