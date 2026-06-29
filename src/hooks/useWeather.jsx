// =========================================================================
// CEREBRO DE LA APLICACIÓN (useWeather.jsx)
// =========================================================================
// Aquí está la mayor parte del trabajo de la aplicación.
// Este archivo busca el clima, guarda la información,
// maneja los favoritos y controla lo que pasa en la app.

import { useState, useEffect } from "react";

export default function useWeather() {

  // Aquí guardamos todo lo que la aplicación necesita recordar.
  const [textoBuscado, setTextoBuscado] = useState("");
  const [datosClima, setDatosClima] = useState(null);
  const [estaCargando, setEstaCargando] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState("");
  const [modoOscuro, setModoOscuro] = useState(false);
  const [usarCelsius, setUsarCelsius] = useState(true);

  // Aquí cargamos las ciudades favoritas guardadas en el navegador.
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem("mis_ciudades_favoritas");
    return guardados ? JSON.parse(guardados) : ["Santo Domingo", "Madrid", "Miami", "Tokyo"];
  });

  // Cada vez que cambian los favoritos, los guardamos en el navegador.
  useEffect(() => {
    localStorage.setItem("mis_ciudades_favoritas", JSON.stringify(favoritos));
  }, [favoritos]);

  // Carga la ciudad por defecto
  const cargarDefault = () => {
    obtenerClimaDeCiudad("Santo Domingo");
  };

  // Al iniciar la app intentamos obtener la ubicación del usuario
  useEffect(() => {
    setEstaCargando(true);

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(

        async (posicion) => {

          const { latitude, longitude } = posicion.coords;

          try {

            // Reverse geocoding para obtener el nombre de la ciudad
            const resGeo = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );

            let nombreCiudad = "Current Location";
            let nombrePais = "";

            if (resGeo.ok) {
              const datosGeo = await resGeo.json();
              nombreCiudad =
                datosGeo.city ||
                datosGeo.locality ||
                datosGeo.principalSubdivision ||
                "Current Location";
              nombrePais = datosGeo.countryCode || "";
            }

            // Buscar clima con coordenadas
            await obtenerClimaPorCoordenadas(latitude, longitude, nombreCiudad, nombrePais);

          } catch (e) {
            cargarDefault();
          }
        },

        () => cargarDefault()
      );

    } else {
      cargarDefault();
    }

  }, []);

  // Buscar ciudad por nombre
  const obtenerClimaDeCiudad = async (nombreC) => {

    if (!nombreC.trim()) return;

    setEstaCargando(true);
    setErrorMensaje("");

    try {

      const urlGeo = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nombreC)}&count=1&language=en`;

      const res = await fetch(urlGeo);

      if (!res.ok) throw new Error("Location service is unavailable.");

      const datosGeo = await res.json();

      if (!datosGeo.results || datosGeo.results.length === 0) {
        throw new Error(`We couldn't find "${nombreC}".`);
      }

      const coincidencia = datosGeo.results[0];

      await obtenerClimaPorCoordenadas(
        coincidencia.latitude,
        coincidencia.longitude,
        coincidencia.name,
        coincidencia.country_code || coincidencia.country || ""
      );

    } catch (error) {

      setErrorMensaje(error.message || "Error searching for the city.");
      setEstaCargando(false);
    }
  };

  // Obtener clima usando coordenadas
  const obtenerClimaPorCoordenadas = async (lat, lon, nombreCiudad, codigoPais) => {

    setEstaCargando(true);
    setErrorMensaje("");

    try {

      const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,pressure_msl,dew_point_2m,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&hourly=temperature_2m,weather_code,precipitation_probability&timezone=auto`;

      const respuesta = await fetch(urlClima);

      if (!respuesta.ok) throw new Error("Weather API error.");

      const datos = await respuesta.json();

      const actual = datos.current;
      const diario = datos.daily;
      const horario = datos.hourly;

      // Formatear fecha legible
      const [fechaPart, horaPart] = actual.time.split("T");
      const [anio, mes, diaNum] = fechaPart.split("-").map(Number);
      const [horaNum, minNum] = horaPart.split(":").map(Number);

      const fechaLocal = new Date(anio, mes - 1, diaNum, horaNum, minNum);

      const arrayDias = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const arrayMeses = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      const minConCero = minNum < 10 ? `0${minNum}` : minNum;
      const ampm = horaNum >= 12 ? "PM" : "AM";

      const fechaLegible =
        `${arrayDias[fechaLocal.getDay()]}, ${arrayMeses[fechaLocal.getMonth()]} ${diaNum} · ${horaNum % 12 || 12}:${minConCero} ${ampm}`;

      // Procesar pronóstico diario
      const diasProcesados = diario.time.map((fechaStr, index) => {

        const objFecha = new Date(fechaStr + "T00:00:00");

        const diasSemanaCorta = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const mesesCorta = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return {
          diaNombre: diasSemanaCorta[objFecha.getDay()],
          fechaFormato: `${mesesCorta[objFecha.getMonth()]} ${objFecha.getDate()}`,
          tempMax: Math.round(diario.temperature_2m_max[index]),
          tempMin: Math.round(diario.temperature_2m_min[index]),
          codigo: diario.weather_code[index],
          probLluviaMax: diario.precipitation_probability_max[index],
          uvMax: Math.round(diario.uv_index_max[index])
        };
      });

      // Procesar pronóstico por horas
      const horaISOActual = actual.time.substring(0, 13) + ":00";
      const idx = Math.max(0, horario.time.indexOf(horaISOActual));

      const horasProcesadas = [];

      for (let i = idx; i < idx + 24 && i < horario.time.length; i++) {

        const tiempoISO = horario.time[i];
        const horaH = parseInt(tiempoISO.split("T")[1].split(":")[0]);

        horasProcesadas.push({
          hora: `${horaH % 12 || 12}:00 ${horaH >= 12 ? "PM" : "AM"}`,
          temp: Math.round(horario.temperature_2m[i]),
          codigo: horario.weather_code[i],
          probLluvia: horario.precipitation_probability[i]
        });
      }

      // Guardar datos finales del clima
      setDatosClima({
        ciudad: nombreCiudad,
        pais: codigoPais ? codigoPais.toUpperCase() : "",
        temp: Math.round(actual.temperature_2m),
        sensacion: Math.round(actual.apparent_temperature),
        humedad: actual.relative_humidity_2m,
        viento: Math.round(actual.wind_speed_10m),
        presion: Math.round(actual.pressure_msl),
        puntoRocio: Math.round(actual.dew_point_2m),
        uvIndex: Math.round(actual.uv_index),
        codigoClima: actual.weather_code,
        esDeDia: actual.is_day === 1,
        amanecer: diario.sunrise[0].split("T")[1] || "",
        atardecer: diario.sunset[0].split("T")[1] || "",
        lat: lat,
        lon: lon,
        horaLocal: fechaLegible,
        pronosticoHoras: horasProcesadas,
        pronosticoDias: diasProcesados
      });

      setTextoBuscado(nombreCiudad);

    } catch (e) {

      setErrorMensaje("Weather connection problem.");

    } finally {
      setEstaCargando(false);
    }
  };

  // Alternar favoritos
  const alternarFavorito = () => {

    if (!datosClima) return;

    const yaEsFav = favoritos.some(
      (f) => f.toLowerCase() === datosClima.ciudad.toLowerCase()
    );

    if (yaEsFav) {
      setFavoritos(favoritos.filter(
        (f) => f.toLowerCase() !== datosClima.ciudad.toLowerCase()
      ));
    } else {
      setFavoritos([...favoritos, datosClima.ciudad]);
    }
  };

  return {
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
  };
}