import React, { useEffect, useState } from "react";
import styles from "./Analise.module.css";

// URL do backend FastAPI (Render)
const IA_API_URL = "https://dermaia-backend-fastapi.onrender.com";

export default function Analise() {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fotoSalva = localStorage.getItem("foto_enviada");
    if (fotoSalva) {
      setPreview(fotoSalva);
      enviarParaIA(fotoSalva);
    }
  }, []);

  // Converte Base64 em Blob
  function base64ToBlob(base64) {
    const [metadata, data] = base64.split(",");
    const byteString = atob(data);
    const mimeString = metadata.match(/:(.*?);/)[1];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  async function enviarParaIA(imagemBase64) {
    try {
      const blob = base64ToBlob(imagemBase64);

      const formData = new FormData();
      formData.append("file", blob, "foto.jpg");

      const response = await fetch(`${IA_API_URL}/predict-image`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const result = await response.json();
      console.log("RESULTADO IA:", result);

      const prob = result.probability;

      if (prob > 0.5) {
        window.location.href = "/AltaSugestao";
      } else {
        window.location.href = "/BaixaSugestao";
      }
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      window.location.href = "/ReenviarFoto";
    }
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.textArea}>
          <h1>Estamos processando sua imagem com cuidado.</h1>
          <p>
            Esse processo é rápido e seguro — suas fotos{" "}
            <strong>não são armazenadas</strong> e são usadas somente para
            análise.
          </p>

          <ul>
            <li>
              <span className={styles.icon}>🔒</span>
              Privacidade garantida: a imagem é removida após a análise.
            </li>

            <li>
              <span className={styles.icon}>⏱️</span>
              Tempo estimado: alguns segundos.
            </li>

            <li>
              <span className={styles.icon}>🔍</span>
              A IA avalia forma, cor, bordas, textura e padrão da mancha.
            </li>
          </ul>

          <div className={styles.status}>
            <span className={styles.loadingIcon}>⟳</span>
            <span className={styles.pulse}>Validando...</span>
          </div>
        </div>

        <div className={styles.photoBox}>
          {preview ? (
            <img src={preview} alt="Foto enviada para análise" />
          ) : (
            <p>Carregando imagem...</p>
          )}
        </div>
      </div>
    </main>
  );
}