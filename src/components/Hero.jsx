import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(2);
  const [textVisible, setTextVisible] = useState(false);
  const [bgLoading, setBgLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setTextVisible(true);
    
    // Precargar imágenes para transiciones suaves
    const preloadImages = () => {
      for (let i = 2; i <= 58; i++) {
        const img = new Image();
        img.src = `/${i}.JPG`;
      }
    };
    preloadImages();

    // Cambio automático de fondo con transición suave
    const interval = setInterval(() => {
      setBgLoading(true);
      setCurrentBg(prev => prev >= 58 ? 2 : prev + 1);
      
      // Simular tiempo de carga de imagen
      setTimeout(() => setBgLoading(false), 300);
    }, 4000);

    // Escuchar el scroll para mover elementos
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const floatingElements = [
    { emoji: '🐶', speed: 0.3, direction: 1 },
    { emoji: '🐱', speed: 0.5, direction: -1 },
    { emoji: '🍕', speed: 0.4, direction: 1 },
    { emoji: '🍪', speed: 0.6, direction: -1 },
    { emoji: '🧸', speed: 0.2, direction: 1 },
    { emoji: '🤗', speed: 0.7, direction: -1 },
    { emoji: '🍦', speed: 0.4, direction: 1 },
    { emoji: '💖', speed: 0.3, direction: -1 },
    { emoji: '🐒', speed: 0.5, direction: 1 },
    { emoji: '🍔', speed: 0.6, direction: -1 }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Fondos en transición mejorada */}
      <div className="absolute inset-0">
        <img
          src={`/${currentBg}.JPG`}
          alt="Background"
          className={`w-full h-full object-cover transition-all duration-1000 ${
            bgLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          onLoad={() => setBgLoading(false)}
          onError={() => setBgLoading(false)}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-1000"></div>
      </div>

      {/* Elementos flotantes que se mueven con el scroll */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingElements.map((element, index) => {
          const moveY = scrollY * element.speed * element.direction;
          const moveX = Math.sin(scrollY * 0.01 + index) * 20 * element.direction;
          
          return (
            <div
              key={index}
              className="absolute text-3xl md:text-5xl lg:text-6xl transition-transform duration-100 ease-out"
              style={{
                left: `${10 + (index * 9)}%`,
                top: `${15 + (index * 6)}%`,
                transform: `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.5}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              {element.emoji}
            </div>
          );
        })}
      </div>

      {/* Contenido principal reorganizado */}
      <div className={`text-center relative z-10 w-full max-w-6xl mx-auto px-4 transform transition-all duration-1000 ease-out ${
        textVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        
        {/* Título principal */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 md:mb-6">
            <span className="bg-linear-to-r from-pink-500 via-red-500 to-purple-500 bg-clip-text text-transparent">
              1
            </span>
            <span className="text-white"> Año</span>
          </h1>
          
          {/* Subtítulo con espaciado mejorado */}
          <div className="mb-6 md:mb-8">
            <p className="text-2xl md:text-4xl lg:text-5xl text-pink-200 font-bold mb-4">
              Desde que empezo nuestro viaje juntos ✨
            </p>
            
            {/* Contador de días - separado del subtítulo */}
            <div className="text-lg md:text-xl lg:text-2xl text-purple-200 bg-black bg-opacity-60 px-6 py-3 rounded-full border border-purple-500 inline-block backdrop-blur-sm transition-all duration-300 hover:bg-opacity-80">
              📅 365 días contigo
            </div>
          </div>
        </div>
      </div>

      {/* Flecha indicadora - reposicionada y mejorada */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-3xl transition-transform duration-300 mb-8" 
               style={{ transform: `translateY(${Math.sin(scrollY * 0.05) * 10}px)` }}>
            👇
          </div>
          <div className="text-sm text-pink-300 bg-black bg-opacity-70 px-4 py-2 rounded-full border border-pink-500 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-80">
            Deslízate para Ver Más
          </div>
        </div>
      </div>

      {/* Efectos de partículas que también se mueven con scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const particleMoveY = scrollY * (0.1 + Math.random() * 0.3);
          const particleMoveX = Math.sin(scrollY * 0.02 + i) * 15;
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 md:w-2 md:h-2 bg-linear-to-r from-pink-400 to-purple-400 rounded-full transition-transform duration-100 ease-out"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `translate(${particleMoveX}px, ${particleMoveY}px)`,
                opacity: 0.3 + Math.random() * 0.4
              }}
            />
          );
        })}
      </div>

      {/* Efecto parallax suave para el fondo */}
      <div 
        className="absolute inset-0 transition-transform duration-0"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/40"></div>
      </div>
    </section>
  );
};

export default Hero;