import React from 'react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const partnerTypes = [
  {
    title: 'Family Offices',
    description: 'Long-term capital partnerships with aligned investment horizons and shared values.',
  },
  {
    title: 'Institutional Investors',
    description: 'Structured co-investment opportunities with institutional-grade reporting and governance.',
  },
  {
    title: 'Municipalities',
    description: 'Public-private partnerships that advance community goals and create lasting impact.',
  },
];

export default function Partners() {
  return (
    <section className="py-24 lg:py-32 bg-[#1B2944] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#F3F2ED]/60 mb-4">
              Partnership Approach
            </p>
            <h2 className="text-3xl lg:text-4xl font-medium tracking-tight leading-tight">
              Building lasting relationships with aligned partners.
            </h2>
            <p className="mt-6 text-lg text-[#F3F2ED]/80 leading-relaxed">
              We seek capital partners who share our commitment to disciplined 
              execution, transparent communication, and long-term value creation.
            </p>
            <Link
              href={createPageUrl('Investors')}
              className="inline-flex items-center mt-8 text-sm font-medium text-white hover:text-[#F3F2ED]/80 transition-colors"
            >
              Partner With Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>

          {/* Partner Types */}
          <div className="space-y-6">
            {partnerTypes.map((partner, index) => (
              <motion.div
                key={partner.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 border border-[#F3F2ED]/20 hover:border-[#F3F2ED]/40 transition-colors"
              >
                <h3 className="text-lg font-medium mb-2">{partner.title}</h3>
                <p className="text-[#F3F2ED]/70 text-sm leading-relaxed">
                  {partner.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}