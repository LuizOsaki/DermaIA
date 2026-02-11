import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const auth = getAuth();

  const handleLogout = async () => {
    await signOut(auth);
    setOpenMenu(false);
  };

  const toggleMenu = () => {
    setOpenMenu(prev => !prev);
  };

  // Fecha o card ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <button className="menu-btn" onClick={onMenuClick}>☰ Menu</button>

      <div className="logo-container">
        <a href="/">
          <img src="/assets/logobranca2.png" alt="DermaIA" className="logo" />
        </a>
      </div>

      {user ? (
        <div className="user-menu" ref={menuRef}>
          <img
            src={user.photoURL || "/assets/user-default.png"}
            alt="Foto"
            className="profile-img"
            onClick={toggleMenu}
          />

          {/* card dropdown */}
          {openMenu && (
            <div className="user-card">
              <a href="/EditarPerfil" className="user-card-item">⚙️ Opções</a>
              <button onClick={handleLogout} className="user-card-item logout">
                ⏻ Sair
              </button>
            </div>
          )}
        </div>
      ) : (
        <a href="/Login" className="btn-login">Login</a>
      )}
    </header>
  );
}
