"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
              Get in Touch
            </p>
            <h1 className="text-4xl lg:text-5xl font-medium text-[#070707] tracking-tight leading-tight">
              Let's start a conversation.
            </h1>
            <p className="mt-6 text-lg text-[#474E5E] leading-relaxed">
              Whether you're exploring a development opportunity, seeking a capital 
              partner, or interested in learning more about our work, we'd welcome 
              the opportunity to connect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {isSubmitted ? (
                  <div className="text-center py-16 px-8 bg-[#F3F2ED]">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                    <h2 className="text-2xl font-medium text-[#070707] mb-4">
                      Thank you for reaching out.
                    </h2>
                    <p className="text-[#474E5E] max-w-md mx-auto">
                      We've received your message and will respond within 1-2 business days.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium text-[#070707]">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className="mt-2 border-[#474E5E]/30 focus:border-[#1B2944] focus:ring-[#1B2944]"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-[#070707]">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="mt-2 border-[#474E5E]/30 focus:border-[#1B2944] focus:ring-[#1B2944]"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="company" className="text-sm font-medium text-[#070707]">
                          Company / Organization
                        </Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          className="mt-2 border-[#474E5E]/30 focus:border-[#1B2944] focus:ring-[#1B2944]"
                          placeholder="Your organization"
                        />
                      </div>
                      <div>
                        <Label htmlFor="interest" className="text-sm font-medium text-[#070707]">
                          Area of Interest
                        </Label>
                        <Select
                          value={formData.interest}
                          onValueChange={(value) => handleChange('interest', value)}
                        >
                          <SelectTrigger className="mt-2 border-[#474E5E]/30">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="investment">Investment Partnership</SelectItem>
                            <SelectItem value="development">Development Opportunity</SelectItem>
                            <SelectItem value="municipal">Municipal Partnership</SelectItem>
                            <SelectItem value="general">General Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-[#070707]">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className="mt-2 border-[#474E5E]/30 focus:border-[#1B2944] focus:ring-[#1B2944] resize-none"
                        placeholder="Tell us about your inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-8 py-4 bg-[#1B2944] hover:bg-[#070707] text-white font-medium h-auto"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-[#F3F2ED] p-8">
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-[#474E5E] mb-8">
                    Contact Information
                  </h3>

                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-[#1B2944] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-[#474E5E] uppercase tracking-wide mb-1">Email</p>
                        <a 
                          href="mailto:info@heritagedevpartners.com"
                          className="text-[#070707] hover:text-[#1B2944] transition-colors"
                        >
                          info@heritagedevpartners.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-[#1B2944] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-[#474E5E] uppercase tracking-wide mb-1">Location</p>
                        <p className="text-[#070707]">Michigan</p>
                        <p className="text-sm text-[#474E5E] mt-1">
                          Detroit · Grand Rapids · Northern Michigan
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-[#474E5E]/20">
                    <p className="text-sm text-[#474E5E] leading-relaxed">
                      We typically respond to inquiries within 1-2 business days. 
                      For urgent matters, please indicate so in your message.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-24 bg-[#F3F2ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl font-medium text-[#070707] mb-4">
              Our Focus: Michigan
            </h2>
            <p className="text-[#474E5E] max-w-2xl mx-auto mb-12">
              We develop and operate real estate across Michigan's major markets, 
              with deep expertise in Detroit, Grand Rapids, and Northern Michigan.
            </p>
            <div className="aspect-[21/9] bg-stone-200 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
                alt="Michigan landscape"
                width={1200}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}