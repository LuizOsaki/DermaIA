import React from 'react';
import './Home.css';
import Hero from '../../components/Hero';
import Carousel from '../../components/Carousel';
import CardsSaude from '../../components/CardsSaude';
import AiSection from '../../components/AiSection';
import Sobre from '../../components/Sobre';
import Planos from '../../components/Planos';
import Contato from '../../components/Contato';
import Apoio from '../../components/Apoio';


import {
  FaCamera,
  FaCloudSun,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaLightbulb,
} from 'react-icons/fa';

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <section className="hero-section fade-in">
          <div className="hero-content">
            <div className="features">
              <h3>Saiba tudo que a <span className="highlight2">Derma IA</span> oferece para cuidar da sua saúde</h3>
              <div className="feature-buttons">
                <a href="EnviarFoto">
                 <FaCamera style={{ marginRight: '8px' }} />
                 IA de análise de lesão</a>
                <a href="AlertaClimatico">
                <FaCloudSun style={{ marginRight: '8px'}} />
                Alerta climático</a>
                <a href="Gamificacao">
                <FaShieldAlt style={{ marginRight: '8px'}} />
                Desafios de Proteção</a>
                <a href="MapaHospitais">
                  <FaMapMarkedAlt style={{ marginRight: '8px'}} />
                  Mapa de hospitais e clínicas próximos</a>
                <a href="Blog">
                  <FaLightbulb style={{ marginRight: '8px'}} />
                  Dicas de Prevenção</a>
              </div>
            </div>

            <Carousel />
          </div>
        </section>
        <CardsSaude />
        <AiSection />
        <Sobre />
        <Planos />
        <Contato />
        <Apoio />
      </main>
      </>
  );
}
