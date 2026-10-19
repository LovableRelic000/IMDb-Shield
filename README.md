# IMDb Shield - Catálogo de Películas & Seguridad (Unidad 3)

Plataforma cinematográfica desarrollada con **React (Vite)** y **Tailwind CSS**, diseñada bajo una estética profesional en modo oscuro (*Dark Mode* con acentos amarillo IMDb `#F5C518`), implementando los requisitos de la **Unidad 3: Seguridad, Web Services REST y APIs**.

---

## 🛡️ Arquitectura y Cumplimiento de la Unidad 3

### 1. Protección de Datos (LFPDPPP y LGPDPPSO)
* **Aviso de Privacidad Integral**: Modal interactivo accesible desde la barra superior, el pie de página y obligatorio en el formulario de registro.
* Detalla las finalidades primarias y secundarias, los datos personales recabados y el procedimiento para el ejercicio de los **Derechos ARCO** (Acceso, Rectificación, Cancelación y Oposición) ante el INAI.

### 2. Codificación Segura y Criptografía
* **Detector Heurístico de Vulnerabilidades en Vivo**:
  * Analiza en tiempo real cada pulsación en todos los campos en busca de vectores **XSS** (`<script>`, `<`, `>`, `javascript:`, eventos DOM) e **Inyección SQL** (`' OR 1=1`, `--`, `;`, `UNION SELECT`).
  * Despliega una alerta roja visual inmediata y bloquea el botón de envío hasta que los datos sean sanitizados.
* **Cifrado de Contraseñas con Hash SHA-256**:
  * Utiliza la API criptográfica nativa del navegador (`crypto.subtle.digest('SHA-256', ...)`).
  * La contraseña en texto plano **nunca** se almacena ni se expone.
* **Panel de Log y Auditoría de Seguridad**:
  * Muestra el rol asignado, el digest SHA-256 de 64 caracteres en hexadecimal, el Token de Sesión JWT generado y la marca de tiempo exacta del registro.

### 3. Comunicación Segura & Web Services RESTful
* **Canal Cifrado**: Peticiones HTTP asíncronas sobre protocolo seguro **HTTPS con TLS 1.3** e intercambio estricto en formato **JSON**.
* **Aislamiento de Credenciales**:
  * La URL y la API Key se configuran mediante variables de entorno en el archivo `.env` (`VITE_OMDB_API_URL` y `VITE_OMDB_API_KEY`).
  * El archivo `.gitignore` protege `.env` y `.env.local` en sus primeras líneas para evitar cualquier fuga en repositorios de control de versiones (GitHub).
* **Fallback Inteligente de Alta Disponibilidad**:
  * Si la clave de OMDb no ha sido ingresada en `.env` o la API devuelve un error 401/límite, el sistema conmuta automáticamente y sin errores a la API pública RESTful de **TVMaze** y a un buffer enriquecido de alta resiliencia.

---

## 🚀 Puesta en Marcha

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   El proyecto ya incluye el archivo `.env`. Si deseas cambiar la clave de OMDb, edítala allí:
   ```env
   VITE_OMDB_API_URL=https://www.omdbapi.com/
   VITE_OMDB_API_KEY=TU_API_KEY_AQUI
   ```

3. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173/](http://localhost:5173/) (o el puerto asignado en tu terminal).

4. **Compilar para producción**:
   ```bash
   npm run build
   ```
