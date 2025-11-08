import React, { useState, useEffect } from 'react';

const FinalDeclaration = () => {
  const [currentImage, setCurrentImage] = useState(2);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPromise, setCurrentPromise] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Carrusel de imágenes
    const imageInterval = setInterval(() => {
      setCurrentImage(prev => prev >= 58 ? 2 : prev + 1);
    }, 3000);

    // Rotación de promesas
    const promiseInterval = setInterval(() => {
      setCurrentPromise(prev => (prev + 1) % promises.length);
    }, 2500);

    return () => {
      clearInterval(imageInterval);
      clearInterval(promiseInterval);
    };
  }, []);

  const promises = [
    { text: "Prometo amarte cada día más", emoji: "💖", color: "from-pink-500/20 to-rose-500/20" },
    { text: "Prometo hacerte reír siempre", emoji: "😊", color: "from-purple-500/20 to-pink-500/20" },
    { text: "Prometo apoyarte en todo", emoji: "🤝", color: "from-rose-500/20 to-red-500/20" },
    { text: "Prometo ser tu mejor amigo", emoji: "🥰", color: "from-pink-600/20 to-rose-600/20" },
    { text: "Prometo crecer contigo", emoji: "🌱", color: "from-purple-600/20 to-pink-600/20" },
    { text: "Prometo hacerte feliz", emoji: "🌈", color: "from-rose-600/20 to-red-600/20" },
    { text: "Prometo escucharte siempre", emoji: "👂", color: "from-pink-700/20 to-rose-700/20" },
    { text: "Prometo aventurarme contigo", emoji: "🗺️", color: "from-rose-700/20 to-red-700/20" }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Fondo dinámico con transición suave */}
      <div className="absolute inset-0">
        <img
          src={`/${currentImage}.JPG`}
          alt="Nuestros momentos especiales"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-linear-to-br from-black/80 via-purple-900/40 to-pink-900/50"></div>
      </div>

      {/* Contenido principal */}
      <div className={`relative z-10 w-full max-w-6xl mx-auto px-6 transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <span className="text-6xl md:text-7xl lg:text-8xl font-bold bg-linear-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
              Te Amo
            </span>
          </div>
          <div className="text-xl text-pink-200/80 bg-black/40 px-6 py-3 rounded-full inline-block border border-pink-500/40 backdrop-blur-sm">
            💝 Un año de amor infinito
          </div>
        </div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Columna izquierda - Mensaje principal */}
          <div className="space-y-8">
            {/* Carta de amor */}
            <div className="bg-black/50 backdrop-blur-md rounded-3xl p-8 border-2 border-pink-500/30 shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">💌</div>
                <h2 className="text-2xl font-bold text-pink-300 mb-2">Mi Carta Para Ti</h2>
                <div className="w-20 h-1 bg-linear-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
              </div>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed text-center">
                Este año a tu lado ha sido el más maravilloso de mi vida. Cada risa compartida, 
                cada aventura vivida y cada momento contigo ha llenado mi corazón de una felicidad 
                que nunca creí posible. Eres mi persona favorita, mi confidente y el amor de mi vida.
              </p>
            </div>

            {/* Promesa destacada */}
            <div className="text-center">
              <div className="bg-linear-to-r from-pink-500/30 to-purple-500/30 rounded-2xl p-6 border border-pink-400/50 backdrop-blur-sm">
                <div className="text-3xl mb-3 animate-pulse">{promises[currentPromise].emoji}</div>
                <p className="text-lg text-white font-medium">
                  {promises[currentPromise].text}
                </p>
                <div className="text-sm text-pink-300/70 mt-2">
                  Promesa {currentPromise + 1} de {promises.length}
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Promesas */}
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-transparent bg-linear-to-r from-pink-400 to-purple-400 bg-clip-text">
                Mis Promesas Para Ti
              </h3>
              <p className="text-pink-200/70 text-sm mt-1">Compromisos de corazón eterno</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {promises.map((promise, index) => (
                <div
                  key={index}
                  className={`bg-linear-to-br ${promise.color} rounded-xl p-4 text-white transform hover:scale-105 transition-all duration-300 shadow-lg border border-pink-500/30 backdrop-blur-sm`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl text-pink-300">{promise.emoji}</div>
                    <div className="text-sm font-medium leading-tight flex-1 text-pink-100">
                      {promise.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Firma especial */}
            <div className="text-center pt-4">
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-500/50">
                <div className="text-pink-300 text-lg font-light mb-2">
                  Para mi amor eterno
                </div>
                <div className="text-white text-xl font-signature animate-pulse bg-linear-to-r from-pink-400 to-purple-400 bg-clip-text">
                  Con todo mi corazón
                </div>
                <div className="text-pink-300/70 text-sm mt-3 flex items-center justify-center space-x-2">
                  <span>💝</span>
                  <span>Hoy, siempre y para siempre</span>
                  <span>💝</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje final */}
        <div className="text-center mt-12">
          <div className="inline-block bg-black/50 backdrop-blur-sm mb-4 px-8 py-4 rounded-2xl border border-purple-500/50">
            <div className="text-pink-300 text-lg flex items-center space-x-2">
              <span>✨</span>
              <span>Gracias por ser la persona maravillosa que eres</span>
              <span>✨</span>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute top-10 left-8 text-4xl animate-float z-20">💕</div>
      <div className="absolute top-20 right-12 text-5xl animate-float-delayed z-20">💖</div>
      <div className="absolute bottom-20 left-16 text-4xl animate-float-slow z-20">💝</div>
      <div className="absolute bottom-32 right-20 text-5xl animate-float-delayed-slow z-20">💗</div>

      {/* Lluvia de corazones de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xl animate-rain-final"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
              fontSize: `${1 + Math.random() * 1.5}rem`
            }}
          >
            {['💖', '💕', '💝', '💗', '✨'][i % 5]}
          </div>
        ))}
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(-10px) rotate(-5deg); }
          50% { transform: translateY(-30px) rotate(0deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(5px) rotate(3deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        @keyframes float-delayed-slow {
          0%, 100% { transform: translateY(-5px) rotate(-3deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
        }
        @keyframes rain-final {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-delayed-slow { animation: float-delayed-slow 7s ease-in-out infinite; }
        .animate-rain-final { animation: rain-final linear infinite; }
      `}</style>
    </section>
  );
};

export default FinalDeclaration;