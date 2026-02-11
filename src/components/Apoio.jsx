import React from 'react';
import useFadeInOnScroll from '../hooks/useFadeInOnScroll';

export default function Apoio() {
      useFadeInOnScroll();
      
  return (
    <section className="apoio fade-in">
      <h2 className="apoio-titulo">Juntos por um <span> futuro melhor</span></h2>
      <div className="logos-apoio fade-in">
        <div className='icon-proa'>
          <a href="https://www.proa.org.br/"><img src="/assets/proa.svg" alt="Instituto PROA" className="logo-apoio"/></a>
        </div>
        <div className='icon-senac'>
          <a href="https://www.sp.senac.br/senac-lapa-tito"><img src="/assets/senac.png" alt="SENAC" className="logo-apoio"/></a>
      </div>
      </div>
    </section>
  );
}
