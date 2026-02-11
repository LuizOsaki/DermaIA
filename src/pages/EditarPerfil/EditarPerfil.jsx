import { useState, useEffect } from "react";
import "./EditarPerfil.css";



// Firebase
import {
  getAuth,
  updateProfile,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default function Perfil() {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nascimento, setNascimento] = useState("");

  // SENHA
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [fotoFile, setFotoFile] = useState(null);

  // Carrega dados do usuário
  useEffect(() => {
    onAuthStateChanged(auth, async (userLogged) => {
      if (userLogged) {
        setUser(userLogged);

        setNome(userLogged.displayName || "");

        const refDoc = doc(db, "usuarios", userLogged.uid);
        const snap = await getDoc(refDoc);

        if (snap.exists()) {
          const data = snap.data();

          setTelefone(data.telefone || "");
          setNascimento(data.nascimento || "");
        }

        setPreview(userLogged.photoURL);
      }
    });
  }, []);

  // Upload foto
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // SALVAR DADOS
  async function salvar() {
    if (!user) return;

    const userRef = doc(db, "usuarios", user.uid);
    let fotoURL = user.photoURL;

    // Foto
    if (fotoFile) {
      const storageRef = ref(storage, `perfil/${user.uid}.jpg`);
      await uploadBytes(storageRef, fotoFile);
      fotoURL = await getDownloadURL(storageRef);

      await updateProfile(user, {
        photoURL: fotoURL,
      });
    }

    // Nome
    await updateProfile(user, { displayName: nome });

    // Firestore dados extras
    await setDoc(
      userRef,
      { nome, telefone, nascimento, photoURL: fotoURL },
      { merge: true }
    );

    alert("Perfil atualizado com sucesso!");
  }

  // ALTERAR SENHA
  async function alterarSenha() {
    if (!novaSenha || !confirmarSenha)
      return alert("Preencha ambos os campos de senha.");

    if (novaSenha.length < 6)
      return alert("A senha deve ter no mínimo 6 caracteres.");

    if (novaSenha !== confirmarSenha)
      return alert("As senhas não coincidem.");

    try {
      await updatePassword(auth.currentUser, novaSenha);
      alert("Senha alterada com sucesso!");

      setNovaSenha("");
      setConfirmarSenha("");
    } catch (error) {
      console.log(error);
      alert(
        "Erro ao alterar senha. Tente fazer login novamente para confirmar sua identidade."
      );
    }
  }

  if (!user) return <p>Carregando...</p>;

  return (
    <div className="perfil-container">
      <div className="perfil-box">

        <h2 className="perfil-title">Editar Perfil</h2>

        {/* FOTO */}
        <div className="perfil-photo-area">
          <div className="perfil-photo-wrapper">
            <img
              src={preview || "/assets/user-default.png"}
              alt="Foto de perfil"
              className="perfil-photo"
            />

            <label htmlFor="fotoInput" className="perfil-photo-button">
              Alterar foto
            </label>
            <input
              id="fotoInput"
              type="file"
              className="hidden-input"
              accept="image/*"
              onChange={handleImage}
            />
          </div>
        </div>

        {/* FORM */}
        <div className="perfil-form">

          <div className="perfil-input-group">
            <label>Nome completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="perfil-input-group">
            <label>Email</label>
            <input type="email" disabled value={user.email} />
          </div>

          <div className="perfil-input-group">
            <label>Telefone</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="perfil-input-group">
            <label>Data de nascimento</label>
            <input
              type="date"
              value={nascimento}
              onChange={(e) => setNascimento(e.target.value)}
            />
          </div>
        </div>

        <button className="perfil-save-btn" onClick={salvar}>
          Salvar alterações
        </button>

        {/* ==========================
            ALTERAR SENHA
        ========================== */}
        <h3 className="perfil-title" style={{ marginTop: "40px" }}>Alterar Senha</h3>

        <div className="perfil-form">

          <div className="perfil-input-group">
            <label>Nova senha</label>
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Digite a nova senha"
            />
          </div>

          <div className="perfil-input-group">
            <label>Confirmar nova senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Repita a nova senha"
            />
          </div>
        </div>

        <button
          className="perfil-save-btn"
          style={{ marginTop: "10px" }}
          onClick={alterarSenha}
        >
          Alterar senha
        </button>

      </div>
    </div>
  );
}