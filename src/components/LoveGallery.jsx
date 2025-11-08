import React, { useState, useEffect } from 'react';

const LoveGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [availableImages, setAvailableImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para verificar si una imagen existe
  const checkImageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  // Detectar TODAS las imágenes que existen
  useEffect(() => {
    const detectExistingImages = async () => {
      const existingImages = [];

      // Verificar un rango más amplio de imágenes (por ejemplo, del 1 al 100)
      for (let imageNumber = 1; imageNumber <= 100; imageNumber++) {
        // Probar diferentes extensiones
        const extensions = ['.JPG', '.jpg', '.JPEG', '.jpeg', '.PNG', '.png', '.WEBP', '.webp'];
        
        for (const ext of extensions) {
          const imagePath = `/${imageNumber}${ext}`;
          try {
            const exists = await checkImageExists(imagePath);
            if (exists) {
              existingImages.push({
                path: imagePath,
                number: imageNumber
              });
              break; // Si encontramos con una extensión, no probamos las demás
            }
          } catch (error) {
            console.log(`Error verificando imagen: ${imagePath}`);
          }
        }
      }

      // Ordenar las imágenes por número
      existingImages.sort((a, b) => a.number - b.number);
      
      setAvailableImages(existingImages);
      setLoading(false);
      console.log(`Imágenes encontradas: ${existingImages.length}`);
    };

    detectExistingImages();
  }, []);

  const openModal = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <section className="py-20 px-4 relative bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-transparent bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text">
            Nuestro Mosaico de Amor
          </h2>
          <div className="text-2xl text-pink-300 animate-pulse">
            Cargando nuestros recuerdos... 💖
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 relative bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-transparent bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text">
          Nuestro Mosaico de Amor
        </h2>

        {/* Mosaico estilo bento */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-6xl">
            {availableImages.map((image, index) => (
              <div
                key={image.path}
                className="relative group cursor-pointer transform hover:scale-105 transition-all duration-300 bg-linear-to-br from-pink-500/20 to-purple-600/20 rounded-2xl p-2 shadow-2xl"
                onClick={() => openModal(image.path)}
              >
                {/* Contenedor de imagen con marco estilo bento */}
                <div className="w-full h-32 rounded-xl shadow-lg overflow-hidden bg-black/30 border-2 border-pink-400/30">
                  {/* Imagen real */}
                  <img
                    src={image.path}
                    alt={`Recuerdo especial ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      console.log(`Error cargando imagen: ${image.path}`);
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  
                  {/* Fallback si la imagen no carga */}
                  <div 
                    className="w-full h-full flex items-center justify-center bg-linear-to-br from-pink-500 to-purple-600 text-white text-sm"
                    style={{ display: 'none' }}
                  >
                    📸 {index + 1}
                  </div>
                </div>
                
                {/* Overlay hover con efecto de vidrio */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-xl transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 bg-black/50 rounded-full p-2">
                    👁️ Ver
                  </div>
                </div>

                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 rounded-xl bg-linear-to-br from-pink-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-pink-400/20 group-hover:via-purple-400/10 group-hover:to-pink-400/20 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal para vista ampliada */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div 
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Recuerdo especial"
                className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              />
              
              <button
                onClick={closeModal}
                className="absolute -top-4 -right-4 bg-pink-600 hover:bg-pink-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all transform hover:scale-110 shadow-lg border-2 border-white/20"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Contador de momentos */}
        <div className="text-center mt-16">
          <div className="inline-block bg-linear-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-2xl border-2 border-white/20">
            <div className="text-xl font-bold">
              ✨ {availableImages.length} momentos especiales capturados
            </div>
            <div className="text-sm opacity-90 mt-1">
              Cada imagen cuenta nuestra historia
            </div>
          </div>
        </div>

        {/* Mensaje de depuración */}
        {availableImages.length === 0 && (
          <div className="text-center mt-8 p-6 bg-red-500/20 rounded-2xl border border-red-400/50">
            <div className="text-red-300 text-lg">No se encontraron imágenes</div>
            <div className="text-red-200 text-sm mt-2">
              Verifica que los archivos estén en la carpeta public con nombres numéricos
            </div>
            <div className="text-red-200 text-sm">
              Formatos soportados: JPG, JPEG, PNG, WebP
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoveGallery;