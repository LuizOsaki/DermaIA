import React from 'react';
import { Link } from 'react-router-dom';
import useFadeInOnScroll from '../hooks/useFadeInOnScroll';

export default function CardsSaude() {
  useFadeInOnScroll();

  return (
    <>
      <section className="saude-bemestar fade-in">
        <h3>Saúde e Bem-Estar</h3>
        <p>Leia conteúdos sobre saúde e amplie seu conhecimento</p>

        <div className="cards">

          {/* CARD 1 */}
          <Link className="card" to="/DicaSol">
            <img src="/assets/sunimage.jpg" alt="Sol" />
            <h4>O Sol</h4>
            <p>Ele dá energia, calor e bons momentos ao ar livre. Mas também pode ser intenso e causar danos invisíveis à pele.</p>
          </Link>

          {/* CARD 2 */}
          <Link className="card" to="/DicaPrevencao">
            <img src="/assets/protetorsolar.jpg" alt="Prevenção" />
            <h4>Prevenção</h4>
            <p>Não controlamos o clima, mas podemos escolher como nos proteger.</p>
          </Link>

          {/* CARD 3 */}
          <Link className="card" to="/DicaPele">
            <img src="/assets/suncream-suntan-lotion-beautiful-woman-applying-beautiful-face-sunscreen-solar-cream-skin-care_231834-2124.jpg" alt="A pele" />
            <h4>A pele</h4>
            <p>Nossa pele é uma armadura preciosa. Cuide dela e reaja ao sol. Mas toda pele precisa de cuidados.</p>
          </Link>

        </div>
      </section>
    </>
  );
}
