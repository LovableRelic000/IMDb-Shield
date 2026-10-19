import React, { useState, useId } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  User, 
  Mail, 
  Key, 
  KeyRound, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Check, 
  Clock, 
  Fingerprint, 
  FileText, 
  Terminal, 
  Sparkles, 
  Trash2 
} from 'lucide-react';
import { detectThreats, hashPasswordSHA256, generateSessionToken } from '../services/securityService';

export default function RegisterView({ onRegisterSuccess, onOpenPrivacy, auditLogs, onClearAuditLogs }) {
  // Estados del Formulario
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // 'user' or 'admin'
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados de retroalimentación
  const [copiedField, setCopiedField] = useState(null);
  const [latestRegistration, setLatestRegistration] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Análisis de Seguridad y Vulnerabilidades en Vivo
  const usernameThreat = detectThreats(username);
  const emailThreat = detectThreats(email);
  const passwordThreat = detectThreats(password);
  const confirmPasswordThreat = detectThreats(confirmPassword);

  const activeThreats = [
    ...(usernameThreat.hasThreat ? usernameThreat.details.map(d => `Campo Usuario: ${d}`) : []),
    ...(emailThreat.hasThreat ? emailThreat.details.map(d => `Campo Email: ${d}`) : []),
    ...(passwordThreat.hasThreat ? passwordThreat.details.map(d => `Campo Contraseña: ${d}`) : []),
    ...(confirmPasswordThreat.hasThreat ? confirmPasswordThreat.details.map(d => `Campo Confirmación: ${d}`) : []),
  ];

  const hasAnyThreat = activeThreats.length > 0;

  // Validación de Email
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validación de Contraseña Fuerte
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isPasswordStrong = hasMinLength && hasUpperCase && hasNumber;
  const doPasswordsMatch = password && confirmPassword && password === confirmPassword;

  // Cálculo de fuerza de contraseña para indicador visual
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (hasMinLength) score += 33;
    if (hasUpperCase) score += 33;
    if (hasNumber) score += 34;
    return score;
  };

  const strengthScore = getPasswordStrength();

  // Verificación global de validez
  const isFormValid = 
    username.trim().length >= 3 &&
    isEmailValid &&
    isPasswordStrong &&
    doPasswordsMatch &&
    acceptPrivacy &&
    !hasAnyThreat;

  // Manejador del Envío Seguro
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || hasAnyThreat) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // 1. Cifrado irreversible SHA-256 usando Web Crypto API
      const hashedPassword = await hashPasswordSHA256(password);

      // 2. Generación de Token de Sesión JWT
      const sessionToken = generateSessionToken({
        username: username.trim(),
        email: email.trim(),
        role: role
      });

      const auditRecord = {
        id: 'aud-' + Date.now(),
        username: username.trim(),
        email: email.trim(),
        role: role,
        roleLabel: role === 'admin' ? 'Administrador de Cartelera' : 'Usuario Estándar',
        hashedPassword: hashedPassword,
        sessionToken: sessionToken,
        timestamp: new Date().toISOString(),
        localTime: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        date: new Date().toLocaleDateString('es-MX'),
        status: 'Auditado & Cifrado (SHA-256)'
      };

      setLatestRegistration(auditRecord);
      onRegisterSuccess(auditRecord);
      setSubmitSuccess(true);

      // Limpiar campos sensibles del formulario
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Error durante el proceso criptográfico:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Copiar al portapapeles
  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Inyección de pruebas rápidas para evaluación de seguridad
  const injectAttackVector = (type) => {
    if (type === 'xss') {
      setUsername('<script>alert("XSS")</script>');
    } else if (type === 'sqli') {
      setUsername("admin' OR 1=1 --");
    } else if (type === 'clean') {
      setUsername('CinefiloSeguro');
      setEmail('usuario@seguridad.edu.mx');
      setPassword('Pelicula2026!');
      setConfirmPassword('Pelicula2026!');
      setAcceptPrivacy(true);
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C518]/10 text-[#F5C518] text-xs font-bold border border-[#F5C518]/20">
          <KeyRound className="w-4 h-4" />
          <span>Pantalla 2 • Módulo de Autenticación & Codificación Segura</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Registro de Usuario con Sanitización & Hashing
        </h1>
        <p className="text-sm text-neutral-400 max-w-3xl">
          Ingresa tus datos para registrarte. El sistema analiza continuamente las entradas contra vectores de ataque 
          (<strong>XSS</strong> e <strong>Inyección SQL</strong>) y cifra la contraseña mediante el algoritmo <strong>SHA-256</strong> antes de emitir un Token JWT.
        </p>
      </div>

      {/* DETECTOR DE VULNERABILIDADES EN VIVO (BANNER ROJO SI SE DETECTA XSS O SQLI) */}
      {hasAnyThreat && (
        <div 
          role="alert"
          className="p-5 rounded-2xl bg-rose-950/80 border-2 border-rose-500 text-rose-200 shadow-2xl shadow-rose-950/50 animate-bounceOnce"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 text-rose-400">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="font-extrabold text-white text-base flex items-center gap-2">
                <span>Alerta de Seguridad: Intento de inyección XSS/SQL bloqueado por el filtro de sanitización</span>
                <span className="text-xs px-2 py-0.5 rounded bg-rose-500 text-white uppercase font-black">
                  Bloqueo Activo
                </span>
              </div>
              <p className="text-xs text-rose-200/90 leading-relaxed">
                El analizador heurístico de codificación segura ha detectado caracteres no permitidos o secuencias maliciosas destinadas a manipular el DOM del navegador o sentencias de bases de datos relacionales. El envío del formulario ha sido inhabilitado preventivamente.
              </p>
              <div className="bg-black/50 p-3 rounded-lg border border-rose-800/80 space-y-1 font-mono text-xs">
                <span className="text-rose-400 font-bold block mb-1">Patrones detectados en tiempo real:</span>
                {activeThreats.map((threat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-rose-300">
                    <span className="text-rose-500">✖</span>
                    <span>{threat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BANNER DE ÉXITO */}
      {submitSuccess && latestRegistration && (
        <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white">¡Registro completado exitosamente con Codificación Segura!</span>
              <p className="text-emerald-300/80">
                La contraseña ha sido transformada a un hash SHA-256 irreversible de 64 caracteres. Datos auditados en el panel contiguo.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setSubmitSuccess(false)}
            className="text-xs px-2 py-1 rounded bg-emerald-900/50 hover:bg-emerald-800 text-emerald-200"
          >
            Aceptar
          </button>
        </div>
      )}

      {/* TEST / DEMO BUTTONS BAR */}
      <div className="flex flex-wrap items-center gap-2 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800 text-xs">
        <span className="text-neutral-400 font-medium mr-1 flex items-center gap-1">
          <Terminal className="w-3.5 h-3.5 text-[#F5C518]" />
          Pruebas de Seguridad en Vivo (Evaluación):
        </span>
        <button
          type="button"
          onClick={() => injectAttackVector('xss')}
          className="px-2.5 py-1 rounded-lg bg-rose-950/50 border border-rose-700/60 text-rose-300 hover:bg-rose-900/50 transition font-mono"
        >
          Probar vector XSS: &lt;script&gt;
        </button>
        <button
          type="button"
          onClick={() => injectAttackVector('sqli')}
          className="px-2.5 py-1 rounded-lg bg-rose-950/50 border border-rose-700/60 text-rose-300 hover:bg-rose-900/50 transition font-mono"
        >
          Probar vector SQLi: &apos; OR 1=1 --
        </button>
        <button
          type="button"
          onClick={() => injectAttackVector('clean')}
          className="px-2.5 py-1 rounded-lg bg-[#F5C518]/10 border border-[#F5C518]/30 text-[#F5C518] hover:bg-[#F5C518]/20 transition"
        >
          Autocompletar datos válidos
        </button>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT: FORM & AUDIT LOG */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA 1: FORMULARIO DE REGISTRO SEGURO */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 sm:p-8 border border-neutral-800 space-y-6">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-[#F5C518]" />
              Formulario de Alta de Usuario
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Validación síncrona en cliente y cifrado criptográfico antes del almacenamiento
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Campo 1: Nombre de usuario */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300 flex items-center justify-between">
                <span>Nombre de Usuario</span>
                {usernameThreat.hasThreat && (
                  <span className="text-rose-400 text-[11px] font-mono">Vector detectado</span>
                )}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="ej. AlexCinefilo"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900/90 text-sm text-white placeholder-neutral-600 border transition outline-none ${
                    usernameThreat.hasThreat
                      ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30 bg-rose-950/20'
                      : 'border-neutral-700 focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518]'
                  }`}
                />
                <User className="w-4 h-4 text-neutral-500 absolute right-3.5 top-3" />
              </div>
            </div>

            {/* Campo 2: Correo electrónico */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300 flex items-center justify-between">
                <span>Correo Electrónico</span>
                {email && !isEmailValid && (
                  <span className="text-amber-400 text-[11px]">Formato inválido</span>
                )}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="usuario@dominio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900/90 text-sm text-white placeholder-neutral-600 border transition outline-none ${
                    emailThreat.hasThreat
                      ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30 bg-rose-950/20'
                      : email && !isEmailValid
                      ? 'border-amber-500/70 focus:border-amber-500'
                      : 'border-neutral-700 focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518]'
                  }`}
                />
                <Mail className="w-4 h-4 text-neutral-500 absolute right-3.5 top-3" />
              </div>
            </div>

            {/* Campo 3: Contraseña */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300 flex items-center justify-between">
                <span>Contraseña (Hash SHA-256 al enviar)</span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-neutral-400 hover:text-white text-[11px] flex items-center gap-1"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPassword ? 'Ocultar' : 'Ver'}</span>
                </button>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 número"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900/90 text-sm text-white placeholder-neutral-600 border transition outline-none ${
                    passwordThreat.hasThreat
                      ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30 bg-rose-950/20'
                      : 'border-neutral-700 focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518]'
                  }`}
                />
                <Key className="w-4 h-4 text-neutral-500 absolute right-3.5 top-3" />
              </div>

              {/* Indicador de Fuerza de Contraseña */}
              {password && (
                <div className="space-y-1.5 pt-1">
                  <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden flex">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        strengthScore <= 33 ? 'bg-rose-500' : strengthScore <= 66 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${strengthScore}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400">
                      Nivel de robustez:{' '}
                      <strong className={strengthScore <= 33 ? 'text-rose-400' : strengthScore <= 66 ? 'text-amber-400' : 'text-emerald-400'}>
                        {strengthScore <= 33 ? 'Débil' : strengthScore <= 66 ? 'Media' : 'Fuerte'}
                      </strong>
                    </span>
                    <div className="flex items-center gap-2 text-neutral-400">
                      <span className={hasMinLength ? 'text-emerald-400' : 'text-neutral-600'}>8+ car.</span>
                      <span>•</span>
                      <span className={hasUpperCase ? 'text-emerald-400' : 'text-neutral-600'}>1 Mayús.</span>
                      <span>•</span>
                      <span className={hasNumber ? 'text-emerald-400' : 'text-neutral-600'}>1 Núm.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Campo 4: Confirmar Contraseña */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300 flex items-center justify-between">
                <span>Confirmar Contraseña</span>
                {confirmPassword && !doPasswordsMatch && (
                  <span className="text-rose-400 text-[11px]">No coinciden</span>
                )}
                {confirmPassword && doPasswordsMatch && (
                  <span className="text-emerald-400 text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Coinciden
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Repite tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900/90 text-sm text-white placeholder-neutral-600 border transition outline-none ${
                    confirmPasswordThreat.hasThreat
                      ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30 bg-rose-950/20'
                      : confirmPassword && !doPasswordsMatch
                      ? 'border-rose-500/70 focus:border-rose-500'
                      : confirmPassword && doPasswordsMatch
                      ? 'border-emerald-500/70 focus:border-emerald-500'
                      : 'border-neutral-700 focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518]'
                  }`}
                />
                <KeyRound className="w-4 h-4 text-neutral-500 absolute right-3.5 top-3" />
              </div>
            </div>

            {/* Campo 5: Rol en el sistema */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">
                Rol en el Sistema (Control de Acceso RBAC)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`p-3 rounded-xl border text-left transition ${
                    role === 'user'
                      ? 'bg-[#F5C518]/15 border-[#F5C518] text-white shadow-sm'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>Usuario Estándar</span>
                    {role === 'user' && <CheckCircle2 className="w-3.5 h-3.5 text-[#F5C518]" />}
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-1">
                    Consulta del catálogo de películas y detalles
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`p-3 rounded-xl border text-left transition ${
                    role === 'admin'
                      ? 'bg-amber-500/20 border-amber-500 text-white shadow-sm'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>Admin de Cartelera</span>
                    {role === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-[#F5C518]" />}
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-1">
                    Gestión técnica de endpoints y auditoría
                  </div>
                </button>
              </div>
            </div>

            {/* Checkbox Obligatorio: Aviso de Privacidad LFPDPPP */}
            <div className="pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <input
                  type="checkbox"
                  id="privacy-check"
                  checked={acceptPrivacy}
                  onChange={(e) => setAcceptPrivacy(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#F5C518] focus:ring-[#F5C518] bg-neutral-900 border-neutral-700 accent-[#F5C518] cursor-pointer"
                />
                <div className="text-xs text-neutral-300 leading-normal">
                  <label htmlFor="privacy-check" className="cursor-pointer">
                    He leído y acepto el{' '}
                    <strong className="text-white">Aviso de Privacidad conforme a la LFPDPPP</strong> y 
                    autorizo el tratamiento criptográfico de mis datos para fines de autenticación segura.
                  </label>
                  <div className="mt-1.5">
                    <button
                      type="button"
                      onClick={onOpenPrivacy}
                      className="text-xs text-[#F5C518] underline hover:text-[#e2b616] flex items-center gap-1 font-semibold"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Leer Aviso de Privacidad Integral (LFPDPPP)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || hasAnyThreat || isSubmitting}
              className={`w-full py-3.5 px-6 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xl ${
                !isFormValid || hasAnyThreat || isSubmitting
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700/50'
                  : 'bg-[#F5C518] text-black hover:bg-[#e2b616] hover:scale-[1.02] shadow-[#F5C518]/20'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Calculando Hash SHA-256...</span>
                </>
              ) : hasAnyThreat ? (
                <>
                  <ShieldAlert className="w-5 h-5 text-rose-500" />
                  <span>Envío Bloqueado por Vulnerabilidad</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 text-black" />
                  <span>Registrar con Codificación Segura</span>
                </>
              )}
            </button>

            {!isFormValid && !hasAnyThreat && (
              <p className="text-[11px] text-center text-neutral-500">
                Completa todos los campos válidos y acepta el Aviso de Privacidad para habilitar el registro.
              </p>
            )}
          </form>
        </div>

        {/* COLUMNA 2: PANEL DE LOG Y AUDITORÍA DE SEGURIDAD */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-neutral-800 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 font-mono mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  SEGURIDAD & AUDITORÍA EN TIEMPO REAL
                </div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-[#F5C518]" />
                  Panel de Log y Auditoría de Seguridad
                </h2>
              </div>
              {auditLogs.length > 0 && (
                <button
                  onClick={onClearAuditLogs}
                  className="p-1.5 text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 rounded-lg transition"
                  title="Limpiar registro de auditoría"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Inspección del Último Registro o Estado Inicial */}
            {latestRegistration ? (
              <div className="space-y-4">
                <div className="bg-[#0e0e12] border border-neutral-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Último Usuario Registrado</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {latestRegistration.status}
                    </span>
                  </div>

                  {/* 1. Rol asignado */}
                  <div className="flex items-center justify-between py-2 border-b border-neutral-800/80 text-xs">
                    <span className="text-neutral-400">Rol Asignado:</span>
                    <span className={`font-bold px-2.5 py-1 rounded-lg ${
                      latestRegistration.role === 'admin'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-[#F5C518]/20 text-[#F5C518] border border-[#F5C518]/30'
                    }`}>
                      {latestRegistration.roleLabel}
                    </span>
                  </div>

                  {/* 2. Contraseña Hasheada SHA-256 */}
                  <div className="space-y-1.5 py-2 border-b border-neutral-800/80">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#F5C518]" />
                        Contraseña Hasheada (SHA-256):
                      </span>
                      <button
                        onClick={() => copyToClipboard(latestRegistration.hashedPassword, 'hash')}
                        className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 transition"
                      >
                        {copiedField === 'hash' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedField === 'hash' ? 'Copiado' : 'Copiar Hash'}</span>
                      </button>
                    </div>
                    <div className="bg-black/80 p-2.5 rounded-lg border border-neutral-800 text-[11px] font-mono text-[#F5C518] break-all leading-tight select-all">
                      {latestRegistration.hashedPassword}
                    </div>
                    <p className="text-[10px] text-neutral-500">
                      * Algoritmo unidireccional: la contraseña en texto plano fue descartada de memoria y nunca se almacena.
                    </p>
                  </div>

                  {/* 3. Token de Sesión JWT */}
                  <div className="space-y-1.5 py-2 border-b border-neutral-800/80">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400 flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-sky-400" />
                        Token de Sesión Generado (JWT Bearer):
                      </span>
                      <button
                        onClick={() => copyToClipboard(latestRegistration.sessionToken, 'token')}
                        className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 transition"
                      >
                        {copiedField === 'token' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedField === 'token' ? 'Copiado' : 'Copiar Token'}</span>
                      </button>
                    </div>
                    <div className="bg-black/80 p-2.5 rounded-lg border border-neutral-800 text-[10px] font-mono text-sky-300 break-all leading-relaxed select-all max-h-20 overflow-y-auto">
                      Bearer {latestRegistration.sessionToken}
                    </div>
                  </div>

                  {/* 4. Fecha y Hora del Log */}
                  <div className="flex items-center justify-between pt-1 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Fecha / Hora del Log:
                    </span>
                    <span className="font-mono text-white">
                      {latestRegistration.date} - {latestRegistration.localTime}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 px-4 space-y-3 bg-neutral-900/30 rounded-xl border border-dashed border-neutral-800">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 mx-auto">
                  <Terminal className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-neutral-300">
                  Esperando Registro para Generar Auditoría
                </div>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Completa el formulario de la izquierda. Al enviarse, este panel mostrará el cálculo del digest SHA-256 de 64 caracteres, el Token de sesión y el timestamp de seguridad.
                </p>
              </div>
            )}

            {/* Historial de Auditoría de Sesión */}
            {auditLogs.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-neutral-300 flex items-center justify-between">
                  <span>Historial de Registros Auditados ({auditLogs.length})</span>
                  <span className="text-[10px] text-neutral-500 font-mono">Trazabilidad Activa</span>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                  {auditLogs.map((log) => (
                    <div 
                      key={log.id}
                      className="p-3 rounded-lg bg-neutral-900/70 border border-neutral-800 text-xs flex items-center justify-between hover:border-neutral-700 transition"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{log.username}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-300 font-mono">
                            {log.role}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400">
                          Hash: {log.hashedPassword.substring(0, 16)}...
                        </div>
                      </div>
                      <div className="text-right text-[10px] text-neutral-400 font-mono">
                        <div>{log.localTime}</div>
                        <div className="text-emerald-400">Verificado</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
