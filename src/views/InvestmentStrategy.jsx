"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { createPageUrl } from '@/utils';
import { ArrowRight, MapPin, Layers, Landmark, HandHelping, Shield, ShieldCheck } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const pillars = [
  {
    icon: MapPin,
    title: 'Market Focus',
    description: 'Select markets with strong fundamentals, diverse employment bases, and long-term demographic stability.',
  },
  {
    icon: Layers,
    title: 'Complexity Advantage',
    description: 'Adaptive reuse, entitlement-heavy, and structurally complex projects where experience, creativity, and execution matter.',
  },
  {
    icon: Landmark,
    title: 'Capital Discipline',
    description: 'Thoughtfully structured capital stacks utilizing tax credits, incentives, public financing, as well as conventional debt and equity—paired with conservative leverage and realistic business plans.',
  },
  {
    icon: HandHelping,
    title: 'Active Ownership',
    description: 'Hands-on involvement throughout development, stabilization, and long-term operations to preserve value and manage risk.',
  },
  {
    icon: Shield,
    title: 'Alignment & Transparency',
    description: 'We invest alongside our partners and structure each transaction to ensure alignment of interests. Institutional asset management processes, transparent reporting, and consistent communication are foundational to how we operate and to the long-term relationships we build.',
  },
  {
    icon: ShieldCheck,
    title: 'Conservative Underwriting',
    description: 'Rigorous underwriting that emphasizes downside protection and realistic assumptions. We structure each investment to manage downside risk and hedge against unpredictable market conditions—ensuring durability through economic cycles.',
  },
];

export default function InvestmentStrategy() {
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
              About
            </p>
            <h1 className="text-4xl lg:text-5xl font-medium text-[#070707] tracking-tight leading-tight">
              Investment Strategy
            </h1>
            <p className="mt-6 text-lg text-[#474E5E] leading-relaxed max-w-2xl">
              Our long-term, fundamentals-driven approach to real estate investment is built on selectivity, discipline, and alignment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-xl">
              <SectionHeading
                eyebrow="Our Approach"
                title="Fundamentals-driven investment."
              />
              <div className="mt-8 space-y-6 text-[#474E5E] leading-relaxed">
                <p>
                  Heritage Development Partners takes a long-term, fundamentals-driven approach to real estate investment. We focus on markets we know deeply, assets we can underwrite conservatively, and projects where thoughtful execution and sophisticated capital structuring create durable value.
                </p>
                <p>
                  We specialize in complex investments that require tailored capital solutions. Our team designs and executes capital stacks that incorporate tax credits, public incentives, and alternative financing mechanisms alongside traditional debt and equity—allowing us to unlock opportunities, manage risk, and enhance returns.
                </p>
                <p>
                  We are selective by design. Each opportunity is evaluated through a rigorous underwriting process that emphasizes downside protection, realistic assumptions, and alignment among all stakeholders.
                </p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative order-first lg:order-last"
            >
              <div className="aspect-[4/3] bg-stone-200 overflow-hidden">
                <Image
                  src="/website-assets/Other Images/Home Page image.JPG"
                  alt="Commercial real estate development"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investment Philosophy - Pillars */}
      <section className="py-24 lg:py-32 bg-[#F3F2ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Investment Philosophy"
            title="Our strategy centers on:"
            align="center"
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 border border-[#474E5E]/20 hover:border-[#1B2944]/40 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#F3F2ED] rounded-full mb-6">
                  <pillar.icon className="w-7 h-7 text-[#1B2944]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-[#070707] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-[#474E5E] leading-relaxed text-sm">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
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
