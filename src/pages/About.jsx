import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Shield, Target, Users, Award } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We operate with transparency and honesty in every interaction, building trust through consistent action.',
  },
  {
    icon: Target,
    title: 'Discipline',
    description: 'Rigorous underwriting, patient capital deployment, and measured decision-making guide our approach.',
  },
  {
    icon: Users,
    title: 'Professionalism',
    description: 'We maintain the highest standards in execution, communication, and stakeholder management.',
  },
  {
    icon: Award,
    title: 'Quality',
    description: 'Excellence in design, construction, and operations creates lasting value for communities and investors.',
  },
];

export default function About() {
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
                About Us
              </p>
              <h1 className="text-4xl lg:text-5xl font-medium text-[#070707] tracking-tight leading-tight">
                A thoughtful approach to real estate development.
              </h1>
              <p className="mt-6 text-lg text-[#474E5E] leading-relaxed">
                Heritage Development Partners was founded on the belief that disciplined 
                execution and long-term thinking create the most durable value—for investors, 
                communities, and partners alike.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-stone-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Heritage Development Partners office"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Our Story"
              title="Built on experience, driven by purpose."
            />
            <div className="mt-8 space-y-6 text-[#474E5E] leading-relaxed">
              <p>
                Heritage Development Partners brings together deep expertise in real estate 
                development, investment management, and capital structuring. Our team has 
                developed and managed billions of dollars in real estate across Michigan, 
                with a particular focus on projects that require creativity, persistence, 
                and long-term commitment.
              </p>
              <p>
                We specialize in adaptive reuse and mixed-use developments that transform 
                underutilized properties into vibrant community assets. Our work in historic 
                preservation, complex capital stacks, and public-private partnerships has 
                earned us a reputation as a trusted partner for municipalities, institutions, 
                and family offices alike.
              </p>
              <p>
                Every project we undertake reflects our core belief: that responsible 
                development can generate attractive returns while creating lasting positive 
                impact for the communities we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 lg:py-32 bg-[#F3F2ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Leadership"
            title="Meet our partners."
            align="center"
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Ben Smith */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8"
            >
              <div className="aspect-[4/5] bg-stone-200 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
                  alt="Ben Smith"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-medium text-[#070707] mb-1">
                Ben Smith
              </h3>
              <p className="text-sm text-[#1B2944] font-medium mb-4">
                Managing Partner
              </p>
              <p className="text-[#474E5E] leading-relaxed">
                Ben is an experienced real estate professional with over 20 years of diverse experience across many areas of the industry. Prior to joining Heritage Development Partners, Ben spent time as a principal with an investment firm focused on syndications for value-add multifamily investments, and previously was a partner with a large Midwest-based real estate investment advisory and asset management firm, helping to oversee over $1 billion in investments on behalf of institutional and family office/high net worth clients.
              </p>
              <p className="text-[#474E5E] leading-relaxed mt-4">
                Ben&apos;s expertise includes deep experience in deal structuring, financial underwriting, and creative capital stack creation. Ben also has extensive experience in the full lifecycle of the real estate development process from acquisition, design, and entitlement through project completion.
              </p>
              <p className="text-[#474E5E] leading-relaxed mt-4">
                Ben holds a Master&apos;s Degree in Urban Planning with an emphasis on real estate finance and development from the University of Michigan. Outside of the office, he enjoys spending time with family, exploring new culinary endeavors, traveling, and relaxing on the shores of any lake that will have him.
              </p>
            </motion.div>

            {/* Scott Magaluk */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8"
            >
              <div className="aspect-[4/5] bg-stone-200 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
                  alt="Scott Magaluk"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-medium text-[#070707] mb-1">
                Scott Magaluk
              </h3>
              <p className="text-sm text-[#1B2944] font-medium mb-4">
                Managing Partner
              </p>
              <p className="text-[#474E5E] leading-relaxed">
                Scott possesses over eight years of expertise in the commercial real estate sector, having successfully sourced, developed, and managed assets totaling $45M. His comprehensive experience spans construction management, asset management, and fostering robust investor relations.
              </p>
              <p className="text-[#474E5E] leading-relaxed mt-4">
                Before joining Heritage Development Partners, Scott was instrumental in the development of over 75,000 square feet of historic adaptive reuse projects in Baltimore, MD, through his association with Urban Scene Development. He specialized in leveraging project incentives, notably federal and state historic tax credits as well as new markets tax credits.
              </p>
              <p className="text-[#474E5E] leading-relaxed mt-4">
                Scott earned both an MBA and a Masters in Real Estate and Infrastructure from the Johns Hopkins Carey Business School. Outside of his professional commitments, Scott cherishes moments with his family, has a penchant for exploring new destinations, and relishes outdoor activities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Values"
            title="Principles that guide every decision."
            align="center"
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white border border-[#474E5E]/20 rounded-full mb-6">
                  <value.icon className="w-7 h-7 text-[#1B2944]" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-[#070707] mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-[#474E5E] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 lg:py-32 bg-[#F3F2ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-[#1B2944] mb-6">
                Our Mission
              </p>
              <blockquote className="text-2xl lg:text-3xl font-medium leading-relaxed text-[#070707]">
                "To create lasting value through disciplined real estate investment and 
                development, building places that strengthen communities and deliver 
                consistent returns for our partners."
              </blockquote>
            </motion.div>
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
                to={createPageUrl('Projects')}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#1B2944] text-white text-sm font-medium tracking-wide hover:bg-[#070707] transition-colors"
              >
                View Our Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to={createPageUrl('Contact')}
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