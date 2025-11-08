import React, { useState, useEffect } from 'react';

const MemoriesCarousel = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // LISTA FIJA DE 40 IMÁGENES
  const existingImages = Array.from({ length: 40 }, (_, i) => `/${i + 1}.JPG`);

  const imagesPerSet = 4; // Aumentado a 4 imágenes por set
  const totalSets = Math.ceil(existingImages.length / imagesPerSet);

  // Auto-play optimizado
  useEffect(() => {
    if (!isAutoPlaying || totalSets <= 1) return;

    const interval = setInterval(() => {
      setCurrentSet(prev => (prev + 1) % totalSets);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSets]);

  const currentImages = existingImages.slice(
    currentSet * imagesPerSet,
    (currentSet + 1) * imagesPerSet
  );

  return (
    <section className="py-16 px-4 bg-linear-to-b from-purple-900 to-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-linear-to-r from-red-400 to-pink-400 bg-clip-text">
          Nuestros Momentos
        </h2>

        {/* Carrusel principal - 4 imágenes */}
        <div 
          className="relative mb-8"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {currentImages.map((imagePath, index) => (
              <div
                key={`${imagePath}-${currentSet}-${index}`}
                className="relative group overflow-hidden rounded-2xl shadow-xl bg-linear-to-br from-purple-600/20 to-pink-600/20"
              >
                <div className="w-full aspect-square bg-gray-800">
                  <img
                    src={imagePath}
                    alt={`Recuerdo ${currentSet * imagesPerSet + index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay de hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <div className="text-2xl mb-1">💖</div>
                    <div className="text-xs">Momento {currentSet * imagesPerSet + index + 1}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controles de navegación */}
          {totalSets > 1 && (
            <>
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentSet(prev => (prev - 1 + totalSets) % totalSets)}
                  className="bg-pink-600 hover:bg-pink-700 text-white w-12 h-12 rounded-full transition-all hover:scale-110 shadow-lg text-xl"
                >
                  ‹
                </button>
                
                <div className="text-white text-lg bg-black/50 px-6 py-3 rounded-full border border-pink-500/50">
                  Set {currentSet + 1} de {totalSets}
                </div>
                
                <button
                  onClick={() => setCurrentSet(prev => (prev + 1) % totalSets)}
                  className="bg-pink-600 hover:bg-pink-700 text-white w-12 h-12 rounded-full transition-all hover:scale-110 shadow-lg text-xl"
                >
                  ›
                </button>
              </div>

              {/* Indicadores de progreso */}
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalSets }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSet(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSet ? 'bg-pink-500 w-8' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Contador simple */}
        <div className="text-center mt-8">
          <div className="inline-block bg-linear-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-2xl border-2 border-white/20">
            <div className="text-xl font-bold">
              ✨ {existingImages.length} momentos especiales
            </div>
            <div className="text-sm opacity-90 mt-1">
              Disfrutando cada recuerdo juntos
            </div>
          </div>
        </div>

        {/* Indicador de auto-play */}
        <div className="text-center mt-4">
          <div className="text-pink-300/70 text-sm">
            {isAutoPlaying ? '🔄 Carrusel automático' : '⏸️ Pausado'}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemoriesCarousel;