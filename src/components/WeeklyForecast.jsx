
// COMPONENTE: WEEKLY FORECAST (Pronóstico para los siguientes 7 días)
// Muestra una lista vertical estructurada de las predicciones del clima,
// incluyendo condiciones estimadas, probabilidad de lluvias y temperaturas extremas.

import React from "react";
import { Compass, Umbrella } from "lucide-react";

export default function WeeklyForecast({
  pronosticoDias,
  renderIconClima,
  obtenerDescripcionClima,
  formatearTemp,
  modoOscuro,
}) {
  return (
    <div className="space-y-2">
      <span className="text-[10px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500 flex items-center gap-1 select-none">
        <Compass className="w-3.5 h-3.5 shrink-0" /> Pronóstico para los Siguientes 7 Días
      </span>

      <div className="grid grid-cols-1 gap-2">
        {pronosticoDias.map((diaItem, index) => (
          <div 
            key={index}
            className={`p-3 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
              modoOscuro 
                ? "bg-slate-900/60 border-slate-800 hover:bg-slate-900" 
                : "bg-white/80 border-slate-200 hover:bg-white"
            }`}
          >
            {/* Nombre del día y fecha */}
            <div className="flex items-center gap-3 min-w-[110px]">
              <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                {diaItem.diaNombre}
              </span>
              <span className="text-[10px] text-slate-400 font-bold">
                {diaItem.fechaFormato}
              </span>
            </div>

            {/* Icono animado/coloreado de Lucide y descripción simple */}
            <div className="flex items-center gap-3 flex-grow justify-start min-w-[140px]">
              <div className="shrink-0">
                {renderIconClima(diaItem.codigo, "h-5 w-5")}
              </div>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {obtenerDescripcionClima(diaItem.codigo)}
              </span>
            </div>

            {/* Aviso inteligente de probabilidad de lluvia (oculto en pantallas muy chiquitas) */}
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-black">
              {diaItem.probLluviaMax > 0 ? (
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg flex items-center gap-1">
                  <Umbrella className="h-3 w-3 shrink-0" /> {diaItem.probLluviaMax}% Lluvia
                </span>
              ) : (
                <span className="text-slate-400 font-bold">Seco</span>
              )}
            </div>

            {/* Temperaturas Máxima / Mínima */}
            <div className="flex items-center gap-2 text-right">
              <span className="text-xs font-black text-slate-800 dark:text-white">
                {formatearTemp(diaItem.tempMax)}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">
                / {formatearTemp(diaItem.tempMin)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
