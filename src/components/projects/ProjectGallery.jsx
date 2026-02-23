import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProjectGallery({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 lg:py-24 bg-[#F3F2ED]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Image */}
        <div className="group relative aspect-[16/9] bg-white overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="relative w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={images[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </motion.div>
          </AnimatePresence>

          {/* Click zones: left = previous, right = next */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-0 top-0 bottom-0 w-1/2 cursor-pointer border-0 outline-none bg-transparent"
                aria-label="Previous image"
              />
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-0 top-0 bottom-0 w-1/2 cursor-pointer border-0 outline-none bg-transparent"
                aria-label="Next image"
              />
              {/* Chevrons - visible on hover */}
              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center transition-opacity border-0 outline-none opacity-0 group-hover:opacity-100 z-10 pointer-events-none"
                aria-hidden
              >
                <ChevronLeft className="w-6 h-6 text-[#070707]" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center transition-opacity border-0 outline-none opacity-0 group-hover:opacity-100 z-10 pointer-events-none"
                aria-hidden
              >
                <ChevronRight className="w-6 h-6 text-[#070707]" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}