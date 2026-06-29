// =========================================================================
// UTILIDADES Y FUNCIONES AUXILIARES DE CLIMA (weatherUtils.js)
// =========================================================================
// Este archivo contiene los diccionarios de traducción de códigos 
// meteorológicos WMO de Open-Meteo, y mappers de iconos de Lucide.
// Separar esto permite que el App.jsx principal sea simple y ordenado.

import React from "react";
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudFog, 
  CloudDrizzle, 
  CloudSnow, 
  CloudRain, 
  CloudLightning 
} from "lucide-react";

// -----------------------------------------------------------------------
// MAPEO DE ICONOS DE LA LIBRERÍA "LUCIDE" (Sin un solo Emoji)
// -----------------------------------------------------------------------
export const renderIconClima = (codigo, clases = "h-6 w-6") => {
  if (codigo === 0) return <Sun className={`${clases} text-amber-500`} />;
  if (codigo === 1 || codigo === 2) return <CloudSun className={`${clases} text-sky-400`} />;
  if (codigo === 3) return <Cloud className={`${clases} text-slate-400`} />;
  if (codigo === 45 || codigo === 48) return <CloudFog className={`${clases} text-slate-300`} />;
  if (codigo === 51 || codigo === 53 || codigo === 55) return <CloudDrizzle className={`${clases} text-sky-300`} />;
  if (codigo === 56 || codigo === 57 || codigo === 66 || codigo === 67) return <CloudSnow className={`${clases} text-sky-200`} />;
  if (codigo === 61 || codigo === 63 || codigo === 65 || codigo === 80 || codigo === 81 || codigo === 82) return <CloudRain className={`${clases} text-blue-400`} />;
  if (codigo === 71 || codigo === 73 || codigo === 75 || codigo === 77 || codigo === 85 || codigo === 86) return <CloudSnow className={`${clases} text-sky-100`} />;
  if (codigo === 95 || codigo === 96 || codigo === 99) return <CloudLightning className={`${clases} text-yellow-400`} />;
  return <CloudSun className={`${clases} text-sky-400`} />;
};

// -----------------------------------------------------------------------
// TRADUCTOR DE CÓDIGOS METEOROLÓGICOS WMO (A español simple)
// -----------------------------------------------------------------------
export const obtenerDescripcionClima = (codigo) => {
  if (codigo === 0) return "Cielo Despejado";
  if (codigo === 1) return "Mayormente Despejado";
  if (codigo === 2) return "Parcialmente Nublado";
  if (codigo === 3) return "Nublado Completo";
  if (codigo === 45 || codigo === 48) return "Niebla Densa";
  if (codigo === 51 || codigo === 53 || codigo === 55) return "Llovizna Ligera";
  if (codigo === 56 || codigo === 57) return "Llovizna Helada";
  if (codigo === 61 || codigo === 63) return "Lluvia Moderada";
  if (codigo === 65) return "Lluvia Fuerte";
  if (codigo === 66 || codigo === 67) return "Lluvia Helada";
  if (codigo === 71 || codigo === 73 || codigo === 75) return "Nevada Activa";
  if (codigo === 77) return "Granizo Fino";
  if (codigo === 80 || codigo === 81 || codigo === 82) return "Chubascos Ligeros";
  if (codigo === 85 || codigo === 86) return "Chubascos de Nieve";
  if (codigo === 95 || codigo === 96 || codigo === 99) return "Tormenta Eléctrica";
  return "Nublado Variable";
};

// -----------------------------------------------------------------------
// CONVERTIDOR Y FORMATEADOR DE TEMPERATURAS (Celsius / Fahrenheit)
// -----------------------------------------------------------------------
export const formatearTemp = (celsius, usarCelsius) => {
  if (usarCelsius) {
    return `${celsius}°C`;
  }
  const fahrenheit = Math.round((celsius * 9) / 5 + 32);
  return `${fahrenheit}°F`;
};

// -----------------------------------------------------------------------
// DETERMINADOR DEL COLOR DE GRADIENTE DE FONDO DINÁMICO
// -----------------------------------------------------------------------
export const obtenerEstiloFondo = (datosClima, modoOscuro) => {
  if (!datosClima) {
    return modoOscuro 
      ? "from-slate-950 via-slate-900 to-indigo-950" 
      : "from-sky-100 via-slate-50 to-blue-50";
  }

  const cod = datosClima.codigoClima;

  if (modoOscuro) {
    if (cod === 0) return "from-slate-950 via-slate-900 to-[#0a1128]";
    if (cod >= 50 && cod <= 69) return "from-slate-950 via-indigo-950 to-slate-900";
    if (cod >= 70 && cod <= 79) return "from-slate-950 via-sky-950 to-slate-900";
    return "from-slate-950 via-slate-900 to-slate-950";
  } else {
    if (cod === 0) return "from-sky-200 via-amber-50 to-blue-100";
    if (cod >= 1 && cod <= 3) return "from-slate-200 via-blue-50 to-slate-100";
    if (cod >= 50 && cod <= 69) return "from-blue-200 via-slate-100 to-slate-300";
    if (cod >= 70 && cod <= 79) return "from-blue-100 via-sky-50 to-slate-200";
    return "from-sky-100 via-slate-50 to-indigo-50";
  }
};
