import React from 'react';
import useFadeInOnScroll from '../hooks/useFadeInOnScroll';

export default function AiSection() {
      useFadeInOnScroll();

  return (
    <section className="ai-section fade-in">
      <div className="ai-content">
        <img src="/assets/celular-ia.png" alt="IA" className="ai-img" />
        <div>
          <h3>Conheça a <span className="highlight2">inteligência artificial <br/></span> que cuida da sua pele</h3>
          <p>Utilize nossa análise inteligente para identificar<br/>
            se uma mancha de pele apresenta<br/>
            características benignas ou sinais de possível<br/>
            malignidade.</p>

          <a href="EnviarFoto">
          <button className="btn-primary">Testar agora</button>
          </a>
        </div>
      </div>
    </section>
  );
}
