// =========================================================================
// COMPONENTE: HOURLY FORECAST (Pronóstico para las próximas 24 horas)
// =========================================================================
// Renderiza un carrusel de desplazamiento horizontal que muestra el cambio de
// temperatura y probabilidad de precipitaciones hora por hora.
import React from "react";
import { Clock } from "lucide-react";

export default function HourlyForecast({
  pronosticoHoras,
  renderIconClima,
  formatearTemp,
  modoOscuro,
}) {
  return (
    <div className="space-y-2">
      <span className="text-[10px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500 flex items-center gap-1 select-none">
        <Clock className="w-3.5 h-3.5 shrink-0" /> Pronóstico de las Próximas 24 Horas
      </span>
      
      {/* Carrusel horizontal */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {pronosticoHoras.map((horaItem, index) => (
          <div 
            key={index}
            className={`p-3.5 rounded-2xl border text-center min-w-[85px] flex flex-col gap-1.5 shrink-0 transition-all ${
              modoOscuro 
                ? "bg-slate-900/60 border-slate-800 hover:border-slate-700" 
                : "bg-white/80 border-slate-200 hover:border-slate-300"
            }`}
          >
            <p className="text-[10px] text-slate-400 font-bold">{horaItem.hora}</p>
            
            {/* Altura fija para centrar perfectamente el icono */}
            <div className="flex items-center justify-center h-8 my-0.5 select-none">
              {renderIconClima(horaItem.codigo, "h-6 w-6")}
            </div>
            
            <p className="text-sm font-black">{formatearTemp(horaItem.temp)}</p>
            
            {/* Porcentaje de lluvia solo si es mayor que cero */}
            {horaItem.probLluvia > 0 && (
              <span className="text-[9px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-md font-extrabold leading-none">
                💧 {horaItem.probLluvia}%
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
