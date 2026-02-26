import React from 'react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, TrendingUp, Landmark, BarChart3 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const capabilities = [
  {
    icon: Building2,
    title: 'Development',
    description: 'Ground-up construction, adaptive reuse, and complex entitlements across residential and commercial asset classes.',
  },
  {
    icon: TrendingUp,
    title: 'Acquisitions',
    description: 'Stabilized and value-add multifamily and commercial assets, plus select opportunistic investments.',
  },
  {
    icon: Landmark,
    title: 'Capital Structuring',
    description: 'Tax credits, incentives, public-private partnerships, and creative debt and equity structures.',
  },
  {
    icon: BarChart3,
    title: 'Asset Management',
    description: 'Institutional-grade asset management, performance reporting, and transparent oversight focused on long-term value creation.',
  },
];

export default function Capabilities() {
  return (
    <section className="py-24 lg:py-32 bg-[#F3F2ED]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <SectionHeading
            eyebrow="What We Do"
            title="Full-Cycle Capabilities"
            description="We operate as an integrated platform, managing every stage of the real estate investment lifecycle."
          />
          <Link
            href={createPageUrl('Capabilities')}
            className="inline-flex items-center text-sm font-medium text-[#474E5E] hover:text-[#1B2944] transition-colors"
          >
            Learn More
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="p-8 bg-white border border-[#474E5E]/20 h-full hover:border-[#1B2944]/40 transition-colors">
                <capability.icon className="w-8 h-8 text-[#1B2944] mb-6" strokeWidth={1.5} />
                <h3 className="text-lg font-medium text-[#070707] mb-3">
                  {capability.title}
                </h3>
                <p className="text-sm text-[#474E5E] leading-relaxed">
                  {capability.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}