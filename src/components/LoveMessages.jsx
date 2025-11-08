import React, { useState, useEffect } from 'react';

const LoveMessages = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "Eres lo mejor que me ha pasado 💖",
    "Cada momento contigo es especial 🥰",
    "Tu sonrisa ilumina mis días ✨",
    "Amo nuestras aventuras juntos 🚀",
    "Eres mi persona favorita 🌟",
    "Gracias por tanto amor 💕",
    "Contigo todo es mejor 🌈",
    "Te amo más cada día 💝"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-purple-400">
          Mensajes de Amor
        </h2>
        
        <div className="bg-linear-to-r from-pink-900 to-purple-900 rounded-3xl p-8 md:p-12 border-2 border-pink-500 relative overflow-hidden">
          {/* Mensaje principal */}
          <div key={currentMessage} className="text-center animate-fade-in">
            <p className="text-2xl md:text-3xl text-pink-100 font-light leading-relaxed">
              {messages[currentMessage]}
            </p>
          </div>

          {/* Notitas de amor flotantes */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-float pointer-events-none"
              style={{
                left: `${10 + i * 10}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            >
              {['💌', '📝', '💕', '💖'][i % 4]}
            </div>
          ))}

          {/* Elementos decorativos */}
          <div className="absolute -top-6 -left-6 text-6xl animate-bounce">🍕</div>
          <div className="absolute -bottom-4 -right-4 text-5xl animate-pulse">🍔</div>
          <div className="absolute top-4 right-10 text-4xl animate-bounce delay-700">🍪</div>
          <div className="absolute bottom-8 left-12 text-5xl animate-pulse delay-1000">🧋</div>
        </div>
      </div>
    </section>
  );
};

export default LoveMessages;