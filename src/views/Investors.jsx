"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { createPageUrl } from '@/utils';
import { ArrowRight, TrendingUp, Clock, Shield, Users } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const principles = [
  {
    icon: TrendingUp,
    title: 'Risk-Adjusted Returns',
    description: 'We pursue attractive risk-adjusted returns through disciplined underwriting, not by taking outsized risks. Our focus on quality execution and capital preservation underpins everything we do.'
  },
  {
    icon: Clock,
    title: 'Long-Term Orientation',
    description: 'We align with capital partners who share our patient, long-term approach. We believe the best returns come from owning quality assets for extended periods.'
  },
  {
    icon: Shield,
    title: 'Transparency',
    description: 'We provide institutional-quality reporting and maintain open communication with our investors. We believe trust is built through transparency.'
  },
  {
    icon: Users,
    title: 'Alignment',
    description: 'We invest significant capital alongside our partners in every project. Our interests are aligned because we succeed only when our partners succeed.'
  }
];

const partnerTypes = [
  {
    title: 'Family Offices',
    description: 'We partner with family offices seeking direct real estate exposure with an experienced operating partner. Our flexible structures accommodate various investment preferences and hold periods.',
    features: ['Direct co-investment opportunities', 'Customized reporting', 'Flexible investment structures']
  },
  {
    title: 'Institutional Investors',
    description: 'We work with institutions seeking exposure to Michigan\'s growing markets through an established local platform with deep market knowledge and execution capability.',
    features: ['Institutional governance standards', 'Audited financials', 'Professional asset management']
  },
  {
    title: 'Municipalities & Institutions',
    description: 'We collaborate with public entities and institutions to structure developments that serve community needs while generating appropriate returns for all stakeholders.',
    features: ['Public-private partnership experience', 'Community stakeholder alignment', 'Complex incentive structuring']
  }
];

export default function Investors() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-[#F3F2ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-[#1B2944] mb-6">
                For Investors & Partners
              </p>
              <h1 className="text-4xl lg:text-5xl font-medium text-[#070707] tracking-tight leading-tight">
                Building lasting capital relationships.
              </h1>
              <p className="mt-6 text-lg text-[#474E5E] leading-relaxed">
                We seek partners who share our commitment to disciplined execution, 
                transparent communication, and long-term value creation. Our platform 
                offers direct access to Michigan real estate through an experienced 
                operator with deep local expertise.
              </p>
              <Link
                href={createPageUrl('Contact')}
                className="inline-flex items-center mt-8 px-8 py-4 bg-[#1B2944] text-white text-sm font-medium tracking-wide hover:bg-[#070707] transition-colors"
              >
                Start a Conversation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-stone-200 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80"
                  alt="Real estate investment"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investment Principles */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Approach"
            title="Investment principles that guide our partnerships."
            align="center"
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-[#F3F2ED]"
              >
                <principle.icon className="w-8 h-8 text-[#1B2944] mb-6" strokeWidth={1.5} />
                <h3 className="text-lg font-medium text-[#070707] mb-3">
                  {principle.title}
                </h3>
                <p className="text-[#474E5E] leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-24 lg:py-32 bg-[#F3F2ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Partnership Structures"
            title="Flexible structures for aligned partners."
          />
          <div className="mt-16 space-y-8">
            {partnerTypes.map((partner, index) => (
              <motion.div
                key={partner.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 lg:p-12 bg-white border border-[#474E5E]/20"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-medium text-[#070707] mb-4">
                      {partner.title}
                    </h3>
                    <p className="text-[#474E5E] leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                  <div className="lg:border-l lg:border-[#474E5E]/20 lg:pl-8">
                    <ul className="space-y-3">
                      {partner.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-[#474E5E]">
                          <div className="w-1.5 h-1.5 bg-[#1B2944] rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-[#1B2944] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-medium tracking-tight">
                Ready to explore a partnership?
              </h2>
              <p className="mt-6 text-lg text-[#F3F2ED]/80 leading-relaxed">
                We welcome conversations with potential capital partners interested 
                in Michigan real estate. Let's discuss how we might work together.
              </p>
            </div>
            <div className="lg:text-right">
              <Link
                href={createPageUrl('Contact')}
                className="inline-flex items-center px-8 py-4 bg-white text-[#070707] text-sm font-medium tracking-wide hover:bg-stone-100 transition-colors"
              >
                Contact Our Team
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <p className="mt-4 text-sm text-[#F3F2ED]/60">
                info@hrtgdev.com
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}