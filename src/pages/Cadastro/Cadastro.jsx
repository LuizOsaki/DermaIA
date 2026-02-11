// Cadastro.jsx
import React, { useState } from "react";
import "./Cadastro.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmar: "",
    nascimento: "",
    genero: "",
    termos: false,
    politica: false,
  });

  const [errors, setErrors] = useState({});

  // =====================================================================
  // 🔥 Atualiza inputs
  // =====================================================================
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // remover erro quando usuário digita novamente
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  // =====================================================================
  // 🔥 Validação local
  // =====================================================================
  function validarCampos() {
    let newErrors = {};

    if (!form.nome) newErrors.nome = "Preencha o nome.";
    if (!form.email) {
      newErrors.email = "Digite um email.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Formato de email inválido.";
    }

    if (!form.senha) newErrors.senha = "Digite uma senha.";
    if (!form.confirmar) newErrors.confirmar = "Confirme a senha.";
    if (form.senha && form.confirmar && form.senha !== form.confirmar) {
      newErrors.confirmar = "As senhas não coincidem.";
    }

    if (!form.nascimento) newErrors.nascimento = "Preencha a data.";
    if (!form.genero) newErrors.genero = "Selecione o gênero.";

    if (!form.termos) newErrors.termos = "Obrigatório.";
    if (!form.politica) newErrors.politica = "Obrigatório.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // =====================================================================
  // 🔥 Firestore — cria documento
  // =====================================================================
  async function criarDocumentoUsuario(user) {
    const ref = doc(db, "usuarios", user.uid);
    const snap = await getDoc(ref);

    const fotoPadrao = `https://api.dicebear.com/7.x/bottts/svg?seed=${user.uid}`;

    if (!snap.exists()) {
      await setDoc(ref, {
        nome: form.nome || user.displayName || "",
        email: user.email || "",
        genero: form.genero || "",
        nascimento: form.nascimento || "",
        telefone: form.telefone || "",
        criadoEm: new Date(),

        fotoPerfil: user.photoURL || fotoPadrao,

        pontos: 0,
        vezesPassouProtetor: 0,
      });
    }
  }

  // =====================================================================
  // 🔥 Enviar cadastro
  // =====================================================================
  async function handleSubmit(e) {
    e.preventDefault();

    if (!validarCampos()) return;

    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.senha
      );

      await criarDocumentoUsuario(cred.user);
      localStorage.setItem("userId", cred.user.uid);

      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setErrors((prev) => ({
          ...prev,
          email: "Este email já foi utilizado.",
        }));
        return;
      }

      setErrors((prev) => ({
        ...prev,
        geral: "Erro ao cadastrar: " + err.message,
      }));
    }
  }

  // =====================================================================
  // 🔥 Login com Google
  // =====================================================================
  async function loginGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      await criarDocumentoUsuario(result.user);
      localStorage.setItem("userId", result.user.uid);

      navigate("/");
    } catch (err) {
      setErrors({ geral: "Erro no Google: " + err.message });
    }
  }

  // =====================================================================
  // 🔥 Login com Apple
  // =====================================================================
  async function loginApple() {
    try {
      const provider = new OAuthProvider("apple.com");
      const result = await signInWithPopup(auth, provider);

      await criarDocumentoUsuario(result.user);
      localStorage.setItem("userId", result.user.uid);

      navigate("/");
    } catch (err) {
      setErrors({ geral: "Erro no Apple: " + err.message });
    }
  }

  // =====================================================================
  // 🔥 JSX
  // =====================================================================
  return (
    <div className="page-cadastro__container">
      
      {/* LADO ESQUERDO */}
      <div className="page-cadastro__left">
        <img
          src="/assets/robo_direita.png"
          className="page-cadastro__robot"
          alt="Robô"
        />
      </div>

      {/* LADO DIREITO */}
      <div className="page-cadastro__right">
        <div className="page-cadastro__card">
          
          <img
            src="/assets/logo_colorida.png"
            className="page-cadastro__logo"
            alt="Logo"
          />

          <h2 className="page-cadastro__title">Dados cadastrais:</h2>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="page-cadastro__form">

            {/* NOME */}
            <div className={`page-cadastro__input-group ${errors.nome ? "error" : ""}`}>
              <label>Nome Completo:</label>
              <input name="nome" value={form.nome} onChange={handleChange} />
              {errors.nome && <span className="error-msg">{errors.nome}</span>}
            </div>

            {/* EMAIL */}
            <div className={`page-cadastro__input-group ${errors.email ? "error" : ""}`}>
              <label>Email:</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />

              {errors.email && (
                <span className="error-msg">{errors.email}</span>
              )}
            </div>

            {/* TELEFONE */}
            <div className="page-cadastro__input-group">
              <label>Telefone (opcional):</label>
              <input
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
              />
            </div>

            {/* SENHA + CONFIRMAR */}
            <div className="page-cadastro__two-fields">

              <div className={`page-cadastro__input-group ${errors.senha ? "error" : ""}`}>
                <label>Senha:</label>
                <div className="page-cadastro__password-box">
                  <input
                    type={showSenha ? "text" : "password"}
                    name="senha"
                    value={form.senha}
                    onChange={handleChange}
                  />
                  <span
                    className="page-cadastro__show-pass"
                    onClick={() => setShowSenha(!showSenha)}
                  >
                    {showSenha ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>
                {errors.senha && <span className="error-msg">{errors.senha}</span>}
              </div>

              <div className={`page-cadastro__input-group ${errors.confirmar ? "error" : ""}`}>
                <label>Confirmar senha:</label>
                <div className="page-cadastro__password-box">
                  <input
                    type={showConfirmar ? "text" : "password"}
                    name="confirmar"
                    value={form.confirmar}
                    onChange={handleChange}
                  />
                  <span
                    className="page-cadastro__show-pass"
                    onClick={() => setShowConfirmar(!showConfirmar)}
                  >
                    {showConfirmar ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>
                {errors.confirmar && (
                  <span className="error-msg">{errors.confirmar}</span>
                )}
              </div>

            </div>

            {/* DATA + GENERO */}
            <div className="page-cadastro__two-fields">

              <div className={`page-cadastro__input-group ${errors.nascimento ? "error" : ""}`}>
                <label>Data de nascimento:</label>
                <input
                  type="date"
                  name="nascimento"
                  value={form.nascimento}
                  onChange={handleChange}
                />
                {errors.nascimento && (
                  <span className="error-msg">{errors.nascimento}</span>
                )}
              </div>

              <div className={`page-cadastro__input-group ${errors.genero ? "error" : ""}`}>
                <label>Gênero:</label>
                <select
                  name="genero"
                  value={form.genero}
                  onChange={handleChange}
                >
                  <option value="">Selecionar</option>
                  <option>Homem</option>
                  <option>Mulher</option>
                  <option>Não informar</option>
                </select>
                {errors.genero && (
                  <span className="error-msg">{errors.genero}</span>
                )}
              </div>

            </div>

            {/* CHECKBOXES */}
            <div className="page-cadastro__check-area">
              <label className={errors.termos ? "error-text" : ""}>
                <input
                  type="checkbox"
                  name="termos"
                  checked={form.termos}
                  onChange={handleChange}
                />
                Aceitar Termos de Uso
              </label>

              <label className={errors.politica ? "error-text" : ""}>
                <input
                  type="checkbox"
                  name="politica"
                  checked={form.politica}
                  onChange={handleChange}
                />
                Aceitar Políticas de Privacidade
              </label>
            </div>

            {/* BOTÃO */}
            <button type="submit" className="page-cadastro__btn-submit">
              Cadastrar
            </button>
          </form>

          <p className="page-cadastro__divider">OU continue com</p>

          {/* LOGIN SOCIAL */}
          <div className="page-cadastro__social-row">
            <button className="page-cadastro__btn-google" onClick={loginGoogle}>
              <img src="/assets/logo_google.png" alt="Google" />
              Google
            </button>

            <button className="page-cadastro__btn-icloud" onClick={loginApple}>
              <img src="/assets/logo_apple.png" alt="iCloud" />
              Apple 
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
