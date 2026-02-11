import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import "./Gamificacao.css";

function getRandomAvatar() {
  const id = Math.floor(Math.random() * 90) + 1;
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${id}`;
}

// ========= 15 BOTS =========
const botUsers = [
  { id: "b1", nome: "Ana Clara", avatar: getRandomAvatar(), vezesPassouProtetor: 230 },
  { id: "b2", nome: "João Victor", avatar: getRandomAvatar(), vezesPassouProtetor: 189 },
  { id: "b3", nome: "Mariana Cruz", avatar: getRandomAvatar(), vezesPassouProtetor: 301 },
  { id: "b4", nome: "Lucas Pereira", avatar: getRandomAvatar(), vezesPassouProtetor: 145 },
  { id: "b5", nome: "Camila Rocha", avatar: getRandomAvatar(), vezesPassouProtetor: 278 },
  { id: "b6", nome: "Bruno Alves", avatar: getRandomAvatar(), vezesPassouProtetor: 198 },
  { id: "b7", nome: "Isabela Mota", avatar: getRandomAvatar(), vezesPassouProtetor: 260 },
  { id: "b8", nome: "Henrique Dias", avatar: getRandomAvatar(), vezesPassouProtetor: 175 },
  { id: "b9", nome: "Sofia Lima", avatar: getRandomAvatar(), vezesPassouProtetor: 330 },
  { id: "b10", nome: "Pedro Mendes", avatar: getRandomAvatar(), vezesPassouProtetor: 210 },
  { id: "b11", nome: "Larissa Farias", avatar: getRandomAvatar(), vezesPassouProtetor: 299 },
  { id: "b12", nome: "Felipe Torres", avatar: getRandomAvatar(), vezesPassouProtetor: 188 },
  { id: "b13", nome: "Rafaela Duarte", avatar: getRandomAvatar(), vezesPassouProtetor: 260 },
  { id: "b14", nome: "Diego Castro", avatar: getRandomAvatar(), vezesPassouProtetor: 222 },
  { id: "b15", nome: "Carol Nogueira", avatar: getRandomAvatar(), vezesPassouProtetor: 312 },
];

export default function Gamificacao() {

  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // NOVO: CARD DE BOAS-VINDAS
  const [showIntro, setShowIntro] = useState(true);

  const opcoes = [
    { id: "rosto", label: "Rosto", pontos: 10 },
    { id: "bracos", label: "Braços", pontos: 15 },
    { id: "ombros", label: "Ombros", pontos: 12 },
    { id: "corpo", label: "Corpo inteiro", pontos: 40 },
  ];

  // ================================
  // LOADING DOS USUÁRIOS
  // ================================
  useEffect(() => {
    async function carregarUsuarios() {
      const db = getFirestore();
      const usuariosRef = collection(db, "usuarios");

      const snapshot = await getDocs(usuariosRef);

      const usuariosReais = snapshot.docs.map((d) => {
        const data = d.data();

        return {
          id: d.id,
          nome: data.nome || "Usuário",
          avatar: data.fotoPerfil || data.photoURL || getRandomAvatar(),
          vezesPassouProtetor: data.vezesPassouProtetor || 0,
        };
      });

      const rankingFinal = [...usuariosReais, ...botUsers].sort(
        (a, b) => (b.vezesPassouProtetor || 0) - (a.vezesPassouProtetor || 0)
      );

      setUsuarios(rankingFinal);
    }

    carregarUsuarios();
  }, []);

  // ================================
  // ADICIONAR PONTOS
  // ================================
  async function adicionarPontos() {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("Usuário não encontrado!");

    const totalPontos = selectedOptions.reduce((acc, item) => acc + item.pontos, 0);

    const db = getFirestore();
    const userRef = doc(db, "usuarios", userId);

    const usuarioAtual = usuarios.find((u) => u.id === userId);
    const pontosAtuais = usuarioAtual?.vezesPassouProtetor || 0;

    await updateDoc(userRef, {
      vezesPassouProtetor: pontosAtuais + totalPontos,
    });

    setShowModal(false);
    setSelectedOptions([]);

    window.location.reload();
  }

  // Reorganiza para deixar o 1º lugar no meio
  let top3 = usuarios.slice(0, 3);

  if (top3.length === 3) {
    top3 = [top3[1], top3[0], top3[2]];
  }

  const restantes = usuarios.slice(3);

  return (
    <div className="ranking-container">

      {/* === CARD DE BOAS-VINDAS === */}
      {showIntro && (
        <div className="intro-overlay">
          <div className="intro-card">
            <h2>Bem-vindo à Gamificação! ☀️</h2>

            <p>
              Aqui você ganha pontos sempre que registra o uso de protetor solar!
            </p>

            <ul>
              <li>✔ Use e registre → ganhe pontos</li>
              <li>✔ Quanto mais consistência, mais alto no ranking</li>
              <li>✔ Cuide da sua pele diariamente 😎</li>
            </ul>

            <button className="intro-btn" onClick={() => setShowIntro(false)}>
              Entendi!
            </button>
          </div>
        </div>
      )}

      <h1 className="ranking-title">Ranking Global</h1>
      <p className="ranking-subtitle">
        Veja sua posição entre os protetores mais dedicados!
      </p>

      {/* TOP 3 */}
      <div className="ranking-top3">
        {top3.map((user, idx) => (
          <div key={user.id} className={`top-card pos-${idx + 1}`}>
            <span className="medal">
              {user === top3[1]
                ? "🥇 1° Lugar"
                : idx === 0
                ? "🥈 2° Lugar"
                : "🥉 3° Lugar"}
            </span>

            <img src={user.avatar} className="top-avatar" />

            <h3>{user.nome}</h3>

            <p className="top-value">{user.vezesPassouProtetor} pts</p>
          </div>
        ))}
      </div>

      {/* LISTA COMPLETA */}
      <h2 className="ranking-list-title">Ranking Completo</h2>

      <div className="ranking-list">
        {restantes.map((user, index) => (
          <div key={user.id} className="ranking-item">
            <span className="ranking-position">{index + 4}</span>

            <img src={user.avatar} className="ranking-avatar" />

            <div className="ranking-info">
              <h4>{user.nome}</h4>
            </div>

            <span className="ranking-points">
              {user.vezesPassouProtetor} pts
            </span>
          </div>
        ))}
      </div>

      {/* BOTÃO FLUTUANTE */}
      <button className="add-button" onClick={() => setShowModal(true)}>
        Registrar Atividade
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="modal-bg">
          <div className="modal-box">

            <button className="modal-close-x" onClick={() => setShowModal(false)}>
              ✖
            </button>

            <h3>Onde você passou protetor?</h3>

            <div className="opcoes-list">
              {opcoes.map((item) => (
                <label key={item.id} className="opcao">
                  <input
                    type="checkbox"
                    checked={selectedOptions.some((i) => i.id === item.id)}
                    onChange={(e) => {
                      const checked = e.target.checked;

                      if (item.id === "corpo") {
                        setSelectedOptions(checked ? [item] : []);
                        return;
                      }

                      let novas = selectedOptions.filter((i) => i.id !== "corpo");

                      if (checked) {
                        novas = [...novas, item];
                      } else {
                        novas = novas.filter((i) => i.id !== item.id);
                      }

                      setSelectedOptions(novas);
                    }}
                  />
                  {item.label} (+{item.pontos} pts)
                </label>
              ))}
            </div>

            <button className="btn-add" onClick={adicionarPontos}>
              Adicionar Pontos
            </button>

          </div>
        </div>
      )}
    </div>
  );
}