import React, { useEffect, useRef, useState } from 'react';

const slides = [
  {
    img: '/assets/baby-mother-are-putting-sunscreen-their-face-selective-focus_73944-21022.jpg',
    title: 'Prevenção Começa com Você',
    text: 'Veja dicas simples para cuidar da sua pele.'
  },
  {
    img: '/assets/dezembro-laranja-prevencao-de-cancer-de-pele.jpg.webp',
    title: 'Cuide-se Hoje',
    text: 'Descubra como pequenas ações diárias fazem a diferença.'
  },
  {
    img: '/assets/does-sunscreen-expire-1589405499.avif',
    title: 'Proteção Solar',
    text: 'Saiba como escolher o protetor certo para sua pele.'
  },
  {
    img: '/assets/idoso.jpg',
    title: 'Previna-se',
    text: 'Pequenos passos que moldam a diferença'
  }
];

export default function Carousel() {

  const [idx, setIdx] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAuto();
    return stopAuto;
    // eslint-disable-next-line
  }, []);

  const startAuto = () => {
    stopAuto();
    intervalRef.current = setInterval(() => {
      setIdx(i => (i + 1) % slides.length);
    }, 5000);
  };

  const stopAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const prev = () => {
    setIdx(i => (i - 1 + slides.length) % slides.length);
    startAuto();
  };

  const next = () => {
    setIdx(i => (i + 1) % slides.length);
    startAuto();
  };

  return (

    <div className="carousel-container" onMouseEnter={stopAuto} onMouseLeave={startAuto}>
      <div className="carousel" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {slides.map((s, i) => (
          <div className="slide" key={i}>
            <img src={s.img} alt={s.title} />
            <div className="carousel-text">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a href="Blog">
              <button className="btn-primary">Saiba mais</button>
              </a>
            </div>
          </div>
        ))}
      </div>

      <button className="prev" onClick={prev} aria-label="Anterior">&#10094;</button>
      <button className="next" onClick={next} aria-label="Próximo">&#10095;</button>
    </div>
  );
}
