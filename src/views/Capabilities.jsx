"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { ArrowRight, Building2, TrendingUp, Landmark, BarChart3 } from 'lucide-react';

const capabilities = [
  {
    id: 'development',
    icon: Building2,
    title: 'Development',
    description: 'We manage the full development lifecycle, from site selection and entitlements through construction and lease-up.',
    items: [
      {
        title: 'Ground-Up Development',
        description: 'New construction across multifamily, mixed-use, and commercial asset classes, with a focus on quality design and efficient execution.'
      },
      {
        title: 'Adaptive Reuse',
        description: 'Transforming historic and underutilized buildings into productive community assets, often utilizing tax credit and incentive programs.'
      },
      {
        title: 'Entitlements & Approvals',
        description: 'Navigating complex zoning, permitting, and stakeholder approval processes with experience and professionalism.'
      }
    ]
  },
  {
    id: 'acquisitions',
    icon: TrendingUp,
    title: 'Acquisitions',
    description: 'We identify and execute on opportunities across the risk-return spectrum, always with disciplined underwriting.',
    items: [
      {
        title: 'Value-Add Multifamily',
        description: 'Acquiring well-located properties with operational or physical improvement opportunities to drive income growth.'
      },
      {
        title: 'Stabilized Assets',
        description: 'Core-plus investments in quality properties with stable cash flows and long-term value preservation.'
      },
      {
        title: 'Opportunistic Investments',
        description: 'Complex situations requiring creativity and execution capability, including distressed assets and special situations.'
      }
    ]
  },
  {
    id: 'capital',
    icon: Landmark,
    title: 'Capital Structuring',
    description: 'We structure transactions to optimize returns while managing risk through creative capital solutions.',
    items: [
      {
        title: 'Incentives & Tax Credits',
        description: 'Deep experience with historic tax credits, new markets tax credits, brownfield incentives, and other programs.'
      },
      {
        title: 'Public-Private Partnerships',
        description: 'Structuring collaborations with municipalities, health systems, and institutions to achieve shared objectives.'
      },
      {
        title: 'Debt & Equity Structuring',
        description: 'Accessing institutional debt markets and equity capital from family offices and institutional investors.'
      }
    ]
  },
  {
    id: 'asset-management',
    icon: BarChart3,
    title: 'Asset Management',
    description: 'We actively manage our portfolio to protect capital and maximize long-term value creation.',
    items: [
      {
        title: 'Operational Oversight',
        description: 'Hands-on management of property operations, vendor relationships, and capital improvement programs.'
      },
      {
        title: 'Reporting & Analytics',
        description: 'Institutional-quality reporting and performance analytics for our investors and partners.'
      },
      {
        title: 'Value Creation',
        description: 'Continuous evaluation of repositioning opportunities, refinancing, and disposition strategies.'
      }
    ]
  }
];

export default function Capabilities() {
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
              What We Do
            </p>
            <h1 className="text-4xl lg:text-5xl font-medium text-[#070707] tracking-tight leading-tight">
              Full-cycle real estate investment capabilities.
            </h1>
            <p className="mt-6 text-lg text-[#474E5E] leading-relaxed">
              We operate as an integrated platform, managing every stage of the real 
              estate investment lifecycle—from sourcing and structuring through development, 
              operations, and disposition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-24">
            {capabilities.map((capability, _capIndex) => (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12"
              >
                <div className="lg:col-span-4">
                  <div className="sticky top-32">
                    <capability.icon className="w-10 h-10 text-[#1B2944] mb-6" strokeWidth={1.5} />
                    <h2 className="text-2xl lg:text-3xl font-medium text-[#070707]">
                      {capability.title}
                    </h2>
                    <p className="mt-4 text-[#474E5E] leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="space-y-8">
                    {capability.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                        className="p-8 bg-[#F3F2ED] border-l-2 border-[#1B2944]"
                      >
                        <h3 className="text-lg font-medium text-[#070707] mb-3">
                          {item.title}
                        </h3>
                        <p className="text-[#474E5E] leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    ))}
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
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-medium tracking-tight">
              Have a project in mind?
            </h2>
            <p className="mt-6 text-lg text-[#F3F2ED]/80">
              We're always interested in exploring new opportunities with aligned partners.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={createPageUrl('Contact')}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#070707] text-sm font-medium tracking-wide hover:bg-[#F3F2ED] transition-colors"
              >
                Get in Touch
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href={createPageUrl('Projects')}
                className="inline-flex items-center justify-center px-8 py-4 border border-[#F3F2ED]/30 text-white text-sm font-medium tracking-wide hover:border-white transition-colors"
              >
                View Our Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}