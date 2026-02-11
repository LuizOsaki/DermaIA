import React, { useEffect, useState } from 'react';
import { FaUser, FaTimes } from 'react-icons/fa';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ open, onClose }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  // Detectar usuário logado
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  // Fechar com ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Função do botão de usuário
  const handleUserClick = () => {
    if (user) {
      navigate("/EditarPerfil");
    } else {
      navigate("/Login");
    }
  };

  return (
    <nav className={`sidebar ${open ? 'open active' : ''}`} id="sidebar" aria-hidden={!open}>

      {/* Botão de Fechar */}
      <button className="close-btn" onClick={onClose} aria-label="Fechar menu">
        <FaTimes size={22} />
      </button>

      {/* Área do Usuário */}
      <div className="sidebar-user">
        <button className="btn-user" onClick={handleUserClick}>
          <FaUser style={{ marginRight: "8px" }} />

          {user ? (
            <span>Olá, {user.displayName || "Usuário"}</span>
          ) : (
            <span>Olá, Faça seu Login</span>
          )}
        </button>
      </div>

      <ul>
        <li><a href="/">Início</a></li>
        <li><a href="EnviarFoto">Análise de lesões com IA</a></li>
        <li><a href="AlertaClimatico">Alerta climático</a></li>
        <li><a href="Gamificacao">Desafios de proteção</a></li>
        <li><a href="MapaHospitais">Mapa de hospitais e clínicas próximas</a></li>
        <li><a href="Blog">Dicas de prevenção</a></li>
        <li><a href="SobreNos">Sobre nós</a></li>
        <li><a href="FaleConosco">Perguntas frequentes (FAQ)</a></li>
      </ul>
    </nav>
  );
}
