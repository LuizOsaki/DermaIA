import React from 'react';

export default function Footer() {
  return (
    <>
      <div className="footer-top-bar">
        <a href="/">
        <img src="/assets/logobranca2.png" alt="Logo DermaIA" className="footer-logo-bar"/>
        </a>
      </div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section footer-about">
            <h3>Quem somos?</h3>
            <p>DermaIA — promovendo a análise inteligente de imagens de pele para auxiliar na detecção precoce do câncer de pele.</p>
          </div>

          <div className="footer-section footer-links">
            <h3>Institucional</h3>
            <ul>
              <li><a href="SobreNos">Sobre nós</a></li>
              <li><a href="EnviarFoto">Como funciona - nossa IA</a></li>
              <li><a href="SaibaMaisPlanos">Planos e assinaturas</a></li>
            </ul>
          </div>

          <div className="footer-section footer-support">
            <h3>Suporte</h3>
            <ul>
              <li><a href="FaleConosco">Fale conosco</a></li>
              <li><a href="FaleConosco">Dúvidas Frequentes (FAQ)</a></li>
            </ul>
          </div>

          <div className="footer-section footer-social">
            <div className="icon gmail">
              <a href="mailto:dermaia.app@gmail.com" className="social-icon"><img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="gmail"/></a>
            </div>
            <div className="icon linkedin">
              <a href="https://www.linkedin.com/in/dermaia" className="social-icon"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linkedin"/></a>
            </div>
            <div className="icon instagram">
              <a href="https://www.instagram.com/derma_ia/#" className="social-icon"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram"/></a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 DermaIA - Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
