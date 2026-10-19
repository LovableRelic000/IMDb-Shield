import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivacyModal from './components/PrivacyModal';
import MovieDetailsModal from './components/MovieDetailsModal';
import HomeView from './views/HomeView';
import RegisterView from './views/RegisterView';
import CatalogView from './views/CatalogView';
import { getMovieDetails } from './services/movieService';

export default function App() {
  // Estado de navegación entre las 3 pantallas requeridas
  const [activeScreen, setActiveScreen] = useState('home'); // 'home' | 'register' | 'catalog'

  // Estado del usuario activo
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('imdb_shield_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Estado de los logs de auditoría de seguridad
  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('imdb_shield_audit_logs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Estado de modales
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Guardar en localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('imdb_shield_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('imdb_shield_user');
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('imdb_shield_audit_logs', JSON.stringify(auditLogs));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [auditLogs]);

  // Manejador del Registro Exitoso
  const handleRegisterSuccess = (auditRecord) => {
    setCurrentUser({
      username: auditRecord.username,
      email: auditRecord.email,
      role: auditRecord.role,
      token: auditRecord.sessionToken
    });

    setAuditLogs((prev) => [auditRecord, ...prev.slice(0, 19)]); // Guardar últimos 20
  };

  // Limpiar auditoría
  const handleClearAuditLogs = () => {
    setAuditLogs([]);
    localStorage.removeItem('imdb_shield_audit_logs');
  };

  // Manejador de selección de película para modal de detalles
  const handleSelectMovie = async (movie) => {
    setIsDetailsOpen(true);
    setSelectedMovie(movie);
    // Carga asíncrona de datos extendidos si existen
    const detailed = await getMovieDetails(movie);
    setSelectedMovie(detailed);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-neutral-100 flex flex-col font-sans selection:bg-[#F5C518] selection:text-black">
      {/* Barra de Navegación Superior */}
      <Navbar
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        currentUser={currentUser}
        onLogout={handleLogout}
        openPrivacyModal={() => setIsPrivacyOpen(true)}
      />

      {/* Contenido Principal según la Pantalla Activa */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeScreen === 'home' && (
          <HomeView
            onNavigate={(screen) => setActiveScreen(screen)}
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
          />
        )}

        {activeScreen === 'register' && (
          <RegisterView
            onRegisterSuccess={handleRegisterSuccess}
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            auditLogs={auditLogs}
            onClearAuditLogs={handleClearAuditLogs}
          />
        )}

        {activeScreen === 'catalog' && (
          <CatalogView
            onSelectMovie={handleSelectMovie}
          />
        )}
      </main>

      {/* Pie de Página */}
      <Footer
        onNavigate={(screen) => setActiveScreen(screen)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Modal 1: Aviso de Privacidad Integral (LFPDPPP) */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        onAccept={() => setIsPrivacyOpen(false)}
      />

      {/* Modal 2: Ficha Técnica e Inspección RESTful JSON */}
      <MovieDetailsModal
        movie={selectedMovie}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedMovie(null);
        }}
      />
    </div>
  );
}
