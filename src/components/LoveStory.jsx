import React from 'react';
import { useInView } from '../hooks/useInView';

const LoveStory = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const milestones = [
    { emoji: '❤️', text: 'Nuestro primer encuentro' },
    { emoji: '🍕', text: 'Noches de pizza y películas' },
    { emoji: '🐕', text: 'Paseos con nuestros perritos' },
    { emoji: '🍪', text: 'Horas horneando galletas juntos' },
    { emoji: '🤗', text: 'Millones de abrazos cálidos' },
    { emoji: '🍔', text: 'Aventuras culinarias' },
    { emoji: '🐒', text: 'Momentos divertidos como monitos' },
    { emoji: '🥰', text: 'Cada día más enamorados' }
  ];

  return (
    <section ref={ref} className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-pink-400">
          Nuestra Historia
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-linear-to-r from-purple-900 to-pink-800 border border-pink-500 transform transition-all duration-700 ${
                inView ? 'translate-x-0 opacity-100' : index % 2 === 0 ? '-translate-x-10 opacity-0' : 'translate-x-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4 text-center">{milestone.emoji}</div>
              <p className="text-xl text-center text-pink-100">{milestone.text}</p>
            </div>
          ))}
        </div>

        {/* Elementos decorativos */}
        <div className="absolute -top-10 right-10 text-6xl animate-bounce">🍦</div>
        <div className="absolute bottom-10 left-10 text-5xl animate-pulse">🧁</div>
      </div>
    </section>
  );
};

export default LoveStory;