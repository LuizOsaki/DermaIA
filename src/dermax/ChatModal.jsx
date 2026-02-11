// src/components/ChatModal.jsx
import React, { useState, useEffect, useRef } from "react";
import "./floatingMascot.css";

const OPENAI_API_URL = import.meta.env.VITE_OPENAI_API_URL;

export default function ChatModal({ open, onClose, mascotSrc }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Olá! Eu sou o Dermax, seu assistente. Em que posso ajudar?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef();

  useEffect(() => {
    if (open) {
      // focar input
      setTimeout(() => {
        const el = document.querySelector(".chat-input");
        el?.focus();
      }, 250);
    }
  }, [open]);

  useEffect(() => {
    // Scroll to bottom
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { from: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://chat-bot-v4lv.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      if (!res.ok) throw new Error("Erro no servidor");
      const data = await res.json();
      const botText = data.reply ?? "Desculpe, não entendi — pode reformular?";
      setMessages((m) => [...m, { from: "bot", text: botText }]);
    } catch (err) {
      setMessages((m) => [...m, { from: "bot", text: "Erro ao conectar com o servidor." }]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="chat-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="chat-window" role="dialog" aria-modal="true">
        <div className="chat-header">
          <img src={mascotSrc} alt="Mascote" className="chat-header-avatar" />
          <div className="chat-header-title">
            Dermax — Assistente
            <div className="chat-subtitle">Pronto para ajudar</div>
          </div>
          <button className="chat-close" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        <div className="chat-messages" ref={messagesRef}>
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.from === "bot" ? "bot" : "user"}`}>
              {m.from === "bot" && <img src={mascotSrc} alt="bot" className="msg-avatar" />}
              <div className="msg-text">{m.text}</div>
            </div>
          ))}
          {loading && (
            <div className="msg bot">
              <img src={mascotSrc} alt="bot" className="msg-avatar" />
              <div className="msg-text">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
        </div>

        <div className="chat-footer">
          <textarea
            className="chat-input"
            placeholder="Digite sua mensagem e pressione Enter..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
          />
          <button className="chat-send" onClick={sendMessage} disabled={loading}>
            {loading ? "..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
}