import React from "react";

// Traemos dos iconos que usaremos en la aplicación.
import { Compass, AlertCircle } from "lucide-react";

// Traemos los diferentes componentes (como piezas de LEGO)
import Navbar from "./components/Navbar.jsx";
import FavoritesBar from "./components/FavoritesBar.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import WeatherInsights from "./components/WeatherInsights.jsx";
import HourlyForecast from "./components/HourlyForecast.jsx";
import WeeklyForecast from "./components/WeeklyForecast.jsx";

// Traemos un Hook que se encarga de obtener toda la información del clima.
import useWeather from "./hooks/useWeather.jsx";

// Traemos funciones que ayudan a mostrar el clima bonito.
import {
  renderIconClima,
  obtenerDescripcionClima,
  formatearTemp,
  obtenerEstiloFondo
} from "./utils/weatherUtils.jsx";

// Esta es la función principal de la aplicación.
// Todo lo que se ve en pantalla sale de aquí.
export default function App() {

  // Aquí sacamos toda la información y funciones que vienen del Hook.
  // Es como abrir una mochila y sacar todo lo que necesitamos.
  const {
    textoBuscado,
    setTextoBuscado,
    datosClima,
    estaCargando,
    errorMensaje,
    modoOscuro,
    setModoOscuro,
    usarCelsius,
    setUsarCelsius,
    favoritos,
    setFavoritos,
    obtenerClimaDeCiudad,
    alternarFavorito,
    cargarDefault,
  } = useWeather();

  // Aquí revisamos si la ciudad actual ya está guardada en favoritos.
  const esFavoritoActivo = !!datosClima && favoritos.some(
    (f) => f.toLowerCase() === datosClima.ciudad.toLowerCase()
  );

  // Todo lo que está dentro del return es lo que veremos en la pantalla.
  return (

    // Este es el contenedor principal de toda la aplicación.
    // También cambia el color del fondo dependiendo del clima.
    <div className={`min-h-screen transition-all duration-700 flex flex-col justify-between bg-gradient-to-tr ${obtenerEstiloFondo(datosClima, modoOscuro)} ${
      modoOscuro ? "text-slate-100" : "text-slate-800"
    }`}>

      {/* Barra superior donde escribimos el nombre de una ciudad */}
      <Navbar
        textoBuscado={textoBuscado}
        setTextoBuscado={setTextoBuscado}
        onBuscar={obtenerClimaDeCiudad}
        modoOscuro={modoOscuro}
        setModoOscuro={setModoOscuro}
        usarCelsius={usarCelsius}
        setUsarCelsius={setUsarCelsius}
      />

      {/* Aquí empieza el contenido principal */}
      <main className="max-w-5xl mx-auto px-4 py-6 w-full flex-grow flex flex-col gap-6">

        {/* Barra donde aparecen las ciudades favoritas */}
        <FavoritesBar
          favoritos={favoritos}
          setFavoritos={setFavoritos}
          ciudadActiva={datosClima?.ciudad}
          onBuscar={obtenerClimaDeCiudad}
          setTextoBuscado={setTextoBuscado}
          modoOscuro={modoOscuro}
        />

        <div className="flex-grow">

          {/* Si todavía estamos esperando la información */}
          {estaCargando ? (

            // Mostramos un icono girando y un mensaje.
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <Compass className="h-10 w-10 text-indigo-500 animate-spin" />
              <p className="text-xs font-black uppercase tracking-widest text-slate-440 animate-pulse">
                Sincronizando reporte en tiempo real...
              </p>
            </div>

          ) : errorMensaje ? (

            // Si ocurrió un error (por ejemplo la ciudad no existe)
            // mostramos este cuadro rojo.
            <div className={`p-6 rounded-2xl border text-center max-w-md mx-auto space-y-4 shadow-xl ${
              modoOscuro ? "bg-red-950/10 border-red-900/40 text-red-200" : "bg-red-50/50 border-red-100 text-red-800"
            }`}>
              <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />

              <div>
                <h4 className="font-extrabold text-lg">Ciudad no encontrada</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-bold">
                  {errorMensaje}
                </p>
              </div>

              {/* Botón para volver a cargar la ciudad principal */}
              <button
                type="button"
                onClick={cargarDefault}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Volver a la ciudad de inicio
              </button>
            </div>

          ) : datosClima ? (

            // Si ya tenemos los datos del clima,
            // mostramos toda la información.
            <div className="space-y-6">

              {/* Tarjeta principal con el clima actual */}
              <WeatherCard
                datosClima={datosClima}
                usarCelsius={usarCelsius}
                modoOscuro={modoOscuro}
                esFavoritoActivo={esFavoritoActivo}
                alternarFavorito={alternarFavorito}
                renderIconClima={renderIconClima}
                obtenerDescripcionClima={obtenerDescripcionClima}
                formatearTemp={(temp) => formatearTemp(temp, usarCelsius)}
              />

              {/* Información extra como humedad, viento, etc. */}
              <WeatherInsights datosClima={datosClima} />

              {/* Pronóstico por horas */}
              <HourlyForecast
                pronosticoHoras={datosClima.pronosticoHoras}
                renderIconClima={renderIconClima}
                formatearTemp={(temp) => formatearTemp(temp, usarCelsius)}
                modoOscuro={modoOscuro}
              />

              {/* Pronóstico para varios días */}
              <WeeklyForecast
                pronosticoDias={datosClima.pronosticoDias}
                renderIconClima={renderIconClima}
                obtenerDescripcionClima={obtenerDescripcionClima}
                formatearTemp={(temp) => formatearTemp(temp, usarCelsius)}
                modoOscuro={modoOscuro}
              />

            </div>

          ) : (

            // Si todavía no hay información,
            // mostramos un mensaje de carga.
            <div className="flex flex-col items-center justify-center py-24 gap-2">
              <Compass className="h-8 w-8 text-indigo-500 animate-spin" />
              <p className="text-xs font-bold text-slate-400">
                Cargando reporte meteorológico... 
              </p>
            </div>

          )}

        </div>

      </main>

      {/* Pie de página */}
      <footer className="px-4 pb-6 pt-2 select-none">

        {/* Caja donde aparece el autor y la API utilizada */}
        <div className={`p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] max-w-5xl mx-auto border ${
          modoOscuro ? "bg-slate-950/60 border-slate-800 text-slate-400" : "bg-white/80 border-slate-200 text-slate-500 shadow-sm"
        }`}>

          {/* Nombre del creador */}
          <span>
            Hecho en React por <b>Yeris Pérez</b>
          </span>

          {/* Coordenadas de la ciudad obtenidas desde la API */}
          <span className="font-mono text-[10px] text-slate-400">
            API: Open-Meteo (
            {datosClima
              ? `${datosClima.lat.toFixed(3)}°, ${datosClima.lon.toFixed(3)}°`
              : "GPS listo"})
          </span>

        </div>

      </footer>

    </div>
  );
}