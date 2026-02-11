import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import "leaflet/dist/leaflet.css";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import FaleConosco from "./pages/FaleConosco/FaleConosco";
import MapaHospitais from './pages/MapaHospitais/MapaHospitais';
import SobreNos from './pages/SobreNos/SobreNos';
import AltaSugestao from './pages/AltaSugestao/AltaSugestao';
import Analise from './pages/Analise/Analise';
import BaixaSugestao from './pages/BaixaSugestao/BaixaSugestao';
import EnviarFoto from './pages/EnviarFoto/EnviarFoto';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingMascot from "./dermax/FloatingMascot.jsx";
import DicaPrevencao from './pages/DicaPrevencao/DicaPrevencao';
import Dicapele from './pages/Dicapele/Dicapele';
import DicaSol from './pages/DicaSol/DicaSol';
import Blog from './pages/Blog/Blog';
import ReenviarFoto from './pages/ReenviarFoto/ReenviarFoto';
import Cadastro from './pages/Cadastro/Cadastro';
import EsqueceuSenha from './pages/EsqueceuSenha/EsqueceuSenha';
import Gamificacao from './pages/Gamificacao/Gamificacao';
import ProtectedRoute from "./components/ProtectedRoute";
import EditarPerfil from './pages/EditarPerfil/EditarPerfil';
import SaibaMaisPlanos from './pages/SaibaMaisPlanos/SaibaMaisPlanos';
import AlertaClimatico from './pages/AlertaClimatico/AlertaClimatico';



export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <BrowserRouter>
      <Navbar onMenuClick={toggleSidebar} />
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/faleconosco" element={<FaleConosco />} />
        <Route path="/mapahospitais" element={<MapaHospitais/>}/>
        <Route path="/sobrenos" element={<SobreNos/>}/>
        <Route path="/altasugestao" element={<AltaSugestao/>}/>
        <Route path="/analise" element={<Analise/>}/>
        <Route path="/baixasugestao" element={<BaixaSugestao/>}/>
        <Route
          path="/enviarfoto"
          element={
          <ProtectedRoute>
            <EnviarFoto/>
            </ProtectedRoute>}/>
        <Route path="/dicaprevencao" element={<DicaPrevencao/>}/>
        <Route path="/dicapele" element={<Dicapele/>}/>
        <Route path="/dicasol" element={<DicaSol/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/reenviarfoto" element={<ReenviarFoto/>}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/esqueceusenha" element={<EsqueceuSenha/>}/>
        <Route
          path="/gamificacao"
          element={
            <ProtectedRoute>
              <Gamificacao />
        </ProtectedRoute>
      }
      />
      <Route path="/editarPerfil" element={<EditarPerfil/>}/>
      <Route path="/saibamaisplanos" element={<SaibaMaisPlanos />} />
      <Route path="/alertaclimatico" element={<AlertaClimatico />} />

      </Routes>
      {/* seu layout */}
      <FloatingMascot position="bottom-right" />
      <Footer/>
      </BrowserRouter>
  );
}





