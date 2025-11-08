import React, { useState, useEffect } from 'react';

const InteractiveMoments = () => {
  const [loveCount, setLoveCount] = useState(0);
  const [clickedHearts, setClickedHearts] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(0);

  const loveMessages = [
    "Eres mi persona favorita en el mundo entero 💖",
    "Tu sonrisa ilumina mis días más oscuros ✨",
    "Cada momento a tu lado es un tesoro 🥰",
    "Eres el mejor regalo que la vida me dio 🎁",
    "Contigo todo tiene más color y magia 🌈",
    "Mi corazón late al ritmo de tu nombre 💓",
    "Eres el sueño que nunca quiero despertar 🌟",
    "Te amo más que todas las estrellas del cielo 💕",
    "Eres mi hogar, mi paz, mi todo 🏡",
    "Tu amor es la fuerza que me impulsa cada día 💪",
    "Espero pasar una vida contigo 🤝",
    "Eres la razón de mi sonrisa  😊",
    "Cada día a tu lado es una nueva aventura 🗺️",
    "Tu amor es mi mayor felicidad",
    "Eres perfecta mi monita 🌸",
    "Mi vida mejoro cuando te conocí 🎉",
    "Eres mi media yuca 🍊",
    "Contigo el tiempo me vuela ⏰",
    "Tu amor es mi combustible diario ⛽",
    "Espero poder dejar de ser tu novio y ser tu esposo 💍"
  ];

  const handleHeartClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setClickedHearts(prev => [...prev, { id: Date.now(), x, y }]);
    setLoveCount(prev => prev + 1);
    setCurrentMessage(prev => (prev + 1) % loveMessages.length);
    
    // Remover corazones después de 2 segundos
    setTimeout(() => {
      setClickedHearts(prev => prev.filter(heart => heart.id !== Date.now()));
    }, 2000);
  };

  // Rotación automática de mensajes cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loveMessages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 relative bg-linear-to-b from-purple-900 via-pink-900 to-black">
      <div className="max-w-5xl mx-auto text-center">
        {/* Encabezado mejorado */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-linear-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text">
            Nuestro Muro de Amor
          </h2>
          
          <p className="text-lg md:text-xl text-pink-200 mb-4">
            Toca el corazón y descubre mensajes especiales
          </p>
          
          <div className="text-sm text-purple-300 bg-black/40 px-4 py-2 rounded-full inline-block border border-purple-500/50">
            💝 Cada clic es una razón más para amarte
          </div>
        </div>

        {/* Área interactiva mejorada */}
        <div 
          className="relative bg-linear-to-br from-pink-900/80 via-purple-900/80 to-black rounded-3xl p-8 md:p-12 border-2 border-pink-400/50 min-h-96 flex items-center justify-center cursor-pointer shadow-2xl mb-10 overflow-hidden group hover:border-pink-400 transition-all duration-500"
          onClick={handleHeartClick}
        >
          {/* Corazones clickeados - detrás del contenido */}
          {clickedHearts.map(heart => (
            <div
              key={heart.id}
              className="absolute text-3xl animate-heart-pop pointer-events-none z-10"
              style={{ 
                left: heart.x, 
                top: heart.y,
                animation: 'heartFloat 2s ease-out forwards'
              }}
            >
              💖
            </div>
          ))}

          {/* Contenido principal - encima de los corazones */}
          <div className="text-center relative z-20">
            {/* Emoji grande */}
            <div className="text-7xl md:text-8xl mb-6 animate-pulse group-hover:scale-110 transition-transform duration-300">
              💝
            </div>
            
            {/* Mensaje principal con mejor estilo */}
            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mx-auto max-w-2xl">
              <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
                {loveMessages[currentMessage]}
              </p>
              <div className="text-sm text-pink-300 mt-3">
                Mensaje {currentMessage + 1} de {loveMessages.length}
              </div>
            </div>

            {/* Instrucción */}
            <div className="text-pink-300/80 text-sm mt-6 bg-black/30 px-4 py-2 rounded-full inline-block border border-pink-400/30">
              👆 Toca aquí para más mensajes de amor
            </div>
          </div>

          {/* Efectos de fondo */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 md:w-2 md:h-2 bg-linear-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Estadísticas mejoradas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          <div className="bg-linear-to-br from-pink-600/20 to-pink-900/30 rounded-2xl p-6 border border-pink-500/30 backdrop-blur-sm">
            <div className="text-4xl text-pink-400 font-bold mb-2">{loveCount}</div>
            <div className="text-pink-200 text-lg">Corazones Enviados</div>
            <div className="text-pink-300/70 text-sm mt-1">Tu amor en números</div>
          </div>
          
          <div className="bg-linear-to-br from-purple-600/20 to-purple-900/30 rounded-2xl p-6 border border-purple-500/30 backdrop-blur-sm">
            <div className="text-4xl text-purple-400 font-bold mb-2">365</div>
            <div className="text-purple-200 text-lg">Días Juntos</div>
            <div className="text-purple-300/70 text-sm mt-1">Un año de felicidad</div>
          </div>
          
          <div className="bg-linear-to-br from-red-600/20 to-red-900/30 rounded-2xl p-6 border border-red-500/30 backdrop-blur-sm">
            <div className="text-4xl text-red-400 font-bold mb-2">∞</div>
            <div className="text-red-200 text-lg">Amor Eterno</div>
            <div className="text-red-300/70 text-sm mt-1">Para siempre juntos</div>
          </div>
        </div>

        {/* Elementos decorativos mejorados */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-3xl md:text-4xl">
          {['🐶', '🐱', '🍕', '🍪', '🧸', '🌟', '🎮', '🎵', '📚', '☕'].map((emoji, index) => (
            <span 
              key={emoji}
              className="animate-bounce hover:scale-125 transition-transform cursor-default"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* Mensaje final */}
        <div className="mt-10 text-center">
          <div className="text-pink-300/80 text-sm bg-black/40 px-6 py-3 rounded-full inline-block border border-pink-400/30">
            💞 El amor se multiplica con cada recuerdo compartido
          </div>
        </div>
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes heartFloat {
          0% {
            transform: scale(0) translateY(0);
            opacity: 1;
          }
          50% {
            transform: scale(1) translateY(-20px);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.5) translateY(-40px);
            opacity: 0;
          }
        }
        
        .animate-heart-pop {
          animation: heartFloat 2s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default InteractiveMoments;