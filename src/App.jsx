import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import LoveTimeline from './components/LoveTimeline';
import MemoriesCarousel from './components/MemoriesCarousel';
import OurElements from './components/OurElements';
import LoveGallery from './components/LoveGallery';
import InteractiveMoments from './components/InteractiveMoments';
import FinalDeclaration from './components/FinalDeclaration';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Efectos de partículas dinámicas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 transition-all duration-1000"
          style={{
            background: 'radial-gradient(circle, #ec4899 0%, #8b5cf6 50%, #dc2626 100%)',
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
          }}
        />
      </div>

      {/* Fondos animados en capas */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-black via-purple-900 to-pink-900 opacity-80"></div>
      </div>

      <div className="relative z-10">
        <Hero />
        <LoveTimeline />
        <MemoriesCarousel />
        <OurElements />
        <LoveGallery />
        <InteractiveMoments/>
        <FinalDeclaration />
      </div>
    </div>
  );
}

export default App;