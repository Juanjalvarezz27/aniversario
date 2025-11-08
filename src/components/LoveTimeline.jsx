import React, { useState, useRef, useEffect } from 'react';

const LoveTimeline = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const timelineRef = useRef(null);

  const milestones = [
    { emoji: "❤️", title: "Dia 1 de novios", image: 54, color: "linear-to-r from-red-500 to-pink-500" },
    { emoji: "🍔", title: "Nuestro confiable", image: 1, color: "linear-to-r from-orange-500 to-red-500" },
    { emoji: "🐈", title: "Cheto original", image: 10, color: "linear-to-r from-yellow-500 to-orange-500" },
    { emoji: "🏖️", title: "Primer mes juntos", image: 30, color: "linear-to-r from-green-500 to-blue-500" },
    { emoji: "🎉", title: "Match", image: 40, color: "linear-to-r from-blue-500 to-purple-500" },
    { emoji: "💝", title: "Un Año Juntos", image: 2, color: "linear-to-r from-purple-500 to-pink-500" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index]);
            }, index * 200);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      items.forEach(item => observer.observe(item));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-4 relative bg-linear-to-b from-black to-purple-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 text-transparent bg-linear-to-r from-pink-400 to-purple-400 bg-clip-text">
          Nuestra Aventura Juntos
        </h2>

        <div ref={timelineRef} className="relative">
          {/* Línea central */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-linear-to-b from-pink-500 to-purple-500 rounded-full"></div>

          {milestones.map((milestone, index) => (
            <div
              key={index}
              data-index={index}
              className={`timeline-item relative mb-16 ${
                index % 2 === 0 ? 'pr-8 md:pr-0 md:pl-8' : 'pl-8 md:pl-0 md:pr-8'
              } ${visibleItems.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} transition-all duration-700`}
            >
              <div className={`flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}>
                
                {/* Imagen */}
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                  <div className="relative group">
                    <img
                      src={`/${milestone.image}.JPG`}
                      alt={milestone.title}
                      className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black to-transparent rounded-2xl opacity-60"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-3xl">{milestone.emoji}</div>
                      <div className="text-xl font-bold">{milestone.month}</div>
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="w-full md:w-1/2 px-4">
                  <div className={`p-6 rounded-2xl bg-${milestone.color} text-white shadow-2xl transform hover:scale-105 transition-all duration-300`}>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-lg opacity-90">Un momento especial en nuestro camino juntos</p>
                  </div>
                </div>
              </div>

              {/* Punto en la línea */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-6 h-6 bg-pink-500 rounded-full border-4 border-white shadow-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveTimeline;