import React, { useState } from 'react';
import { Shield, Film, UserPlus, Home, Lock, KeyRound, Menu, X, UserCheck, ShieldAlert } from 'lucide-react';

export default function Navbar({ activeScreen, setActiveScreen, currentUser, onLogout, openPrivacyModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home, subtitle: 'Arquitectura Unidad 3' },
    { id: 'register', label: 'Registro de Usuario', icon: UserPlus, subtitle: 'Validación & Cifrado' },
    { id: 'catalog', label: 'Catálogo de Películas', icon: Film, subtitle: 'REST API & OMDb' },
  ];

  const handleNavClick = (id) => {
    setActiveScreen(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0d0f]/90 backdrop-blur-md border-b border-neutral-800/80 transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex items-center">
              <span className="bg-[#F5C518] text-black font-black text-xl px-2.5 py-1 rounded-md tracking-tighter shadow-lg shadow-[#F5C518]/20 group-hover:scale-105 transition-transform">
                IMDb
              </span>
              <div className="flex items-center gap-1.5 ml-2">
                <Shield className="w-5 h-5 text-[#F5C518] group-hover:rotate-12 transition-transform" />
                <span className="text-white font-extrabold text-lg tracking-tight">
                  SHIELD
                </span>
              </div>
            </div>
            
            <span className="hidden xl:inline-block text-[11px] font-semibold text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-full">
              Unidad 3: Seguridad & REST APIs
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'bg-[#1c1c22] text-[#F5C518] border border-[#F5C518]/30 shadow-md shadow-[#F5C518]/5'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#F5C518]' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-[#F5C518] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Status & Current User */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-[#F5C518]/20 border border-[#F5C518]/40 flex items-center justify-center text-[#F5C518]">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    {currentUser.username}
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#F5C518] text-black font-extrabold uppercase">
                      {currentUser.role === 'admin' ? 'Admin' : 'Usuario'}
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    Token Activo • SHA-256
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="text-xs text-neutral-400 hover:text-rose-400 transition ml-1 px-1.5 py-1 rounded hover:bg-neutral-800"
                  title="Cerrar Sesión Local"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="hidden 2xl:flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono bg-neutral-900/70 border border-neutral-800 px-2.5 py-1 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>TLS 1.3 / HTTPS</span>
                </div>
                <button
                  onClick={() => openPrivacyModal()}
                  className="text-xs text-neutral-400 hover:text-[#F5C518] transition flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-800 hover:border-[#F5C518]/30 hover:bg-neutral-900"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Aviso LFPDPPP</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-[#121215] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition ${
                  isActive
                    ? 'bg-[#1c1c22] text-[#F5C518] border border-[#F5C518]/30'
                    : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#F5C518]' : 'text-neutral-400'}`} />
                <div>
                  <div className="font-bold">{item.label}</div>
                  <div className="text-xs text-neutral-500 font-normal">{item.subtitle}</div>
                </div>
              </button>
            );
          })}

          <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openPrivacyModal();
              }}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-[#F5C518]"
            >
              <Lock className="w-3.5 h-3.5 text-[#F5C518]" />
              Ver Aviso de Privacidad (LFPDPPP)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
