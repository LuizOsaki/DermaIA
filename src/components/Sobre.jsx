import React from 'react';
import useFadeInOnScroll from '../hooks/useFadeInOnScroll';

export default function Sobre() {
    useFadeInOnScroll();
    
  return (
    <section className="sobre-nos fade-in">
      <div className="sobre-nos-container">
      <div className="sobre-nos-imagens">
        <div className="sobre-nos-texto">
          <h3>Sobre nós</h3>
          <p>Conheça mais sobre nossa equipe</p>
          <a href="SobreNos" className="btn-sobre">Saiba mais</a>
        </div>

          <img src="/assets/sobrenos.png" alt="Equipe DermaIA" className="img1"/>
        </div>
      </div>
    </section>
  );
}
