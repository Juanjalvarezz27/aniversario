import React, { useState } from 'react';

const OurElements = () => {
  const [clickedElements, setClickedElements] = useState([]);
  const [activeAnimations, setActiveAnimations] = useState([]);

  const handleElementClick = (index) => {
    if (!clickedElements.includes(index)) {
      setClickedElements(prev => [...prev, index]);
      
      // Agregar animación temporal
      setActiveAnimations(prev => [...prev, index]);
      setTimeout(() => {
        setActiveAnimations(prev => prev.filter(i => i !== index));
      }, 1000);
    }
  };

  const loveFacts = [
    { 
      emoji: '🐶', 
      fact: 'Lo mucho que nos gustan los perritos',
      color: 'from-amber-500/20 to-orange-500/20',
      effect: 'animate-puppy-bounce',
      message: '¡Guau! ¡Te amo!'
    },
    { 
      emoji: '🍕', 
      fact: 'La pizza de neustra primera cita',
      color: 'from-red-500/20 to-orange-500/20',
      effect: 'animate-pizza-spin',
      message: '¡Delicioso amor!'
    },
    { 
      emoji: '🧸', 
      fact: 'Cada peluche te he dado',
      color: 'from-pink-500/20 to-rose-500/20',
      effect: 'animate-teddy-hug',
      message: '¡Abrázame fuerte!'
    },
     { 
      emoji: '🍔', 
      fact: 'Nuestras favoritas',
      color: 'from-yellow-600/20 to-amber-700/20',
      effect: 'animate-burger-bite',
      message: '¡Qué hambre de amor!'
    },
    { 
      emoji: '🤗', 
      fact: 'Tus abrazos son mi lugar favorito',
      color: 'from-blue-500/20 to-cyan-500/20',
      effect: 'animate-hug-squeeze',
      message: '¡Te aprieto fuerte!'
    },
    { 
      emoji: '🐒', 
      fact: 'Juntos somos como dos monitos',
      color: 'from-brown-500/20 to-amber-700/20',
      effect: 'animate-monkey-swing',
      message: '¡Jugamos juntos!'
    },
    { 
      emoji: '🍦', 
      fact: 'Los helados que te encantan',
      color: 'from-cyan-500/20 to-blue-400/20',
      effect: 'animate-ice-cream-melt',
      message: '¡Dulce como tú!'
    },
    { 
      emoji: '💝', 
      fact: 'Cada detalle tuyo me hace feliz',
      color: 'from-pink-600/20 to-rose-600/20',
      effect: 'animate-heart-beat',
      message: '¡Latidos de amor!'
    }
  ];

  return (
    <section className="py-16 px-4 relative bg-linear-to-b from-purple-900/50 to-black/80">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-linear-to-r from-pink-400 to-purple-400 bg-clip-text">
            Nuestros Símbolos de Amor
          </h2>
          <p className="text-lg text-pink-200/80 max-w-2xl mx-auto">
            Cada elemento representa un momento especial que hemos compartido juntos
          </p>
        </div>

        {/* Grid de elementos interactivos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {loveFacts.map((item, index) => {
            const isClicked = clickedElements.includes(index);
            const isAnimating = activeAnimations.includes(index);
            
            return (
              <div
                key={index}
                className={`
                  relative bg-linear-to-br ${item.color} rounded-2xl p-4 md:p-6 text-center cursor-pointer 
                  transform transition-all duration-300 border-2 border-white/20 backdrop-blur-sm
                  ${isClicked ? 'scale-95 border-pink-400/60' : 'hover:scale-105 hover:border-pink-300/40'}
                  ${isAnimating ? item.effect : ''}
                `}
                onClick={() => handleElementClick(index)}
              >
                {/* Emoji con efecto especial */}
                <div className={`text-4xl md:text-5xl mb-3 md:mb-4 transition-transform duration-300 ${
                  isAnimating ? 'scale-110' : ''
                }`}>
                  {item.emoji}
                </div>
                
                {/* Texto del hecho */}
                <p className="text-white text-xs md:text-sm leading-tight font-medium">
                  {item.fact}
                </p>
                
                {/* Efecto de brillo al hacer hover */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/0 to-white/0 hover:from-white/5 hover:to-white/10 transition-all duration-300 pointer-events-none" />
                
                {/* Indicador de selección */}
                {isClicked && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Área de mensajes interactivos */}
        <div className="text-center mb-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/30 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl text-pink-300 mb-4">
              {clickedElements.length === 0 
                ? "💝 Toca los símbolos para descubrir mensajes especiales" 
                : `✨ Has descubierto ${clickedElements.length} de ${loveFacts.length} símbolos`
              }
            </h3>
            
            {/* Mostrar mensajes de elementos clickeados */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {clickedElements.map((index) => (
                <div
                  key={index}
                  className="bg-pink-500/20 text-pink-200 px-3 py-2 rounded-full text-sm border border-pink-500/30 animate-fade-in"
                >
                  {loveFacts[index].message}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progreso */}
        {clickedElements.length > 0 && (
          <div className="text-center">
            <div className="inline-block bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-500/50">
              <div className="text-pink-300 text-sm">
                Progreso: {clickedElements.length}/{loveFacts.length} símbolos descubiertos
              </div>
              <div className="w-48 h-2 bg-gray-700 rounded-full mt-2 mx-auto overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-pink-500 to-purple-500 transition-all duration-500 rounded-full"
                  style={{ width: `${(clickedElements.length / loveFacts.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Elementos decorativos flotantes */}
        <div className="absolute top-8 left-6 text-3xl animate-float-1">🌟</div>
        <div className="absolute bottom-12 right-8 text-4xl animate-float-2">✨</div>
        <div className="absolute top-1/2 left-10 text-2xl animate-float-3">🎀</div>
        <div className="absolute top-20 right-16 text-3xl animate-float-4">💫</div>
      </div>

      {/* Estilos de animación personalizados */}
      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(-5px) rotate(-3deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(2px) rotate(2deg); }
          50% { transform: translateY(-12px) rotate(-2deg); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateY(-3px) rotate(-1deg); }
          50% { transform: translateY(-18px) rotate(1deg); }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        /* Animaciones específicas para cada elemento */
        @keyframes puppy-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1) translateY(-5px); }
        }
        @keyframes pizza-spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes teddy-hug {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes cookie-crunch {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1) rotate(-5deg); }
          75% { transform: scale(1.1) rotate(5deg); }
        }
        @keyframes hug-squeeze {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.9); }
        }
        @keyframes monkey-swing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
        }
        @keyframes ice-cream-melt {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.8); }
        }
        @keyframes heart-beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        
        .animate-float-1 { animation: float-1 4s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 5s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 6s ease-in-out infinite; }
        .animate-float-4 { animation: float-4 7s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        
        .animate-puppy-bounce { animation: puppy-bounce 0.5s ease-in-out; }
        .animate-pizza-spin { animation: pizza-spin 1s ease-in-out; }
        .animate-teddy-hug { animation: teddy-hug 0.6s ease-in-out; }
        .animate-cookie-crunch { animation: cookie-crunch 0.8s ease-in-out; }
        .animate-hug-squeeze { animation: hug-squeeze 0.7s ease-in-out; }
        .animate-monkey-swing { animation: monkey-swing 0.9s ease-in-out; }
        .animate-ice-cream-melt { animation: ice-cream-melt 0.6s ease-in-out; }
        .animate-heart-beat { animation: heart-beat 0.5s ease-in-out; }
      `}</style>
    </section>
  );
};

export default OurElements;