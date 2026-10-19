import React from 'react';
import { ShieldCheck, X, FileText, CheckCircle2, Lock, Scale, UserCheck } from 'lucide-react';

export default function PrivacyModal({ isOpen, onClose, onAccept }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#141417] border border-neutral-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#18181c]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5C518]/10 border border-[#F5C518]/30 flex items-center justify-center text-[#F5C518]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 id="privacy-title" className="text-lg font-bold text-white flex items-center gap-2">
                Aviso de Privacidad Integral
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#F5C518]/20 text-[#F5C518] font-medium border border-[#F5C518]/30">
                  LFPDPPP & LGPDPPSO
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Cumplimiento normativo de Protección de Datos Personales en México (Unidad 3)
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
            aria-label="Cerrar aviso de privacidad"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-neutral-300 leading-relaxed custom-scrollbar">
          {/* Identidad */}
          <section className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
            <div className="flex items-center gap-2 text-white font-semibold mb-2">
              <Scale className="w-4 h-4 text-[#F5C518]" />
              <h3>1. Identidad y Domicilio del Responsable</h3>
            </div>
            <p>
              En apego a la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong> y su correlativa para entes públicos (LGPDPPSO), <strong>IMDb Shield - Plataforma Cinematográfica</strong>, con domicilio digital para efectos académicos y demostrativos en el entorno seguro de la Unidad 3, es el responsable legítimo del uso, tratamiento y salvaguarda de sus datos personales.
            </p>
          </section>

          {/* Datos recabados */}
          <section>
            <div className="flex items-center gap-2 text-white font-semibold mb-2">
              <UserCheck className="w-4 h-4 text-[#F5C518]" />
              <h3>2. Datos Personales Sometidos a Tratamiento</h3>
            </div>
            <p className="mb-2">
              Para brindarle acceso seguro al catálogo y funciones del sistema, recabamos los siguientes datos mínimos necesarios (Principio de Proporcionalidad):
            </p>
            <ul className="list-disc list-inside space-y-1 text-neutral-400 ml-2">
              <li><strong className="text-neutral-200">Identificadores:</strong> Nombre de usuario y correo electrónico.</li>
              <li><strong className="text-neutral-200">Credenciales de Acceso:</strong> Contraseña protegida irreversiblemente mediante algoritmo criptográfico <strong>SHA-256</strong> (nunca en texto plano).</li>
              <li><strong className="text-neutral-200">Perfil en la Plataforma:</strong> Rol asignado ("Usuario Estándar" o "Administrador de Cartelera").</li>
              <li><strong className="text-neutral-200">Metadatos de Seguridad:</strong> Registros de fecha/hora de sesión, tokens temporales JWT y eventos de auditoría contra vulnerabilidades.</li>
            </ul>
          </section>

          {/* Finalidades */}
          <section>
            <div className="flex items-center gap-2 text-white font-semibold mb-2">
              <FileText className="w-4 h-4 text-[#F5C518]" />
              <h3>3. Finalidades Primarias y Secundarias</h3>
            </div>
            <div className="space-y-2 text-neutral-400">
              <p>
                <strong className="text-neutral-200">Finalidades Primarias (Necesarias para el servicio):</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Autenticación de identidad y control de acceso basado en roles (RBAC).</li>
                <li>Generación de tokens criptográficos de sesión efímeros.</li>
                <li>Prevención activa de incidentes de seguridad (bloqueo en tiempo real de XSS e Inyección SQL).</li>
              </ul>
              <p className="pt-2">
                <strong className="text-neutral-200">Finalidades Secundarias:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Personalización de preferencias de búsqueda en el catálogo de películas.</li>
                <li>Métricas de resiliencia de consumo de Web Services RESTful.</li>
              </ul>
            </div>
          </section>

          {/* Medidas de Seguridad */}
          <section className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-[#F5C518] font-semibold mb-2">
              <Lock className="w-4 h-4" />
              <h3>4. Medidas de Seguridad Físicas, Técnicas y Administrativas</h3>
            </div>
            <p className="text-neutral-300 text-xs leading-normal">
              Sus datos viajan cifrados bajo el protocolo <strong>HTTPS con TLS 1.3</strong>. Las contraseñas jamás se almacenan en texto plano en bases de datos ni memorias volátiles, utilizándose la API nativa <code className="text-[#F5C518] bg-black/40 px-1 py-0.5 rounded">crypto.subtle.digest(&apos;SHA-256&apos;)</code>. Las llaves de API externas se aíslan en archivos locales <code className="text-[#F5C518] bg-black/40 px-1 py-0.5 rounded">.env</code> fuera de repositorios públicos conforme a las mejores prácticas de OWASP.
            </p>
          </section>

          {/* Derechos ARCO */}
          <section>
            <div className="flex items-center gap-2 text-white font-semibold mb-2">
              <ShieldCheck className="w-4 h-4 text-[#F5C518]" />
              <h3>5. Ejercicio de Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)</h3>
            </div>
            <p className="text-neutral-400">
              Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (<strong>Acceso</strong>). Asimismo, es su derecho solicitar la corrección de su información personal si está desactualizada, inexacta o incompleta (<strong>Rectificación</strong>); que la eliminemos de nuestros registros (<strong>Cancelación</strong>); así como oponerse al uso de sus datos para fines específicos (<strong>Oposición</strong>). Para ejercer estos derechos conforme a las disposiciones del INAI, puede gestionarlo directamente en su panel de perfil o ante el oficial de privacidad de esta plataforma.
            </p>
          </section>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-800 bg-[#18181c]">
          <span className="text-xs text-neutral-500">
            Versión 2026.1 • Actualizado para la Unidad 3
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:bg-neutral-800 transition"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                if (onAccept) onAccept();
                onClose();
              }}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-[#F5C518] text-black hover:bg-[#e2b616] transition shadow-lg shadow-[#F5C518]/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              Aceptar y Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
