// =========================================================================
// COMPONENTE: BARRA DE ARRIBA DE LA APLICACIÓN
// =========================================================================
// Este componente muestra la parte de arriba de la página.
// Aquí está el nombre de la app, el buscador y los botones
// para cambiar la temperatura y el color de la pantalla.

import React from "react";
import { Search, Sun, Moon, CloudSun } from "lucide-react";

export default function Navbar({
  textoBuscado,
  setTextoBuscado,
  onBuscar,
  modoOscuro,
  setModoOscuro,
  usarCelsius,
  setUsarCelsius,
}) {

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(textoBuscado);
  };

  return (
    <nav className={`border-b transition-all duration-300 backdrop-blur-md sticky top-0 z-30 ${
      modoOscuro ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-slate-200"
    }`}>

      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">

        {/* Logo y nombre de la app */}
        <div className="flex items-center gap-2 cursor-default select-none">

          <CloudSun className="h-6 w-6 text-indigo-600 dark:text-indigo-400 animate-pulse" />

          <div className="flex flex-col">

            <span className="text-lg font-black tracking-tight leading-none text-slate-900 dark:text-white">
              SkyCast
            </span>

          </div>

        </div>

        {/* Search bar */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-sm sm:w-auto">

          <div className="relative flex-grow">

            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="h-4 w-4" />
            </span>

            <input
              type="text"
              placeholder="Search for a city..."
              value={textoBuscado}
              onChange={(e) => setTextoBuscado(e.target.value)}
              className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/10 border font-medium ${
                modoOscuro
                  ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500"
                  : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
              }`}
            />

          </div>

          {/* Search button */}
          <button
            type="submit"
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer active:scale-95"
          >
            Search
          </button>

        </form>

        {/* Controls */}
        <div className="flex items-center gap-2">

          {/* Temperature unit toggle */}
          <button
            type="button"
            onClick={() => setUsarCelsius(!usarCelsius)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wide transition-all cursor-pointer active:scale-95 ${
              modoOscuro
                ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-indigo-50"
            }`}
          >
            {usarCelsius ? "→ °F" : "→ °C"}
          </button>

          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={() => setModoOscuro(!modoOscuro)}
            className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center active:scale-95 ${
              modoOscuro
                ? "bg-slate-900 border-slate-800 text-amber-400"
                : "bg-slate-50 border-slate-200 text-indigo-600"
            }`}
          >

            {modoOscuro ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}

          </button>

        </div>

      </div>

    </nav>
  );
}