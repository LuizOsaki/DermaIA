import React from 'react';
import { Link } from "react-router-dom";
import useFadeInOnScroll from '../hooks/useFadeInOnScroll';

export default function Planos() {
  useFadeInOnScroll();

  return (
    <section id="planos" className="planos-section fade-in">
      <h2>Conheça nossos Planos</h2>
      <p>Escolha o plano ideal para cuidar da sua saúde: gratuito, médico ou hospital.</p>

      <div className="planos-container">

        {/* GRATUITO */}
        <div className="plano-card">
          <div className="plano-top">
            <h3>Plano Gratuito</h3>
            <Link to="/saibamaisplanos" className="btn-saiba">
              Saiba mais
            </Link>
          </div>
          <ul>
            <li>Análise de Manchas</li>
            <li>Alerta Climático</li>
            <li>Gamificação</li>
            <li>Mapa de Hospitais</li>
            <li>Dicas de Prevenção</li>
          </ul>
          <div className="plano-bottom white-footer">
            <p>Gratuito<br/><span> ­</span></p>
          </div>
        </div>

        {/* MÉDICO */}
        <div className="plano-card">
          <div className="plano-top">
            <h3>Médico/Dermatologista</h3>
            <Link to="/saibamaisplanos" className="btn-saiba">
              Saiba mais
            </Link>
          </div>
          <ul>
            <li>Análise de Manchas</li>
            <li>Alerta Climático</li>
            <li>Gamificação</li>
            <li>Mapa de Hospitais</li>
            <li>Dicas de Prevenção</li>
            <li>IA Avançada</li>
            <li>Dashboard de controle</li>
          </ul>
          <div className="plano-bottom white-footer">
            <p>R$ 39,00<br/><span>Mensal</span></p>
          </div>
        </div>

        {/* HOSPITAL */}
        <div className="plano-card">
          <div className="plano-top">
            <h3>Hospital/Clínicas</h3>
            <Link to="/saibamaisplanos" className="btn-saiba">
              Saiba mais
            </Link>
          </div>
          <ul>
            <li>Análise de Manchas</li>
            <li>Alerta Climático</li>
            <li>Gamificação</li>
            <li>Mapa de Hospitais</li>
            <li>Dicas de Prevenção</li>
            <li>IA Avançada</li>
            <li>Dashboard de controle</li>
            <li>10 Chaves de acesso</li>
          </ul>
          <div className="plano-bottom white-footer">
            <p>R$ 319,00<br/><span>Mensal</span></p>
          </div>
        </div>

      </div>
    </section>
  );
}
