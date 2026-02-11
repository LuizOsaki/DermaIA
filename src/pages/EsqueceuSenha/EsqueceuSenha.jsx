import { useState } from "react";
import "./EsqueceuSenha.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      setMsg("Digite um e-mail válido.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("O link de redefinição foi enviado para seu e-mail!");
    } catch (err) {
      setMsg("Erro ao enviar email. Verifique o endereço.");
    }
  }

  return (
    <div className="forgot-container">
      <div className="forgot-leftBox">

        <img
          src="/assets/dermaia-logo1.png"
          alt="Logo DermaIA"
          className="forgot-logo"
        />

        <h3 className="forgot-subtitle">
          Enviaremos um link de redefinição para o seu e-mail
        </h3>

        {msg && <p className="forgot-message">{msg}</p>}

        <form onSubmit={handleSubmit} className="forgot-form">

          <div className="forgot-inputGroup">
            <label htmlFor="email" className="forgot-label">
              <i className="fa-solid fa-at"></i>
            </label>

            <input
              type="email"
              id="email"
              className="forgot-input"
              placeholder="Coloque seu email aqui"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="forgot-btnReset">
            Enviar link de redefinição
          </button>
        </form>

        <a href="/Login" className="forgot-backLogin">
          Voltar para login
        </a>
      </div>

      <div className="forgot-rightSide">
        <img
          src="/assets/dermax.png"
          alt="Robô DermaIA"
          className="forgot-robotImg"
        />
      </div>
    </div>
  );
}