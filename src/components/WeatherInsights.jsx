// COMPONENTE: WEATHER INSIGHTS (Sugerencias de ropa y cuidado inteligente)
// Procesa el estado del clima actual y genera alertas/sugerencias dinámicas,
// usando clases personalizadas de color para resaltar según el aviso.

import React from "react";
import { 
  Umbrella, 
  Thermometer, 
  Sun, 
  Droplets, 
  Compass 
} from "lucide-react";

export default function WeatherInsights({ datosClima }) {
  
  // Función interna para calcular sugerencias de manera modular
  const generarRecomendaciones = () => {
    const t = datosClima.temp;
    const cod = datosClima.codigoClima;
    const uv = datosClima.uvIndex;
    const h = datosClima.humedad;

    // 1. Caso: Está lloviendo
    if ((cod >= 51 && cod <= 67) || (cod >= 80 && cod <= 82) || (cod >= 95 && cod <= 99)) {
      return {
        consejo: "¡Está lloviendo afuera! Recuerda llevar un paraguas grande y ropa impermeable para no mojarte.",
        iconoComponente: <Umbrella className="h-5 w-5 shrink-0" />,
        color: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40 text-blue-700 dark:text-blue-300"
      };
    }
    
    // 2. Caso: Clima bastante frío o nevando
    if (t < 13 || (cod >= 71 && cod <= 77) || (cod >= 85 && cod <= 86)) {
      return {
        consejo: "¡Hace bastante frío afuera! Abrígate bien con una chaqueta gruesa, bufanda y guantes antes de salir.",
        iconoComponente: <Thermometer className="h-5 w-5 shrink-0" />,
        color: "bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-900/40 text-sky-700 dark:text-sky-300"
      };
    }
    
    // 3. Caso: Radiación solar extrema
    if (uv >= 6) {
      return {
        consejo: "El sol está muy fuerte (Índice UV alto). Ponte bloqueador solar, lentes de sol y usa gorra si vas a estar afuera.",
        iconoComponente: <Sun className="h-5 w-5 shrink-0 animate-spin" style={{ animationDuration: '10s' }} />,
        color: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40 text-amber-700 dark:text-amber-300"
      };
    }
    
    // 4. Caso: Calor sofocante con alta humedad
    if (t > 26 && h > 75) {
      return {
        consejo: "El clima se siente muy húmedo y sofocante. Mantente súper hidratado tomando suficiente agua fría.",
        iconoComponente: <Droplets className="h-5 w-5 shrink-0" />,
        color: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-300"
      };
    }
    
    // 5. Caso por defecto: Clima óptimo
    return {
      consejo: "¡El clima está genial hoy! Es un día perfecto para salir a pasear, hacer ejercicio o disfrutar al aire libre.",
      iconoComponente: <Compass className="h-5 w-5 shrink-0" />,
      color: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/40 text-green-700 dark:text-green-300"
    };
  };

  const recomendacion = generarRecomendaciones();

  return (
    <div className={`p-4 rounded-2xl border flex gap-3 items-start transition-all duration-300 ${recomendacion.color}`}>
      <div className="mt-0.5">{recomendacion.iconoComponente}</div>
      <div className="text-xs">
        <p className="font-black uppercase tracking-wider text-[10px] opacity-75">
          Sugerencia inteligente de Yeris
        </p>
        <p className="font-bold mt-0.5 leading-relaxed">
          {recomendacion.consejo}
        </p>
      </div>
    </div>
  );
}
