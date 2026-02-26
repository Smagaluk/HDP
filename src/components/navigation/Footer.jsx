import React from 'react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';

const footerLinks = [
{ name: 'About', page: 'About' },
{ name: 'Projects', page: 'Projects' },
{ name: 'Capabilities', page: 'Capabilities' },
{ name: 'Investors', page: 'Investors' },
{ name: 'Contact', page: 'Contact' }];


export default function Footer() {
  return (
    <footer className="bg-[#1B2944] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Company Info */}
          <div className="lg:col-span-5">
            <h3 className="text-xl font-medium tracking-tight mb-4">
              Heritage Development Partners
            </h3>
            <p className="text-[#F3F2ED]/70 text-sm leading-relaxed max-w-md">
              A disciplined real estate investment platform focused on developing and 
              operating mixed-use and multifamily properties across Michigan. We 
              specialize in adaptive reuse, complex capital structures, and creating 
              lasting value for our partners and communities.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#F3F2ED]/50 mb-4">
              Navigation
            </h4>
            <nav className="space-y-3">
              {footerLinks.map((link) =>
              <Link
                key={link.name}
                href={createPageUrl(link.page)}
                className="block text-sm text-[#F3F2ED]/70 hover:text-white transition-colors">

                  {link.name}
                </Link>
              )}
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#F3F2ED]/50 mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-[#F3F2ED]/70">
              <p>info@hrtgdev.com</p>
              <p>Michigan</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#F3F2ED]/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#F3F2ED]/50">
              © {new Date().getFullYear()} Heritage Development Partners. All rights reserved.
            </p>
            <p className="text-xs text-[#F3F2ED]/50">Detroit · Grand Rapids · Midwest

            </p>
          </div>
        </div>
      </div>
    </footer>);

}