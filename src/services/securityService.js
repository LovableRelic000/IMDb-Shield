/**
 * Servicio de Seguridad y Criptografía (Unidad 3)
 * - Detección de patrones maliciosos en vivo (XSS y SQL Injection)
 * - Sanitización de entradas
 * - Hash criptográfico SHA-256 usando Web Crypto API
 * - Generación de Token de Sesión simulado (JWT / Token-based Authentication)
 */

// Expresiones regulares para detección de vectores de ataque
export const THREAT_PATTERNS = {
  xss: [
    { regex: /<script[\s\S]*?>[\s\S]*?(<\/script>)?/gi, name: 'Etiqueta <script> maliciosa' },
    { regex: /<[^>]+(on\w+\s*=|javascript:)[^>]*>/gi, name: 'Inyección de eventos DOM (onerror, onload, etc.)' },
    { regex: /javascript:\s*[\w\d]+/gi, name: 'Pseudo-protocolo javascript:' },
    { regex: /[<>]/g, name: 'Caracteres especiales HTML (<, >)' },
    { regex: /(eval\(|document\.cookie|window\.location)/gi, name: 'Acceso a APIs sensibles de navegador' },
  ],
  sqli: [
    { regex: /('|")\s*or\s+('?\w+'?|\d+)\s*=\s*('?\w+'?|\d+)/gi, name: 'Condición tautológica SQL (\' OR 1=1)' },
    { regex: /(--|\/\*|\*\/|#)/g, name: 'Comentarios de consulta SQL (--, /*, #)' },
    { regex: /;\s*(drop|delete|insert|update|select|truncate|alter)/gi, name: 'Múltiples sentencias SQL apiladas (; DROP...)' },
    { regex: /\b(union\s+select|union\s+all\s+select)\b/gi, name: 'Ataque de unión SQL (UNION SELECT)' },
    { regex: /'\s*--/g, name: 'Terminación de cadena y comentario SQL (\'--)' },
    { regex: /;/g, name: 'Punto y coma de terminación de consulta SQL (;)' }
  ]
};

/**
 * Analiza un texto en busca de patrones XSS o Inyección SQL
 * @param {string} input - Texto a analizar
 * @returns {{ hasThreat: boolean, type: string, details: string[] }}
 */
export function detectThreats(input) {
  if (!input || typeof input !== 'string') {
    return { hasThreat: false, type: null, details: [] };
  }

  const detected = [];
  let threatType = null;

  // Analizar XSS
  for (const pattern of THREAT_PATTERNS.xss) {
    if (pattern.regex.test(input)) {
      detected.push(`[XSS] ${pattern.name}`);
      threatType = threatType ? 'XSS & SQLi' : 'XSS';
      pattern.regex.lastIndex = 0; // reset regex
    }
  }

  // Analizar SQLi
  for (const pattern of THREAT_PATTERNS.sqli) {
    if (pattern.regex.test(input)) {
      detected.push(`[SQLi] ${pattern.name}`);
      threatType = threatType ? 'XSS & SQLi' : 'SQLi';
      pattern.regex.lastIndex = 0; // reset regex
    }
  }

  return {
    hasThreat: detected.length > 0,
    type: threatType,
    details: detected
  };
}

/**
 * Sanitiza texto removiendo caracteres potencialmente peligrosos
 * @param {string} text - Texto a sanitizar
 * @returns {string}
 */
export function sanitizeInput(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/;/g, '&#59;')
    .replace(/--/g, '&#45;&#45;');
}

/**
 * Genera el Hash criptográfico SHA-256 irreversible de una contraseña
 * usando la API nativa de los navegadores: crypto.subtle.digest
 * @param {string} password - Contraseña en texto plano
 * @returns {Promise<string>} - Representación hexadecimal de 64 caracteres
 */
export async function hashPasswordSHA256(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Genera un Token de Sesión simulado estilo JWT (JSON Web Token)
 * @param {object} payload - Información del usuario y rol
 * @returns {string} - Token formateado
 */
export function generateSessionToken(payload) {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const enhancedPayload = {
    ...payload,
    iss: 'imdb-shield-auth-srv',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 horas
    jti: 'sec-' + Math.random().toString(36).substring(2, 12)
  };

  const base64UrlEncode = (obj) => {
    return btoa(JSON.stringify(obj))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(enhancedPayload);
  
  // Firma criptográfica simulada con checksum
  const pseudoSignature = Array.from({ length: 43 }, () => 
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'[Math.floor(Math.random() * 64)]
  ).join('');

  return `${encodedHeader}.${encodedPayload}.${pseudoSignature}`;
}
