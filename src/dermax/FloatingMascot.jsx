// src/components/FloatingMascot.jsx
import React, { useState, useEffect } from "react";
import ChatModal from "./ChatModal";
import "./floatingMascot.css";


const MASCOT_SRC = "/assets/dermax.png";


export default function FloatingMascot({
  position = "bottom-right", // "bottom-right" | "bottom-left" | "center-right" | "center-left"
}) {
  const [open, setOpen] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const hoverPhrases = [
    "Oi! Precisa de ajuda?",
    "Posso te ajudar com dúvidas técnicas.",
    "Clique aqui pra conversar!",
    "Quer ver tutoriais?",
  ];

  useEffect(() => {
    let idx = 0;
    const t = setInterval(() => {
      setHoverText(hoverPhrases[idx]);
      idx = (idx + 1) % hoverPhrases.length;
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const handleToggle = () => {
    setOpen((v) => !v);
  };

  return (
    <>
      <div
        className={`floating-mascot ${position} ${open ? "open" : ""}`}
        role="button"
        aria-label="Assistente"
      >
        <div
          className="mascot-bubble"
          onClick={handleToggle}
          onKeyDown={(e) => e.key === "Enter" && handleToggle()}
          tabIndex={0}
          title="Assistente"
        >
          <img src={MASCOT_SRC} alt="Mascote" className="mascot-img" />
          <div className="pulse" />
        </div>

        <div className="mascot-hover-text" aria-hidden={!hoverText}>
          {hoverText}
        </div>
      </div>

      <ChatModal open={open} onClose={() => setOpen(false)} mascotSrc={MASCOT_SRC} />
    </>
  );
}
