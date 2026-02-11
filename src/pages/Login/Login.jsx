import { useState } from "react";
import styles from "./Login.module.css";

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { db } from "../../firebase"; // 🔥 AJUSTE O CAMINHO PARA O SEU PROJETO
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Login() {
  const auth = getAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", senha: "" });
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrorMsg("");
  }

  // ================================
  // LOGIN COM EMAIL E SENHA
  // ================================
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email || !form.senha) {
      setErrorMsg("Preencha todos os campos.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, form.email, form.senha);
      setErrorMsg("");
      window.location.href = "/"; // 🔥 REDIRECIONA APÓS LOGIN
    } catch (err) {
      setErrorMsg("Email ou senha incorretos.");
    }
  }

  // =====================================================
  // FUNÇÃO PARA CRIAR PERFIL NO FIRESTORE (GOOGLE / APPLE)
  // =====================================================
  async function criarPerfilSeNaoExistir(user) {
    const userRef = doc(db, "usuarios", user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      await setDoc(userRef, {
        nome: user.displayName || "",
        email: user.email || "",
        telefone: user.phoneNumber || "",
        nascimento: "",
        genero: "",
        pontos: 0,
        vezesPassouProtetor: 0,
        criadoEm: new Date(),
      });
    }
  }

  // ================================
  // LOGIN COM GOOGLE
  // ================================
  async function loginGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      await criarPerfilSeNaoExistir(result.user);

      window.location.href = "/";
    } catch (err) {
      console.log(err);
      setErrorMsg("Erro ao entrar com Google.");
    }
  }

  // ================================
  // LOGIN COM APPLE / ICLOUD
  // ================================
  async function loginApple() {
    try {
      const provider = new OAuthProvider("apple.com");
      const result = await signInWithPopup(auth, provider);

      await criarPerfilSeNaoExistir(result.user);

      window.location.href = "/";
    } catch (err) {
      console.log(err);
      setErrorMsg("Erro ao entrar com Apple/iCloud.");
    }
  }

  // ================================
  // RENDER
  // ================================
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <img
            src="/assets/dermaia-logo1.png"
            alt="Logo DermaIA"
            className={styles.logoImg}
          />
        </div>

        {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className={styles.inputGroup}>
            <label htmlFor="email">
              <i className="fa-solid fa-at"></i>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Coloque seu email aqui"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* SENHA */}
          <div className={styles.inputGroup}>
            <label htmlFor="senha">
              <i className="fa-solid fa-lock"></i>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="senha"
              placeholder="Coloque sua senha aqui"
              value={form.senha}
              onChange={handleChange}
              required
            />
          </div>

          {/* OPÇÕES */}
          <div className={styles.options}>
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Ver senha
            </label>

            <a href="/EsqueceuSenha">Esqueci minha senha?</a>
          </div>

          <button type="submit" className={styles.btnLogin}>
            ENTRAR
          </button>

          <p className={styles.signupText}>
            Não tenho conta? <a href="/Cadastro">Criar uma conta</a>
          </p>
        </form>

        {/* LOGIN SOCIAL */}
        <div className={styles.socialButtons}>
          <button className={styles.googleBtn} onClick={loginGoogle}>
            <img src="/assets/logo_google.png" alt="" />
            Google
          </button>

          <button className={styles.icloudBtn} onClick={loginApple}>
            <img src="/assets/logo_apple.png" alt="" />
            Aplee
          </button>
        </div>
      </div>

      {/* IMAGEM DO ROBÔ */}
      <div className={styles.robotSide}>
        <img src="/assets/dermax.png" alt="Robô DermaIA" />
      </div>
    </div>
  );
}