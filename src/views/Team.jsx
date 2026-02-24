"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const leadership = [
  {
    name: 'Ben Smith',
    title: 'Managing Partner',
    image: '/website-assets/Other Images/Ben Smith_headshot.jpg',
    bio: [
      'Ben is an experienced real estate professional with over 20 years of diverse experience across many areas of the industry. Prior to joining Heritage Development Partners, Ben spent time as a principal with an investment firm focused on syndications for value-add multifamily investments, and previously was a partner with a large Midwest-based real estate investment advisory and asset management firm, helping to oversee over $1 billion in investments on behalf of institutional and family office/high net worth clients.',
      "Ben's expertise includes deep experience in deal structuring, financial underwriting, and creative capital stack creation. Ben also has extensive experience in the full lifecycle of the real estate development process from acquisition, design, and entitlement through project completion.",
      "Ben holds a Master's Degree in Urban Planning with an emphasis on real estate finance and development from the University of Michigan. Outside of the office, he enjoys spending time with family, exploring new culinary endeavors, traveling, and relaxing on the shores of any lake that will have him.",
    ],
  },
  {
    name: 'Scott Magaluk',
    title: 'Managing Partner',
    image: '/website-assets/Other Images/Scott MagalukHeadshot_8821.jpg',
    bio: [
      'Scott possesses over eight years of expertise in the commercial real estate sector, having successfully sourced, developed, and managed assets totaling $45M. His comprehensive experience spans construction management, asset management, and fostering robust investor relations.',
      'Before joining Heritage Development Partners, Scott was instrumental in the development of over 75,000 square feet of historic adaptive reuse projects in Baltimore, MD, through his association with Urban Scene Development. He specialized in leveraging project incentives, notably federal and state historic tax credits as well as new markets tax credits.',
      "Scott earned both an MBA and a Masters in Real Estate and Infrastructure from the Johns Hopkins Carey Business School. Outside of his professional commitments, Scott cherishes moments with his family, has a penchant for exploring new destinations, and relishes outdoor activities.",
    ],
  },
];

const advisors = [
  {
    name: 'Advisor One',
    title: 'Capital Markets',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80',
    bio: 'Seasoned professional with expertise in institutional capital formation and structured finance for real estate development.',
  },
  {
    name: 'Advisor Two',
    title: 'Development & Entitlements',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
    bio: 'Extensive background in land use planning, entitlements, and navigating complex municipal approval processes.',
  },
  {
    name: 'Advisor Three',
    title: 'Construction & Operations',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80',
    bio: 'Deep experience in construction management and asset operations across multifamily and mixed-use portfolios.',
  },
];

export default function Team() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-[#F3F2ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#1B2944] mb-6">
              Our Team
            </p>
            <h1 className="text-4xl lg:text-5xl font-medium text-[#070707] tracking-tight leading-tight">
              Meet the Team
            </h1>
            <p className="mt-6 text-lg text-[#474E5E] leading-relaxed max-w-2xl">
              Our team brings together decades of experience in real estate development, 
              investment management, and capital structuring. We combine institutional 
              discipline with entrepreneurial execution to deliver results for our partners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Leadership"
            title="Meet our partners."
            align="center"
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {leadership.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8"
              >
                <div className="aspect-[4/5] bg-stone-200 mb-6 overflow-hidden">
                  <Image
                    src={person.image}
                    alt={person.name}
                    width={400}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-medium text-[#070707] mb-1">
                  {person.name}
                </h3>
                <p className="text-sm text-[#1B2944] font-medium mb-4">
                  {person.title}
                </p>
                <div className="space-y-4">
                  {person.bio.map((paragraph, i) => (
                    <p key={i} className="text-[#474E5E] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors / Team Members */}
      <section className="py-24 lg:py-32 bg-[#F3F2ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Advisors & Partners"
            title="Extended team expertise."
            align="center"
            description="Strategic advisors and partners who support our execution across capital, development, and operations."
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {advisors.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8"
              >
                <div className="aspect-square bg-stone-200 mb-6 overflow-hidden">
                  <Image
                    src={person.image}
                    alt={person.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium text-[#070707] mb-1">
                  {person.name}
                </h3>
                <p className="text-sm text-[#1B2944] font-medium mb-4">
                  {person.title}
                </p>
                <p className="text-[#474E5E] leading-relaxed text-sm">
                  {person.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-[#F3F2ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-medium text-[#070707] tracking-tight">
              Ready to learn more?
            </h2>
            <p className="mt-4 text-lg text-[#474E5E]">
              Explore our portfolio or get in touch to discuss partnership opportunities.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={createPageUrl('Projects')}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#1B2944] text-white text-sm font-medium tracking-wide hover:bg-[#070707] transition-colors"
              >
                View Our Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href={createPageUrl('Contact')}
                className="inline-flex items-center justify-center px-8 py-4 border border-[#474E5E] text-[#070707] text-sm font-medium tracking-wide hover:border-[#1B2944] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
