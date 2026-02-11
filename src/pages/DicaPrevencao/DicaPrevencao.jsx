import React, { useState } from "react";
import "./DicaPrevencao.css";

export default function PrevencaoCancerPele() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "Depilação aumenta a sensibilidade ao sol?",
      a: "Sim — evitar sol por 24h e usar FPS 30+.",
      icon: "✂️",
    },
    {
      q: "Barbear deixa o rosto menos protegido?",
      a: "Sim — os pelos protegem. Aplicar protetor.",
      icon: "🧔",
    },
    {
      q: "O sol nos lábios pode causar câncer?",
      a: "Sim — usar protetor labial FPS 30+.",
      icon: "😗",
    },
    {
      q: "Spray protege igual loção?",
      a: "Protege, mas pode ficar irregular — use loção primeiro.",
      icon: "💦",
    },
    {
      q: "Protetor causa alergia?",
      a: "Raro. Teste em área pequena antes.",
      icon: "⚠️",
    },
  ];

  return (
    <div className="prev-container">
      <article className="prev-card">

        {/* Cabeçalho */}
        <header className="prev-header">
          <div className="prev-header-icon">🌞</div>

          <div>
            <h1>Resumo — Prevenção ao Câncer de Pele</h1>
            <p className="subtitle">Conteúdo simples e moderno para seu site</p>
          </div>

          <div className="prev-tags">
            <span className="tag-green">🛡️ Proteção</span>
            <span className="tag-blue">👀 Autoexame</span>
          </div>
        </header>

        {/* Seções */}
        <div className="prev-body">

          <section>
            <h2>🔬 Como o câncer de pele começa</h2>
            <p>
              A radiação UV pode causar mutações no núcleo das células. 
              Isso gera crescimento descontrolado — câncer de pele.
            </p>
          </section>

          <section>
            <h2>🛡️ Como se prevenir</h2>
            <ul>
              <li>Evitar sol excessivo.</li>
              <li>Realizar autoexame.</li>
              <li>Atenção ao histórico familiar.</li>
            </ul>
          </section>

          <section>
            <h2>🌞 Escudo contra o sol</h2>

            <div className="prev-grid">
              <div className="prev-box">
                <h3>🧢 Proteção Física</h3>
                <ul>
                  <li>Chapéus largos</li>
                  <li>Roupas escuras</li>
                  <li>Óculos UV400</li>
                  <li>Sombra e guarda-sol</li>
                </ul>
              </div>

              <div className="prev-box">
                <h3>🧴 Protetor Solar</h3>
                <ul>
                  <li>FPS 30+</li>
                  <li>Aplicar 15min antes</li>
                  <li>Reaplicar a cada 2h</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2>📅 Cuidados no dia a dia</h2>
            <p>Mesmo dirigir ou caminhar expõe a pele. Use protetor diariamente.</p>
          </section>

          <section>
            <h2>👶 Crianças e Bebês</h2>
            <ul>
              <li>Menos de 6 meses: sem protetor</li>
              <li>Até 2 anos: roupas + sombra</li>
              <li>Após 2 anos: protetor FPS 30+</li>
            </ul>
          </section>

          <section>
            <h2>👁️ Índice UV</h2>
            <p>UV 8 = muito alto • UV 11+ = extremo → evitar sol direto.</p>
          </section>

          <section>
            <h2>✨ Curiosidades</h2>
            <ul>
              <li>Mesmo nublado, UV atravessa nuvem.</li>
              <li>Chapéu não substitui protetor.</li>
              <li>Batom com FPS protege os lábios.</li>
            </ul>
          </section>

          {/* FAQ */}
          <section className="faq-section">
            <h2>❓ Perguntas Frequentes</h2>

            {faqs.map((item, i) => (
              <div className={`faq-card ${open === i ? "open" : ""}`} key={i}>
                <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="faq-q-icon">{item.icon}</span>
                  {item.q}
                  <span className="faq-arrow">{open === i ? "▲" : "▼"}</span>
                </button>

               <div
  className={`faq-content ${open === i ? "open" : ""}`}
  style={{ maxHeight: open === i ? "200px" : "0px" }}
>
  <p>{item.a}</p>
</div>

              </div>
            ))}
          </section>

        </div>
      </article>
            {/* BOTÕES FINAIS */}
      <div className="pele-buttons">
        <a href="/blog" className="btn-voltar">⬅ Voltar para o Blog</a>
        <a href="/" className="btn-home">🏠 Ir para Home</a>
      </div>
    </div>
  );
}
