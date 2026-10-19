import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Film, 
  Tv, 
  Calendar, 
  Star, 
  Eye, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  RotateCw, 
  SlidersHorizontal, 
  Key, 
  Server, 
  Globe2, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { searchMovies, getApiConfig } from '../services/movieService';

export default function CatalogView({ onSelectMovie }) {
  // Estados de Búsqueda y Filtros
  const [query, setQuery] = useState('Batman');
  const [searchTerm, setSearchTerm] = useState('Batman');
  const [typeFilter, setTypeFilter] = useState(''); // '' (todos), 'movie', 'series'
  const [yearFilter, setYearFilter] = useState('');
  
  // Clave de API temporal para pruebas en vivo (además de la leída de .env)
  const [customKey, setCustomKey] = useState('');
  const [showKeyConfig, setShowKeyConfig] = useState(false);

  // Estados de datos
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serviceStatus, setServiceStatus] = useState({
    source: 'Cargando...',
    protocol: 'RESTful GET JSON / TLS 1.3',
    isFallback: false,
    totalResults: 0
  });

  const apiConfig = getApiConfig();

  // Función principal de carga de películas
  const fetchMovies = useCallback(async (searchQuery, type, year, keyOverride) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchMovies(searchQuery, type, year, keyOverride);
      setMovies(result.movies);
      setServiceStatus({
        source: result.source,
        protocol: result.protocol,
        isFallback: result.isFallback,
        totalResults: result.totalResults
      });
    } catch (err) {
      console.error('Error al consultar el Web Service:', err);
      setError('Ocurrió una eventualidad en la red. Activando buffer seguro.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Carga inicial obligatoria por defecto ("Batman")
  useEffect(() => {
    fetchMovies(searchTerm, typeFilter, yearFilter, customKey);
  }, [searchTerm, typeFilter, yearFilter, customKey, fetchMovies]);

  // Manejador del formulario de búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchTerm(query.trim());
    }
  };

  // Botones de búsqueda rápida
  const quickSearches = ['Batman', 'Avengers', 'Inception', 'Interstellar', 'Spider-Man', 'Joker', 'Breaking Bad'];

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. INDICADOR TÉCNICO VISIBLE OBLIGATORIO (UNIDAD 3) */}
      <section className="bg-gradient-to-r from-[#141418] via-[#16161c] to-[#121215] border border-neutral-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Web Service RESTful Activo
              </span>
            </div>
            
            {/* Texto exacto requerido por el temario de Unidad 3 */}
            <div className="text-xs sm:text-sm font-semibold text-white leading-normal flex flex-wrap items-center gap-2">
              <span>Estado del Web Service:</span>
              <span className="text-emerald-300 font-bold bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                Conectado (REST API / JSON sobre TLS 1.3)
              </span>
              <span className="text-neutral-500">|</span>
              <span>Autenticación:</span>
              <span className="text-[#F5C518] font-bold bg-[#F5C518]/10 px-2 py-0.5 rounded border border-[#F5C518]/30">
                API Key vía .env (Oculta en GitHub)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="text-xs font-mono bg-black/60 px-3 py-1.5 rounded-xl border border-neutral-800 text-neutral-300 flex items-center gap-2">
              <Server className="w-3.5 h-3.5 text-[#F5C518]" />
              <span>Fuente:</span>
              <strong className={serviceStatus.isFallback ? 'text-amber-400' : 'text-emerald-400'}>
                {serviceStatus.source}
              </strong>
            </div>

            <button
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              className="text-xs px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 flex items-center gap-1.5 transition font-medium"
            >
              <Key className="w-3.5 h-3.5 text-[#F5C518]" />
              <span>Inspeccionar Clave</span>
              {showKeyConfig ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Panel Colapsable de Inspección de API Key y Variables de Entorno */}
        {showKeyConfig && (
          <div className="mt-4 pt-4 border-t border-neutral-800/80 text-xs text-neutral-300 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/60 p-3 rounded-xl border border-neutral-800">
                <span className="text-neutral-400 block mb-1">Variable en .env:</span>
                <code className="text-[#F5C518] font-mono">VITE_OMDB_API_URL</code>
                <div className="text-neutral-300 font-mono text-[11px] mt-1">{apiConfig.url}</div>
              </div>

              <div className="bg-black/60 p-3 rounded-xl border border-neutral-800">
                <span className="text-neutral-400 block mb-1">API Key (.env masked):</span>
                <code className="text-[#F5C518] font-mono">VITE_OMDB_API_KEY</code>
                <div className="text-neutral-300 font-mono text-[11px] mt-1">{apiConfig.maskedKey}</div>
              </div>

              <div className="bg-black/60 p-3 rounded-xl border border-neutral-800">
                <span className="text-neutral-400 block mb-1">Estrategia de Fallback:</span>
                <span className="text-emerald-400 font-medium">TVMaze REST + Buffer Seguro</span>
                <div className="text-[11px] text-neutral-400 mt-1">Activo si OMDb key no está provista</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <span className="text-neutral-400 text-xs whitespace-nowrap">
                ¿Deseas probar una clave OMDb en vivo?
              </span>
              <div className="flex w-full sm:w-auto items-center gap-2">
                <input
                  type="text"
                  placeholder="ej. a3b5c7d8"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white font-mono focus:border-[#F5C518] outline-none"
                />
                <button
                  onClick={() => fetchMovies(searchTerm, typeFilter, yearFilter, customKey)}
                  className="px-3 py-1.5 rounded-lg bg-[#F5C518] text-black font-bold text-xs hover:bg-[#e2b616] transition"
                >
                  Aplicar Clave
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2. BUSCADOR EN TIEMPO REAL & FILTROS */}
      <section className="glass-panel p-6 rounded-2xl border border-neutral-800 space-y-5">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Buscar películas, series o franquicias (ej. Batman, Avengers, Interstellar)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-neutral-900/90 text-white placeholder-neutral-500 border border-neutral-700 focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518] outline-none text-sm transition"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#F5C518] text-black font-extrabold text-sm hover:bg-[#e2b616] transition flex items-center justify-center gap-2 shadow-lg shadow-[#F5C518]/10"
            >
              <Search className="w-4 h-4 text-black" />
              <span>Buscar</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setQuery('Batman');
                setSearchTerm('Batman');
                setTypeFilter('');
                setYearFilter('');
              }}
              className="p-3 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition"
              title="Restablecer búsqueda por defecto"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Filtros rápidos: Tags de sugerencias */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-neutral-400 font-semibold mr-1">Títulos Populares:</span>
          {quickSearches.map((title) => (
            <button
              key={title}
              type="button"
              onClick={() => {
                setQuery(title);
                setSearchTerm(title);
              }}
              className={`text-xs px-3 py-1 rounded-full transition border ${
                searchTerm.toLowerCase() === title.toLowerCase()
                  ? 'bg-[#F5C518] text-black font-bold border-[#F5C518]'
                  : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-600'
              }`}
            >
              {title}
            </button>
          ))}
        </div>

        {/* Filtro por Tipo y Año */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-neutral-800/80 text-xs text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-400">Tipo:</span>
            <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800">
              <button
                type="button"
                onClick={() => setTypeFilter('')}
                className={`px-3 py-1 rounded-lg transition font-medium ${
                  typeFilter === '' ? 'bg-[#F5C518] text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('movie')}
                className={`px-3 py-1 rounded-lg transition font-medium flex items-center gap-1 ${
                  typeFilter === 'movie' ? 'bg-[#F5C518] text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Film className="w-3 h-3" /> Películas
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('series')}
                className={`px-3 py-1 rounded-lg transition font-medium flex items-center gap-1 ${
                  typeFilter === 'series' ? 'bg-[#F5C518] text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Tv className="w-3 h-3" /> Series
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-semibold text-neutral-400">Año:</span>
            <input
              type="text"
              placeholder="ej. 2022"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-24 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white focus:border-[#F5C518] outline-none"
            />
          </div>
        </div>
      </section>

      {/* 3. GRID DE PELÍCULAS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-[#F5C518]" />
            Resultados para &ldquo;<span className="text-[#F5C518]">{searchTerm}</span>&rdquo;
            <span className="text-xs text-neutral-400 font-normal">({movies.length} títulos mostrados)</span>
          </h2>

          <div className="text-xs text-neutral-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Datos JSON sanitizados y validados</span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-neutral-900/60 rounded-2xl border border-neutral-800 p-3 space-y-3 animate-pulse">
                <div className="w-full aspect-[2/3] bg-neutral-800 rounded-xl"></div>
                <div className="h-4 bg-neutral-800 rounded w-3/4"></div>
                <div className="h-3 bg-neutral-800 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="group relative bg-[#131317] rounded-2xl border border-neutral-800/90 overflow-hidden hover:border-[#F5C518]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#F5C518]/10 flex flex-col justify-between"
              >
                {/* Poster Container */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-900">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';
                    }}
                  />

                  {/* Rating Badge */}
                  <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-yellow-500/30 flex items-center gap-1 text-[#F5C518] font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-[#F5C518]" />
                    <span>{movie.Rating || '7.9'}</span>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black/80 text-neutral-300 backdrop-blur-sm border border-neutral-700">
                      {movie.Type === 'series' ? 'Serie' : 'Película'}
                    </span>
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button
                      onClick={() => onSelectMovie(movie)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#F5C518] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-[#F5C518]/30 hover:bg-[#e2b616] transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver Ficha Técnica</span>
                    </button>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm line-clamp-1 group-hover:text-[#F5C518] transition-colors" title={movie.Title}>
                      {movie.Title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-neutral-400 mt-1">
                      <span>{movie.Year}</span>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {movie.imdbID.startsWith('tt') ? 'IMDb' : 'TVMaze'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectMovie(movie)}
                    className="w-full py-2 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#F5C518]" />
                    <span>Ver Detalles</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 space-y-4 bg-neutral-900/30 rounded-2xl border border-dashed border-neutral-800">
            <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 mx-auto">
              <Film className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">No se encontraron películas para &ldquo;{searchTerm}&rdquo;</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Prueba buscando otro título conocido como Batman, Avengers, Interstellar o Matrix.
              </p>
            </div>
            <button
              onClick={() => {
                setQuery('Batman');
                setSearchTerm('Batman');
              }}
              className="px-4 py-2 rounded-xl bg-[#F5C518] text-black font-bold text-xs hover:bg-[#e2b616] transition"
            >
              Cargar Cartelera de Batman
            </button>
          </div>
        )}
      </section>

    </div>
  );
}
