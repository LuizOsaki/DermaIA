import React from 'react';
import useFadeInOnScroll from '../hooks/useFadeInOnScroll';

export default function Contato() {
  useFadeInOnScroll();
  
  return (
    <section className="contato fade-in">
      <div className="contato-container">
        <div className="contato-img">
          <img src="/assets/contato-img.png" alt="Atendimento DermaIA" />
        </div>
        <div className="contato-info">
          <h3><span>INFORMAÇÃO</span><br/>DE CONTATO</h3>
          <p><strong>Endereço:</strong> R. Tito, 54 - Vila Romana, São Paulo - SP, 05051-000</p>
          <p><strong>Telefone:</strong> +55 (11)999999999</p>
          <p><strong>Email:</strong>dermaia.app@gmail.com</p>
        </div>
      </div>
    </section>
  );
}
