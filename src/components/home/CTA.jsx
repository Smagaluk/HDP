import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#070707] tracking-tight">
            Let's build something lasting together.
          </h2>
          <p className="mt-6 text-lg text-[#474E5E] leading-relaxed">
            Whether you're exploring a development opportunity, seeking a capital 
            partner, or interested in our approach, we'd welcome the conversation.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to={createPageUrl('Contact')}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#1B2944] text-white text-sm font-medium tracking-wide hover:bg-[#070707] transition-colors"
            >
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              to={createPageUrl('About')}
              className="inline-flex items-center justify-center px-8 py-4 border border-[#474E5E] text-[#070707] text-sm font-medium tracking-wide hover:border-[#1B2944] transition-colors"
            >
              Learn About Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}