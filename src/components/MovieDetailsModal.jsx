import React, { useState } from 'react';
import { X, Star, Calendar, Clock, Film, Code, Eye, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export default function MovieDetailsModal({ movie, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('info'); // 'info' or 'json'

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#131316] border border-neutral-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-800 bg-[#17171c]">
          <div className="flex items-center gap-3">
            <span className="bg-[#F5C518] text-black text-xs font-black px-2 py-0.5 rounded tracking-wide">
              IMDb SHIELD
            </span>
            <span className="text-xs text-neutral-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ID: {movie.imdbID}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch */}
            <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-xs">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                  activeTab === 'info'
                    ? 'bg-[#F5C518] text-black font-bold shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                Ficha Cinematográfica
              </button>
              <button
                onClick={() => setActiveTab('json')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                  activeTab === 'json'
                    ? 'bg-neutral-800 text-[#F5C518] font-bold shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                Payload REST (JSON)
              </button>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition ml-2"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {activeTab === 'info' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Poster Column */}
              <div className="md:col-span-4 flex flex-col items-center">
                <div className="relative w-full aspect-[2/3] max-w-[280px] rounded-xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 group">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-yellow-500/30 flex items-center gap-1 text-[#F5C518] font-bold text-sm">
                    <Star className="w-4 h-4 fill-[#F5C518]" />
                    <span>{movie.Rating || '8.2'}/10</span>
                  </div>
                </div>

                <div className="mt-4 w-full text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-neutral-900 border border-neutral-800 text-neutral-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Recuperado vía RESTful JSON</span>
                  </div>
                </div>
              </div>

              {/* Details Column */}
              <div className="md:col-span-8 space-y-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="uppercase text-xs font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#F5C518]/20 text-[#F5C518] border border-[#F5C518]/30">
                      {movie.Type === 'series' ? 'Serie de TV' : 'Película'}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-neutral-400 bg-neutral-800/80 px-2.5 py-0.5 rounded-full border border-neutral-700">
                      <Calendar className="w-3 h-3 text-[#F5C518]" /> {movie.Year}
                    </span>
                    {movie.Runtime && (
                      <span className="flex items-center gap-1 text-xs text-neutral-400 bg-neutral-800/80 px-2.5 py-0.5 rounded-full border border-neutral-700">
                        <Clock className="w-3 h-3 text-[#F5C518]" /> {movie.Runtime}
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
                    {movie.Title}
                  </h1>
                </div>

                {/* Genre chips */}
                {movie.Genre && (
                  <div className="flex flex-wrap gap-1.5">
                    {movie.Genre.split(',').map((g, idx) => (
                      <span key={idx} className="text-xs bg-neutral-900 text-neutral-300 px-2.5 py-1 rounded-md border border-neutral-800">
                        {g.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Synopsis */}
                <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800/80">
                  <h3 className="text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-2">
                    Sinopsis Oficial
                  </h3>
                  <p className="text-sm text-neutral-200 leading-relaxed">
                    {movie.Plot || 'Sin descripción detallada disponible para esta obra en la cartelera.'}
                  </p>
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-neutral-900/40 p-3 rounded-lg border border-neutral-800">
                    <span className="text-neutral-500 block mb-1">Director / Creador</span>
                    <span className="text-neutral-200 font-medium">{movie.Director || 'Director de Estudio'}</span>
                  </div>
                  <div className="bg-neutral-900/40 p-3 rounded-lg border border-neutral-800">
                    <span className="text-neutral-500 block mb-1">Reparto Estelar</span>
                    <span className="text-neutral-200 font-medium">{movie.Actors || 'Elenco Cinematográfico'}</span>
                  </div>
                  <div className="bg-neutral-900/40 p-3 rounded-lg border border-neutral-800">
                    <span className="text-neutral-500 block mb-1">Fuente de Consumo</span>
                    <span className="text-emerald-400 font-mono font-medium">{movie.Source || 'Web Service REST'}</span>
                  </div>
                  <div className="bg-neutral-900/40 p-3 rounded-lg border border-neutral-800">
                    <span className="text-neutral-500 block mb-1">Protocolo de Transporte</span>
                    <span className="text-neutral-300 font-mono">HTTPS (TLS 1.3 / JSON)</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* JSON Technical Inspector */
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-neutral-900 p-3 rounded-xl border border-neutral-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="font-semibold text-white">Inspección de Payload JSON (Unidad 3 - Web Services RESTful)</span>
                </div>
                <span className="text-neutral-400 font-mono">Content-Type: application/json</span>
              </div>

              <div className="bg-black/90 p-4 rounded-xl border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto max-h-[500px]">
                <pre>{JSON.stringify(movie.raw || movie, null, 2)}</pre>
              </div>

              <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  Los datos fueron consumidos a través de una petición HTTP GET asíncrona (Fetch API), serializados y renderizados en React mediante desestructuración reactiva.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-neutral-800 bg-[#17171c] text-xs text-neutral-400">
          <span>Servicio Web REST: {movie.Source || 'OMDb / TVMaze'}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#F5C518] text-black font-bold hover:bg-[#e2b616] transition"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
}
