import React, { useEffect } from 'react';
import styles from './SaibaMaisPlanos.module.css';
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll";

const SaibaMais = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useFadeInOnScroll();

  return (
    <>
      {/* Hero + Título */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Descubra nossas ofertas e vantagens</h1>
          <p className={styles.heroSubtitle}>
            Aumente suas vendas de maneira eficiente e escolha o plano ideal para sua empresa.
          </p>
        </div>
      </section>

      <section id="planos" className={styles.planosSection}>
        <h2>Nossos Planos</h2>
        <p>Escolha o plano ideal para sua necessidade</p>

        <div className={styles.planosContainer}>

          {/* PLANO GRATUITO */}
          <article className={styles.planoCard}>
            <div className={styles.planoTop}>
              <h3>Plano Gratuito</h3>
            </div>
            <ul className={styles.planoLista}>
              <li className={styles.planoItem}>Análise de Manchas</li>
              <li className={styles.planoItem}>Alerta Climático</li>
              <li className={styles.planoItem}>Gamificação</li>
              <li className={styles.planoItem}>Mapa de Hospitais</li>
              <li className={styles.planoItem}>Dicas de Prevenção</li>
            </ul>
            <div className={`${styles.planoBottom} ${styles.whiteFooter}`}>
              <p>Gratuito<br /><span>—</span></p>
            </div>
          </article>

          {/* PLANO MÉDICO / DERMATOLOGISTA */}
          <article className={styles.planoCard}>
            <div className={styles.planoTop}>
              <h3>Médico/Dermatologista</h3>
            </div>
            <ul className={styles.planoLista}>
              <li className={styles.planoItem}>Análise de Manchas</li>
              <li className={styles.planoItem}>Alerta Climático</li>
              <li className={styles.planoItem}>Gamificação</li>
              <li className={styles.planoItem}>Mapa de Hospitais</li>
              <li className={styles.planoItem}>Dicas de Prevenção</li>
              <li className={styles.planoItem}>IA Avançada</li>
              <li className={styles.planoItem}>Dashboard de controle</li>
            </ul>
            <div className={`${styles.planoBottom} ${styles.whiteFooter}`}>
              <p>R$ 39,00<br /><span>Mensal</span></p>
            </div>
          </article>

          {/* PLANO HOSPITAL / CLÍNICAS */}
          <article className={styles.planoCard}>
            <div className={styles.planoTop}>
              <h3>Hospital/Clínicas</h3>
            </div>
            <ul className={styles.planoLista}>
              <li className={styles.planoItem}>Análise de Manchas</li>
              <li className={styles.planoItem}>Alerta Climático</li>
              <li className={styles.planoItem}>Gamificação</li>
              <li className={styles.planoItem}>Mapa de Hospitais</li>
              <li className={styles.planoItem}>Dicas de Prevenção</li>
              <li className={styles.planoItem}>IA Avançada</li>
              <li className={styles.planoItem}>Dashboard de controle</li>
              <li className={styles.planoItem}>10 Chaves de acesso</li>
            </ul>
            <div className={`${styles.planoBottom} ${styles.whiteFooter}`}>
              <p>R$ 319,00<br /><span>Mensal</span></p>
            </div>
          </article>

        </div>
      </section>

      {/* Tabela de Comparação */}
      <section className={styles.comparacaoSection + " fade-in"}>
        <h2 className={styles.sectionTitle}>Compare os planos</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.comparacaoTable}>
            <thead>
              <tr>
                <th>Recursos</th>
                <th>Gratuito</th>
                <th className={styles.destaqueHeader}>Médico/Dermatologista</th>
                <th>Hospital/Clínicas</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Análise de Manchas</td><td>✔</td><td>✔</td><td>✔</td></tr>
              <tr><td>Alerta Climático</td><td>✔</td><td>✔</td><td>✔</td></tr>
              <tr><td>Gamificação</td><td>✔</td><td>✔</td><td>✔</td></tr>
              <tr><td>IA Avançada</td><td>❌</td><td>✔</td><td>✔</td></tr>
              <tr><td>Dashboard de Controle</td><td>❌</td><td>✔</td><td>✔</td></tr>
              <tr><td>10 Chaves de Acesso</td><td>❌</td><td>❌</td><td>✔</td></tr>
              <tr><td>Suporte Prioritário</td><td>❌</td><td>✔</td><td>✔</td></tr>
              <tr className={styles.precoRow}>
                <td></td><td>Gratuito</td><td>R$ 39,00/mês</td><td>R$ 319,00/mês</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Formulário */}
      <section className={styles.contatoSection + " fade-in"}>
        <div className={styles.contatoGrid}>

          <div className={styles.contatoImagem}>
            <img src="/assets/dermax2.png" alt="Converse com especialistas" />
            <div className={styles.overlayText}>
              <h2>Converse com nossos especialistas</h2>
            </div>
          </div>

          <div className={styles.contatoForm}>
            <p className={styles.formTitle}>Envie uma mensagem para nós:</p>
            <form>
              <div className={styles.formRow}>
                <input type="text" placeholder="Nome" required />
                <input type="text" placeholder="Clínica / Consultório" />
              </div>
              <div className={styles.formRow}>
                <input type="text" placeholder="CNPJ" />
                <input type="email" placeholder="E-mail corporativo" required />
              </div>
              <div className={styles.formRow}>
                <input type="tel" placeholder="Whatsapp" required />
                <select defaultValue="">
                  <option value="" disabled>Quantos consultórios/filiais?</option>
                  <option>1 unidade</option>
                  <option>2 unidades</option>
                  <option>6–10 unidades</option>
                  <option>10+ unidades</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <input type="text" placeholder="Número de usuários" />
                <select defaultValue="">
                  <option value="" disabled>Segmento</option>
                  <option>Dermatologista Autônomo</option>
                  <option>Clínica de Dermatologia</option>
                  <option>Hospital / Rede de Saúde</option>
                  <option>Outros</option>
                </select>
              </div>

              <textarea rows="4" placeholder="Escreva aqui sua dúvida:" />

              <button type="submit" className={styles.enviarBtn}>Agendar demonstração</button>
            </form>
          </div>

        </div>
      </section>
    </>
  );
};

export default SaibaMais;
