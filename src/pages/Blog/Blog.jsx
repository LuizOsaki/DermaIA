// Arquivo: Blog.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Blog.css";

export default function Blog() {
  return (
    <>
      {/* HERO BANNER */}
      <section className="blog-heroBanner">
        <h1 className="blog-titulo">Cuide da Sua Pele</h1>
        <p>
          Informações simples e confiáveis para quem quer entender melhor sobre
          saúde da pele e prevenção.
        </p>
      </section>

      <div className="blog-articlesSection">
        <h2 className="blog-title">Blog</h2>
        <p className="blog-subtitle">Conteúdo educativo para o cuidado da sua pele</p>

        <div className="blog-cardsGrid">

          {/* CARD — O SOL */}
          <div className="blog-articleCard">
            <img src="/assets/sunimage.jpg" className="blog-cardImg" alt="Artigo sobre o Sol" />
            <div className="blog-cardBody">
              <span className="blog-tag">Conhecimento</span>
              <h3 className="blog-cardTitle">☀️ O Sol</h3>
              <p className="blog-cardDesc">
                Ele dá energia, calor e bons momentos ao ar livre. Mas também pode
                causar danos invisíveis à pele.
              </p>

              <div className="blog-cardActions">
                <Link to="/DicaSol" className="blog-btnPrimary">Saiba Mais</Link>
              </div>
            </div>
          </div>

          {/* CARD — PREVENÇÃO */}
          <div className="blog-articleCard">
            <img
              src="/assets/protetorsolar.jpg"
              className="blog-cardImg-prevencao"
              alt="Prevenção da pele"
            />
            <div className="blog-cardBody">
              <span className="blog-tag blog-purple">Dicas</span>
              <h3 className="blog-cardTitle">🛡️ Prevenção</h3>
              <p className="blog-cardDesc">
                Não controlamos o clima, mas podemos escolher como nos proteger
                da radiação UV e da exposição solar.
              </p>

              <div className="blog-cardActions">
                <Link to="/DicaPrevencao" className="blog-btnPrimary">Saiba Mais</Link>
              </div>
            </div>
          </div>

          {/* CARD — A PELE */}
          <div className="blog-articleCard">
            <img 
              src="/assets/suncream-suntan-lotion-beautiful-woman-applying-beautiful-face-sunscreen-solar-cream-skin-care_231834-2124.jpg" 
              className="blog-cardImg" 
              alt="Artigo sobre a pele" 
            />
            <div className="blog-cardBody">
              <span className="blog-tag blog-green">Saúde da Pele</span>
              <h3 className="blog-cardTitle">🌿 A Pele</h3>
              <p className="blog-cardDesc">
                Nossa pele é uma armadura preciosa. Cada tipo precisa de cuidados
                específicos para se manter saudável.
              </p>

              <div className="blog-cardActions">
                <Link to="/DicaPele" className="blog-btnPrimary">Saiba Mais</Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ALERTA CLIMÁTICO */}
      <section className="blog-alerta-climatico">
        <div className="blog-alerta-container">
          <h2>🌍 Acompanhe o Alerta Climático em Tempo Real</h2>
          <p>
            Fique por dentro de notícias ambientais, previsões climáticas e
            alertas importantes diretamente no nosso portal.
          </p>
          <a href="AlertaClimatico" className="blog-btn-alerta">
            Acessar o Alerta Climático
          </a>
        </div>
      </section>
    </>
  );
}
