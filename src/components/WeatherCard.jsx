// =========================================================================
// COMPONENTE: WEATHER CARD (Tarjeta principal del clima del día)
// =========================================================================
// Muestra de manera interactiva el reporte meteorológico actual de la ciudad
// seleccionada con un diseño moderno tipo Bento Grid.
import React from "react";
import { 
  MapPin, 
  Star, 
  Wind, 
  Droplets, 
  Sun, 
  Gauge, 
  Moon 
} from "lucide-react";

export default function WeatherCard({
  datosClima,
  modoOscuro,
  esFavoritoActivo,
  alternarFavorito,
  renderIconClima,
  obtenerDescripcionClima,
  formatearTemp,
}) {

  return (
    <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden transition-all duration-500 ${
      modoOscuro 
        ? "bg-slate-900/80 border-slate-800 text-white" 
        : "bg-white/80 border-slate-200 text-slate-800"
    }`}>
      
      {/* 1. Cabecera con el Nombre de la Ciudad e Icono de Guardado */}
      <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/35 rounded-xl text-indigo-500 shrink-0">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none text-slate-900 dark:text-white">
                {datosClima.ciudad}
              </h1>
              {datosClima.pais && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/45 text-indigo-700 dark:text-indigo-300">
                  {datosClima.pais}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold">
              {datosClima.horaLocal}
            </p>
          </div>
        </div>

        {/* Botón interactivo de estrella para añadir a favoritos */}
        <button
          type="button"
          onClick={alternarFavorito}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer active:scale-95 select-none ${
            esFavoritoActivo
              ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
              : modoOscuro
                ? "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
                : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <Star className={`h-3.5 w-3.5 ${esFavoritoActivo ? "fill-amber-400 text-amber-500" : "text-slate-400"}`} />
          <span>{esFavoritoActivo ? "Guardado" : "Favorito"}</span>
        </button>
      </div>

      {/* 2. Grid de Información Principal de Clima */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 items-center">
        
        {/* Columna de Temperatura e Icono Climatológico */}
        <div className="flex items-center gap-4">
          <div className="select-none scale-[1.3] md:scale-[1.5] origin-left shrink-0">
            {renderIconClima(datosClima.codigoClima, "h-10 w-10")}
          </div>
          <div className="ml-4">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
              {formatearTemp(datosClima.temp)}
            </h2>
            <p className="text-base font-extrabold text-indigo-650 dark:text-indigo-300 mt-1.5 leading-none">
              {obtenerDescripcionClima(datosClima.codigoClima)}
            </p>
            <p className="text-xs text-slate-400 mt-1.5 font-bold">
              Sensación térmica: {formatearTemp(datosClima.sensacion)}
            </p>
          </div>
        </div>

        {/* Bento Grid con detalles rápidos de viento, humedad, UV y presión */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`p-3 rounded-2xl border flex items-center gap-3 ${
            modoOscuro ? "bg-slate-950/40 border-slate-800/80" : "bg-slate-50/50 border-slate-200/60"
          }`}>
            <Wind className="h-5 w-5 text-indigo-500 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Viento</p>
              <p className="text-xs font-black">{datosClima.viento} km/h</p>
            </div>
          </div>
          
          <div className={`p-3 rounded-2xl border flex items-center gap-3 ${
            modoOscuro ? "bg-slate-950/40 border-slate-800/80" : "bg-slate-50/50 border-slate-200/60"
          }`}>
            <Droplets className="h-5 w-5 text-sky-500 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Humedad</p>
              <p className="text-xs font-black">{datosClima.humedad}%</p>
            </div>
          </div>
          
          <div className={`p-3 rounded-2xl border flex items-center gap-3 ${
            modoOscuro ? "bg-slate-950/40 border-slate-800/80" : "bg-slate-50/50 border-slate-200/60"
          }`}>
            <Sun className="h-5 w-5 text-amber-500 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Índice UV</p>
              <p className="text-xs font-black">{datosClima.uvIndex} (Máx)</p>
            </div>
          </div>
          
          <div className={`p-3 rounded-2xl border flex items-center gap-3 ${
            modoOscuro ? "bg-slate-950/40 border-slate-800/80" : "bg-slate-50/50 border-slate-200/60"
          }`}>
            <Gauge className="h-5 w-5 text-emerald-500 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Presión</p>
              <p className="text-xs font-black">{datosClima.presion} hPa</p>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Subdetalles del Amanecer, Atardecer y Punto de Rocío */}
      <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-200/40 dark:border-slate-800/40 text-center text-xs">
        <div>
          <span className="text-slate-400 font-bold flex items-center justify-center gap-1">
            <Sun className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Amanecer
          </span>
          <span className="font-black text-slate-700 dark:text-slate-200 block mt-0.5">{datosClima.amanecer} AM</span>
        </div>
        
        <div>
          <span className="text-slate-400 font-bold flex items-center justify-center gap-1">
            <Moon className="h-3.5 w-3.5 text-slate-400 shrink-0" /> Atardecer
          </span>
          <span className="font-black text-slate-700 dark:text-slate-200 block mt-0.5">{datosClima.atardecer} PM</span>
        </div>
        
        <div>
          <span className="text-slate-400 font-bold flex items-center justify-center gap-1">
            <Droplets className="h-3.5 w-3.5 text-sky-500 shrink-0" /> Punto Rocío
          </span>
          <span className="font-black text-slate-700 dark:text-slate-200 block mt-0.5">{formatearTemp(datosClima.puntoRocio)}</span>
        </div>
      </div>

    </div>
  );
}
