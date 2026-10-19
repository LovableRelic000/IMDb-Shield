import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  Terminal, 
  KeyRound, 
  Film, 
  ArrowRight, 
  UserCheck, 
  FileCheck2, 
  AlertTriangle, 
  Cpu, 
  Globe2, 
  CheckCircle2, 
  Server
} from 'lucide-react';

export default function HomeView({ onNavigate, onOpenPrivacy }) {
  return (
    <div className="space-y-16 pb-16 animate-fadeIn">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-b from-[#16161c] via-[#101013] to-[#0a0a0c] p-8 sm:p-12 lg:p-16 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#F5C518]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-[#F5C518]/40 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-[#F5C518] animate-ping"></span>
            <span className="text-xs font-bold text-[#F5C518] tracking-wide uppercase">
              Plataforma Cinematográfica • Unidad 3
            </span>
            <span className="text-neutral-500">|</span>
            <span className="text-xs text-neutral-300">Seguridad & Web Services REST</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            IMDb <span className="text-[#F5C518]">Shield</span>: Catálogo de Películas & Arquitectura Segura
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
            Explora títulos de la cartelera mundial consumiendo <strong>Web Services RESTful sobre TLS 1.3</strong> con protección integral: blindaje contra inyecciones <strong>XSS / SQLi</strong>, cifrado de contraseñas con <strong>SHA-256</strong> y estricto apego a la <strong>LFPDPPP</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('catalog')}
              className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#F5C518] text-black font-extrabold text-sm hover:bg-[#e2b616] hover:scale-105 transition-all shadow-xl shadow-[#F5C518]/20"
            >
              <Film className="w-5 h-5 text-black" />
              <span>Explorar Catálogo de Películas</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('register')}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-neutral-900/90 border border-neutral-700 hover:border-[#F5C518]/50 text-white font-bold text-sm hover:bg-neutral-800 transition-all"
            >
              <UserCheck className="w-5 h-5 text-[#F5C518]" />
              <span>Registro con Codificación Segura</span>
            </button>
          </div>

          {/* Trust Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-neutral-800/80">
            <div className="space-y-1">
              <div className="text-2xl font-black text-white flex items-center gap-1.5">
                <span className="text-[#F5C518]">REST</span> JSON
              </div>
              <div className="text-xs text-neutral-400">OMDb & TVMaze TLS 1.3</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-black text-white flex items-center gap-1.5">
                <span className="text-emerald-400">SHA-256</span>
              </div>
              <div className="text-xs text-neutral-400">Hash Criptográfico Nativo</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-black text-white flex items-center gap-1.5">
                <span className="text-rose-400">Anti-XSS</span>
              </div>
              <div className="text-xs text-neutral-400">Sanitización & Filtro SQLi</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-black text-white flex items-center gap-1.5">
                <span className="text-sky-400">LFPDPPP</span>
              </div>
              <div className="text-xs text-neutral-400">Aviso Privacidad Integral</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN: ARQUITECTURA DE SEGURIDAD E INTEGRACIÓN (UNIDAD 3) */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C518]/10 text-[#F5C518] text-xs font-bold border border-[#F5C518]/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Fundamentos Teórico-Prácticos de la Unidad 3</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Arquitectura de Seguridad e Integración
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Esta aplicación implementa los 3 ejes centrales de seguridad informática, desarrollo seguro y consumo de servicios web exigidos en el temario.
          </p>
        </div>

        {/* 3 Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Protección de Datos Personales */}
          <div className="glass-panel rounded-2xl p-6 sm:p-7 space-y-5 border border-neutral-800 hover:border-[#F5C518]/40 transition duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                <FileCheck2 className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">
                  Pilar 1 • Marco Jurídico
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-[#F5C518] transition-colors">
                  Protección de Datos (LFPDPPP y LGPDPPSO)
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Cumplimiento estricto de la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</strong> y el marco de entes públicos:
              </p>

              <ul className="space-y-2 text-xs text-neutral-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong>Aviso de Privacidad Integral</strong> accesible y vinculante antes de la captura de credenciales.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Garantía de ejercicio de <strong>Derechos ARCO</strong> (Acceso, Rectificación, Cancelación y Oposición).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Minimización y finalidad legítima de tratamiento de datos personales.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenPrivacy}
              className="w-full mt-4 py-2.5 px-4 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-sky-400/50 text-sky-300 text-xs font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition"
            >
              <FileCheck2 className="w-4 h-4" />
              Consultar Aviso de Privacidad
            </button>
          </div>

          {/* Card 2: Codificación Segura */}
          <div className="glass-panel rounded-2xl p-6 sm:p-7 space-y-5 border border-neutral-800 hover:border-[#F5C518]/40 transition duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                <Terminal className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-1">
                  Pilar 2 • Desarrollo Seguro
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-[#F5C518] transition-colors">
                  Codificación Segura (Anti-XSS & SHA-256)
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Mitigación activa de las principales amenazas de <strong>OWASP Top 10</strong> aplicadas directamente en la capa de interacción:
              </p>

              <ul className="space-y-2 text-xs text-neutral-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Filtro y Sanitización en Vivo:</strong> Detección instantánea de vectores XSS (<code className="text-rose-300">&lt;script&gt;</code>) e Inyección SQL (<code className="text-rose-300">&apos; OR 1=1</code>).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Hash Criptográfico SHA-256:</strong> Transformación unidireccional e irreversible con la Web Crypto API nativa.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Generación de <strong>Tokens de Sesión JWT</strong> simulados para control de acceso RBAC.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('register')}
              className="w-full mt-4 py-2.5 px-4 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-rose-400/50 text-rose-300 text-xs font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition"
            >
              <Terminal className="w-4 h-4" />
              Probar Detector en Pantalla 2
            </button>
          </div>

          {/* Card 3: Comunicación Segura & Web Services */}
          <div className="glass-panel rounded-2xl p-6 sm:p-7 space-y-5 border border-neutral-800 hover:border-[#F5C518]/40 transition duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#F5C518] group-hover:scale-110 transition-transform">
                <Globe2 className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#F5C518] uppercase tracking-wider block mb-1">
                  Pilar 3 • Web Services REST
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-[#F5C518] transition-colors">
                  Comunicación Segura (REST / TLS 1.3)
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Consumo formal de endpoints RESTful con intercambio serializado en formato JSON y protección de credenciales de red:
              </p>

              <ul className="space-y-2 text-xs text-neutral-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F5C518] shrink-0 mt-0.5" />
                  <span><strong>Aislamiento de API Keys:</strong> Almacenamiento seguro en <code className="text-[#F5C518]">.env</code> ignorado por git para evitar fugas en GitHub.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F5C518] shrink-0 mt-0.5" />
                  <span><strong>Canal Cifrado HTTPS / TLS 1.3:</strong> Confidencialidad e integridad del payload en tránsito.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F5C518] shrink-0 mt-0.5" />
                  <span><strong>Fallback Inteligente:</strong> Resiliencia automática hacia TVMaze si no hay clave OMDb activa.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('catalog')}
              className="w-full mt-4 py-2.5 px-4 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-[#F5C518]/50 text-[#F5C518] text-xs font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition"
            >
              <Globe2 className="w-4 h-4" />
              Ver Consumo en Pantalla 3
            </button>
          </div>

        </div>

        {/* 3. DIAGRAMA VISUAL DE ARQUITECTURA */}
        <div className="bg-[#121216] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#F5C518]" />
                Flujo Operativo de Datos y Seguridad en CineHub
              </h3>
              <p className="text-xs text-neutral-400">
                Trazabilidad desde la entrada del usuario hasta el consumo seguro de APIs externas
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-emerald-400">
                Cifrado End-to-End
              </span>
            </div>
          </div>

          {/* Visual steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800 space-y-2">
              <div className="text-xs font-bold text-[#F5C518] font-mono">PASO 01</div>
              <div className="text-sm font-bold text-white">Captura & LFPDPPP</div>
              <p className="text-xs text-neutral-400 leading-normal">
                Consentimiento informado mediante Aviso de Privacidad y verificación de rol del usuario.
              </p>
            </div>

            <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800 space-y-2">
              <div className="text-xs font-bold text-rose-400 font-mono">PASO 02</div>
              <div className="text-sm font-bold text-white">Filtro Anti-XSS & SQLi</div>
              <p className="text-xs text-neutral-400 leading-normal">
                Análisis heurístico en vivo que bloquea etiquetas y caracteres maliciosos antes de ser procesados.
              </p>
            </div>

            <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 font-mono">PASO 03</div>
              <div className="text-sm font-bold text-white">SHA-256 & Token JWT</div>
              <p className="text-xs text-neutral-400 leading-normal">
                Generación del digest criptográfico de 64 caracteres en el navegador y emisión de token de sesión.
              </p>
            </div>

            <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800 space-y-2">
              <div className="text-xs font-bold text-sky-400 font-mono">PASO 04</div>
              <div className="text-sm font-bold text-white">REST API sobre TLS 1.3</div>
              <p className="text-xs text-neutral-400 leading-normal">
                Petición HTTPS GET con API Key inyectada desde .env, con fallback automático transparente.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
