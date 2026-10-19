import React from 'react';
import { Shield, Lock, FileCheck2, Globe2, Heart } from 'lucide-react';

export default function Footer({ onNavigate, onOpenPrivacy }) {
  return (
    <footer className="w-full border-t border-neutral-800 bg-[#0a0a0c] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#F5C518] text-black font-black text-lg px-2 py-0.5 rounded tracking-tighter">
                IMDb
              </span>
              <Shield className="w-4 h-4 text-[#F5C518]" />
              <span className="text-white font-extrabold text-base tracking-tight">
                SHIELD
              </span>
            </div>
            <p className="text-neutral-400 text-xs max-w-sm leading-relaxed">
              Plataforma y catálogo cinematográfico implementado para los requisitos académicos de la 
              <strong> Unidad 3: Seguridad, Web Services REST y APIs</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-emerald-400">
                TLS 1.3 Active
              </span>
              <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[#F5C518]">
                SHA-256 Crypto
              </span>
              <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-sky-400">
                LFPDPPP Compliant
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
              Navegación del Sistema
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#F5C518] transition">
                  Pantalla 1: Inicio & Arquitectura
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('register')} className="hover:text-[#F5C518] transition">
                  Pantalla 2: Registro & Auditoría
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#F5C518] transition">
                  Pantalla 3: Catálogo REST IMDb
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Security */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
              Marco Normativo & Seguridad
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-[#F5C518] transition flex items-center gap-1.5 text-left">
                  <FileCheck2 className="w-3.5 h-3.5 text-[#F5C518]" />
                  <span>Aviso de Privacidad (LFPDPPP)</span>
                </button>
              </li>
              <li className="text-neutral-500">
                OWASP Top 10 Sanitization Filter
              </li>
              <li className="text-neutral-500">
                .env Key Protection (No GitHub Leak)
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} IMDb Shield • Proyecto Unidad 3 (Seguridad, Web Services REST y APIs).
          </div>
          <div className="flex items-center gap-1">
            <span>Diseñado con React, Tailwind CSS y Lucide Icons</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
