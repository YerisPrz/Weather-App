// COMPONENTE: BARRA DE CIUDADES FAVORITAS
// Este componente muestra las ciudades que el usuario guardó.
// Desde aquí puede abrir una ciudad rápidamente
// o quitarla de la lista de favoritos.

import React from "react";
import { Star, X } from "lucide-react";

export default function FavoritesBar({
  favoritos,
  setFavoritos,
  ciudadActiva,
  onBuscar,
  setTextoBuscado,
  modoOscuro,
}) {

  // Esta función elimina una ciudad de la lista de favoritos.
  const eliminarFavorito = (e, ciudadAEliminar) => {

    // Evita que también se abra la ciudad al hacer clic en la X.
    e.stopPropagation();

    // Se crea una nueva lista sin la ciudad que queremos borrar.
    setFavoritos(
      favoritos.filter(
        (f) => f.toLowerCase() !== ciudadAEliminar.toLowerCase()
      )
    );
  };

  return (
    <div className="flex flex-col gap-2">

      {/* Título de esta sección */}
      <span className="text-[10px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500 flex items-center gap-1 select-none">
        <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" /> Saved Favorite Cities
      </span>

      {/* Aquí mostramos todas las ciudades favoritas */}
      <div className="flex flex-wrap gap-2">

        {/* Recorremos la lista para crear un botón por cada ciudad */}
        {favoritos.map((ciudadF, index) => {

          // Revisamos si esta ciudad es la que está abierta ahora.
          const esActiva = ciudadActiva?.toLowerCase() === ciudadF.toLowerCase();

          return (

            <div
              key={index}
              className={`flex items-center gap-1 rounded-xl px-3 py-1.5 border text-xs font-bold transition-all ${
                esActiva
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : modoOscuro
                    ? "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                    : "bg-white/80 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white"
              }`}
            >

              {/* Botón para abrir el clima de esta ciudad */}
              <button
                type="button"
                onClick={() => {
                  setTextoBuscado(ciudadF);
                  onBuscar(ciudadF);
                }}
                className="cursor-pointer font-bold"
              >
                {ciudadF}
              </button>

              {/* Botón para quitar la ciudad de favoritos */}
              <button
                type="button"
                onClick={(e) => eliminarFavorito(e, ciudadF)}
                className="ml-1 text-[10px] text-slate-400 hover:text-rose-500 font-bold px-1 transition-colors cursor-pointer"
                title="Remove from favorites"
              >
                <X className="h-3 w-3 shrink-0 inline-block" />
              </button>

            </div>

          );
        })}

        {/* Si no hay ciudades guardadas, mostramos este mensaje */}
        {favoritos.length === 0 && (
          <span className="text-xs text-slate-400 italic">
            No saved favorites yet. Add one by clicking the star!
          </span>
        )}

      </div>

    </div>
  );
}
