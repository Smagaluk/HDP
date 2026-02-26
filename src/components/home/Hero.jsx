import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#F3F2ED]">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F3F2ED]/50 to-transparent" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-[#1B2944] mb-6">
                Real Estate Investment and Development
              </p>
              <div className="max-w-xl overflow-hidden" aria-label="Thoughtful development. Disciplined investment. Building Legacy.">
                <motion.div
                  className="flex w-max gap-6 md:gap-8 font-semibold text-[#070707] tracking-tight leading-[1.1] text-[1.78rem] md:text-[2.37rem] lg:text-[2.95rem]"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{
                    x: {
                      duration: 23.44,
                      repeat: Infinity,
                      repeatType: 'loop',
                      ease: 'linear',
                    },
                  }}
                >
                  <span>Thoughtful development.</span>
                  <span>Disciplined investment.</span>
                  <span>Building Legacy.</span>
                  <span className="select-none" aria-hidden>Thoughtful development.</span>
                  <span className="select-none" aria-hidden>Disciplined investment.</span>
                  <span className="select-none" aria-hidden>Building Legacy.</span>
                </motion.div>
              </div>
              <p className="mt-8 text-lg lg:text-xl text-[#474E5E] leading-relaxed max-w-xl">
                Heritage Development Partners is a fully integrated real estate
                investment, development, and management firm focused on
                multifamily, commercial and mixed-use assets across Michigan and
                select Midwest markets. We specialize in complex projects and
                adaptive reuse, combining rigorous underwriting with hands-on
                execution to create durable, long-term value for our partners and
                the communities we serve.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href={createPageUrl('Projects')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#1B2944] text-white text-sm font-medium tracking-wide hover:bg-[#070707] transition-colors"
                >
                  View Projects
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  href={createPageUrl('Contact')}
                  className="inline-flex items-center justify-center px-8 py-4 border border-[#474E5E] text-[#070707] text-sm font-medium tracking-wide hover:border-[#1B2944] transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-stone-200 overflow-hidden">
              <Image
                src="/website-assets/Other Images/Home Page image.JPG"
                alt="Historic brick factory adaptive reuse building"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#1B2944]/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}