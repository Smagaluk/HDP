import React from 'react';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';


export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        
        :root {
          --color-space-cadet: #1B2944;
          --color-charcoal: #474E5E;
          --color-black: #070707;
          --color-isabelline: #F3F2ED;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        ::selection {
          background-color: rgba(27, 41, 68, 0.15);
        }
      `}</style>
      <Header />
      <main className="flex-1">
        {children}
        <Analytics />
        <SpeedInsights />
      </main>
      <Footer />
    </div>
  );
}