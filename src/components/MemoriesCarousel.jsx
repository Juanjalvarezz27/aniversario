import React, { useState, useEffect, useCallback } from 'react';

const MemoriesCarousel = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});
  const [existingImages, setExistingImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Verificación optimizada de imágenes
  const checkImageExists = useCallback((url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      // Timeout para evitar bloqueos
      setTimeout(() => resolve(false), 500);
    });
  }, []);

  // Detectar imágenes de forma más eficiente
  useEffect(() => {
    const detectImages = async () => {
      setIsLoading(true);
      const foundImages = [];
      const checkPromises = [];
      
      // Solo verificar 40 imágenes máximo
      const maxImages = 40;
      
      // Verificar en lotes para mejor performance
      for (let i = 1; i <= maxImages; i++) {
        const imagePath = `/${i}.JPG`;
        checkPromises.push(
          checkImageExists(imagePath).then(exists => {
            if (exists) {
              foundImages.push(imagePath);
            }
          })
        );
        
        // Procesar en lotes de 5 para no sobrecargar
        if (i % 5 === 0) {
          await Promise.all(checkPromises);
          checkPromises.length = 0; // Limpiar array
        }
      }
      
      // Esperar cualquier promesa restante
      await Promise.all(checkPromises);
      
      setExistingImages(foundImages);
      setIsLoading(false);
    };

    detectImages();
  }, [checkImageExists]);

  const imagesPerSet = 3;
  const totalSets = Math.ceil(existingImages.length / imagesPerSet);

  const getCurrentImages = useCallback(() => {
    const startIndex = currentSet * imagesPerSet;
    return existingImages.slice(startIndex, startIndex + imagesPerSet);
  }, [currentSet, existingImages]);

  // Auto-play optimizado
  useEffect(() => {
    if (!isAutoPlaying || totalSets <= 1) return;

    const interval = setInterval(() => {
      setCurrentSet(prev => (prev + 1) % totalSets);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSets]);

  const handleImageLoad = useCallback((imagePath) => {
    setLoadedImages(prev => ({ ...prev, [imagePath]: true }));
  }, []);

  const handleImageError = useCallback((imagePath) => {
    setLoadedImages(prev => ({ ...prev, [imagePath]: false }));
  }, []);

  const goToNextSet = useCallback(() => {
    setCurrentSet(prev => (prev + 1) % totalSets);
  }, [totalSets]);

  const goToPrevSet = useCallback(() => {
    setCurrentSet(prev => (prev - 1 + totalSets) % totalSets);
  }, [totalSets]);

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-linear-to-b from-purple-900 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-linear-to-r from-red-400 to-pink-400 bg-clip-text">
            Nuestros Momentos
          </h2>
          <div className="text-pink-300 text-lg animate-pulse">
            Cargando recuerdos... ⏳
          </div>
        </div>
      </section>
    );
  }

  if (existingImages.length === 0) {
    return (
      <section className="py-16 px-4 bg-linear-to-b from-purple-900 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-linear-to-r from-red-400 to-pink-400 bg-clip-text">
            Nuestros Momentos
          </h2>
          <div className="text-pink-300 text-lg">
            No se encontraron imágenes 📸
          </div>
          <p className="text-pink-200 mt-2 text-sm">
            Las imágenes deben llamarse 1.JPG, 2.JPG, etc. en la carpeta public
          </p>
        </div>
      </section>
    );
  }

  const currentImages = getCurrentImages();

  return (
    <section className="py-16 px-4 bg-linear-to-b from-purple-900 to-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-linear-to-r from-red-400 to-pink-400 bg-clip-text">
          Nuestros Momentos
        </h2>

        {/* Carrusel principal */}
        <div 
          className="relative mb-8"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {currentImages.map((imagePath, index) => {
              const imageNumber = imagePath.split('/')[1].split('.')[0];
              const isLoaded = loadedImages[imagePath];

              return (
                <div
                  key={`${imagePath}-${currentSet}-${index}`}
                  className="relative group overflow-hidden rounded-2xl shadow-xl bg-linear-to-br from-purple-600/20 to-pink-600/20"
                >
                  {/* Contenedor de imagen optimizado */}
                  <div className="w-full aspect-square bg-gray-800">
                    <img
                      src={imagePath}
                      alt={`Recuerdo ${imageNumber}`}
                      className={`w-full h-full object-cover transition-transform duration-300 ${
                        isLoaded 
                          ? 'opacity-100 group-hover:scale-105' 
                          : 'opacity-0'
                      }`}
                      loading="lazy" // Lazy loading nativo
                      onLoad={() => handleImageLoad(imagePath)}
                      onError={() => handleImageError(imagePath)}
                    />
                    
                    {/* Placeholder simple */}
                    {!isLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                        <div className="text-white text-center">
                          <div className="text-xl mb-1">📷</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Overlay simple */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>
              );
            })}
          </div>

          {/* Controles de navegación - solo si hay múltiples sets */}
          {totalSets > 1 && (
            <>
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={goToPrevSet}
                  className="bg-pink-600 hover:bg-pink-700 text-white w-10 h-10 rounded-full transition-all hover:scale-110 shadow-lg"
                >
                  ‹
                </button>
                
                <div className="text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                  {currentSet + 1} / {totalSets}
                </div>
                
                <button
                  onClick={goToNextSet}
                  className="bg-pink-600 hover:bg-pink-700 text-white w-10 h-10 rounded-full transition-all hover:scale-110 shadow-lg"
                >
                  ›
                </button>
              </div>

              {/* Indicadores simples */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalSets }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSet(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSet ? 'bg-pink-500 w-6' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Miniaturas optimizadas */}
        {existingImages.length > 0 && (
          <div className="mt-8">
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-1 md:gap-2 max-w-6xl mx-auto">
              {existingImages.map((imagePath, index) => {
                const setIndex = Math.floor(index / imagesPerSet);
                
                return (
                  <button
                    key={imagePath}
                    onClick={() => setCurrentSet(setIndex)}
                    className={`relative aspect-square rounded-lg overflow-hidden transition-transform ${
                      setIndex === currentSet ? 'ring-2 ring-pink-500' : 'hover:scale-105'
                    }`}
                  >
                    <img
                      src={imagePath}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Contador simple */}
        <div className="text-center mt-6">
          <div className="inline-block bg-linear-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm">
            ✨ {existingImages.length} momentos especiales
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemoriesCarousel;