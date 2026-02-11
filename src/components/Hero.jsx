import React from 'react';

export default function Hero() {
  return (
    <section className="hero fade-in">
      <video autoPlay loop muted playsInline className="hero-main-video">
        <source src="/assets/video-home.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos em HTML5.
      </video>

      <div className="hero-main">
        <h3>Tecnologia a favor da <span>vida</span>, <br />desde o primeiro <span>sinal</span></h3>
        <a href="SobreNos" className="btn-hero">Conheça-nos</a>
      </div>
    </section>

  );
}
