import React, { useState } from "react";
import "./Dicapele.css";

export default function PeleResumo() {
  const faq = [
    {
      q: "É possível bronzear sem prejudicar a pele?",
      a: "Sim. Exposição moderada antes das 10h e após as 16h reduz danos, mas ainda exige FPS 30+.",
    },
    {
      q: "Existe um tipo de pele mais sensível ao câncer de pele?",
      a: "Sim. Peles claras, olhos claros e cabelos loiros/ruivos têm maior risco por produzirem menos melanina.",
    },
    {
      q: "Peles escuras têm menos chance de desenvolver câncer? Por quê?",
      a: "Sim, têm mais melanina, mas não elimina o risco. Câncer ainda pode ocorrer após exposições intensas.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <div className="pele-container">

      {/* CARD PRINCIPAL */}
      <div className="prev-card">
        <div className="prev-header">
          <div className="prev-header-icon">🧴</div>

          <div>
            <h1>Resumo — A Pele e Seus Processos</h1>
            <p className="subtitle">
              Informações essenciais sobre estrutura, funções e saúde da pele
            </p>
          </div>

          <div className="prev-tags">
            <span className="tag-green">Ciência</span>
            <span className="tag-blue">Anatomia</span>
          </div>
        </div>

        <div className="prev-body">

          {/* Conteúdo normal */}
          <section>
            <h2>🫧 A Pele</h2>
            <p>A pele é o maior órgão do corpo e representa cerca de 16% do peso corporal.</p>

            <ul>
              <li>Protege contra agressões físicas, químicas e biológicas;</li>
              <li>Controla a perda de água;</li>
              <li>Regula a temperatura;</li>
              <li>Permite toque, pressão e temperatura;</li>
            </ul>
          </section>

          <section>
            <h2>🩻 Camadas da Pele</h2>

            <div className="prev-grid">
              <div className="prev-box">
                <strong>Epiderme</strong>
                <p>Camada superficial onde surgem cânceres de pele.</p>
              </div>

              <div className="prev-box">
                <strong>Derme</strong>
                <p>Contém colágeno e elastina — sustentação da pele.</p>
              </div>

              <div className="prev-box">
                <strong>Hipoderme</strong>
                <p>Gordura protetora e ligação muscular.</p>
              </div>
            </div>
          </section>

          <section>
            <h2>🔬 Epiderme por Dentro</h2>
            <ul>
              <li>Basal – nascimento das células.</li>
              <li>Espinhosa – distribui água e nutrientes.</li>
              <li>Granulosa – barreira impermeável.</li>
              <li>Lúcida – proteção extra (mãos e pés).</li>
              <li>Córnea – células mortas que descamam.</li>
            </ul>
            <p>
              <em>Renovação completa: cerca de 28 dias.</em>
            </p>
          </section>

          <section>
            <h2>🩹 Danos e Cicatrização</h2>

            <ul>
              <li>Ferimentos formam casquinhas — não retirar.</li>
              <li>Processo: inflamatória → proliferativa → reparo.</li>
              <li>Queloide: cicatriz elevada.</li>
              <li>Queimaduras: 1º, 2º e 3º grau.</li>
            </ul>
          </section>

          <section>
            <h2>🌞 Cor da Pele e Sol</h2>
            <p>Melanina protege contra UV, mas bronzeado é sinal de dano celular.</p>

            <ul>
              <li>Peles escuras filtram mais UV;</li>
              <li>Mesmo assim, podem desenvolver câncer de pele.</li>
            </ul>
          </section>

          {/* FAQ */}
          <section className="faq-section">
            <h2>❓ Dúvidas Frequentes</h2>

            {faq.map((item, index) => (
              <div
                key={index}
                className={`faq-card ${open === index ? "open" : ""}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpen(open === index ? null : index)}
                >
                  <span>{item.q}</span>
                  <span className={`arrow ${open === index ? "open" : ""}`}>
                    ▼
                  </span>
                </button>

                <div
                  className={`faq-content ${open === index ? "open" : ""}`}
                  style={{ maxHeight: open === index ? "200px" : "0px" }}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* BOTÕES FINAIS */}
      <div className="pele-buttons">
        <a href="/blog" className="btn-voltar">⬅ Voltar para o Blog</a>
        <a href="/" className="btn-home">🏠 Ir para Home</a>
      </div>

    </div>
  );
}
