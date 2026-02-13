import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { 
    name: 'About', 
    page: 'About',
    submenu: [
      { name: 'Contact', page: 'Contact' }
    ]
  },
  { name: 'Projects', page: 'Projects' },
  { name: 'Capabilities', page: 'Capabilities' },
  { name: 'Investors', page: 'Investors' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698a455ff3c68745519ec29b/89fda9b95_Blue_Horizontal-removebg-preview.png" 
              alt="Heritage Development Partners"
              className="h-10 lg:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => {
              if (link.submenu) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setAboutHovered(true)}
                    onMouseLeave={() => setAboutHovered(false)}
                  >
                    <Link
                      to={createPageUrl(link.page)}
                      className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-300 hover:text-[#1B2944] ${
                        isScrolled ? 'text-[#474E5E]' : 'text-[#474E5E]'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${aboutHovered ? 'rotate-180' : ''}`} />
                    </Link>
                    <AnimatePresence>
                      {aboutHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-stone-100 py-2 z-50"
                        >
                          {link.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={createPageUrl(subItem.page)}
                              className="block px-4 py-2 text-sm text-[#474E5E] hover:bg-stone-50 hover:text-[#1B2944] transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={link.name}
                  to={createPageUrl(link.page)}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-[#1B2944] ${
                    isScrolled ? 'text-[#474E5E]' : 'text-[#474E5E]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -mr-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-stone-900" />
            ) : (
              <Menu className="w-6 h-6 text-stone-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-stone-100"
          >
            <nav className="px-6 py-6 space-y-4">
              {navLinks.map((link) => {
                if (link.submenu) {
                  return (
                    <div key={link.name}>
                      <div className="flex items-center justify-between">
                        <Link
                          to={createPageUrl(link.page)}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-base font-medium text-[#474E5E] hover:text-[#1B2944] transition-colors"
                        >
                          {link.name}
                        </Link>
                        <button
                          onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                          className="p-1"
                          aria-label="Toggle submenu"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      <AnimatePresence>
                        {mobileAboutOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 mt-2 space-y-2"
                          >
                            {link.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={createPageUrl(subItem.page)}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileAboutOpen(false);
                                }}
                                className="block text-sm text-[#474E5E] hover:text-[#1B2944] transition-colors"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    to={createPageUrl(link.page)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-base font-medium text-[#474E5E] hover:text-[#1B2944] transition-colors"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}