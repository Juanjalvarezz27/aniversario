import React, { useState, useEffect } from 'react';

const LoveGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLoadStates, setImageLoadStates] = useState({});

  // LISTA FIJA DE IMÁGENES - MUCHO MÁS RÁPIDO
  // Cambia estos números por los que realmente tienes
  const availableImages = Array.from({ length: 42 }, (_, i) => `/${i + 1}.JPG`);

  const openModal = (imagePath) => {
    setSelectedImage(imagePath);
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    // Restaurar scroll del body
    document.body.style.overflow = 'unset';
  };

  // Cerrar modal con ESC key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.keyCode === 27) closeModal();
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, []);

  const handleImageLoad = (imagePath) => {
    setImageLoadStates(prev => ({
      ...prev,
      [imagePath]: true
    }));
  };

  const handleImageError = (imagePath) => {
    setImageLoadStates(prev => ({
      ...prev,
      [imagePath]: false
    }));
  };

  return (
    <section className="py-16 px-4 relative bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text">
          Nuestro Mosaico de Amor
        </h2>

        {/* Mosaico ultra optimizado */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 max-w-6xl">
            {availableImages.map((imagePath, index) => {
              const isLoaded = imageLoadStates[imagePath];
              
              return (
                <div
                  key={imagePath}
                  className="relative group cursor-pointer transform hover:scale-105 transition-all duration-300 bg-linear-to-br from-pink-500/10 to-purple-600/10 rounded-xl p-1 shadow-lg"
                  onClick={() => openModal(imagePath)}
                >
                  {/* Contenedor de imagen optimizado */}
                  <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-800">
                    {/* Imagen con lazy loading nativo */}
                    <img
                      src={imagePath}
                      alt={`Recuerdo especial ${index + 1}`}
                      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(imagePath)}
                      onError={() => handleImageError(imagePath)}
                    />
                    
                    {/* Placeholder minimalista */}
                    {!isLoaded && imageLoadStates[imagePath] === undefined && (
                      <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-800 to-gray-900 animate-pulse">
                        <div className="text-gray-400 text-xs">📸</div>
                      </div>
                    )}
                    
                    {/* Error state */}
                    {imageLoadStates[imagePath] === false && (
                      <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-red-500/20 to-pink-500/20">
                        <div className="text-gray-400 text-xs">❌</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Overlay simple */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 text-xs bg-black/50 rounded px-2 py-1">
                      👁️ Ver
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MODAL MEJORADO - Ahora sí se oculta el fondo */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div 
              className="relative max-w-4xl max-h-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Recuerdo especial"
                className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl mx-auto"
                loading="eager"
              />
              
              {/* Botón de cerrar mejorado */}
              <button
                onClick={closeModal}
                className="absolute -top-4 -right-4 bg-pink-600 hover:bg-pink-700 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all transform hover:scale-110 shadow-lg border-2 border-white/20"
                aria-label="Cerrar"
              >
                ×
              </button>
              
              {/* Información de la imagen */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {selectedImage.split('/')[1]}
              </div>

              {/* Navegación con teclado */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = availableImages.indexOf(selectedImage);
                    const prevIndex = (currentIndex - 1 + availableImages.length) % availableImages.length;
                    setSelectedImage(availableImages[prevIndex]);
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                >
                  ‹
                </button>
              </div>

              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = availableImages.indexOf(selectedImage);
                    const nextIndex = (currentIndex + 1) % availableImages.length;
                    setSelectedImage(availableImages[nextIndex]);
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contador optimizado */}
        <div className="text-center mt-12">
          <div className="inline-block bg-linear-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl text-sm">
            ✨ {availableImages.length} momentos especiales
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveGallery;