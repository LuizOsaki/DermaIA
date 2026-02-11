import React, { useState, useEffect } from "react";
import styles from "./AlertaClimatico.module.css";
import CurrentWeather from "./componentsweather/CurrentWeather";
import HourlyForecast from "./componentsweather/HourlyForecast";
import WeeklyForecast from "./componentsweather/WeeklyForecast";
import SearchBar from "./componentsweather/SearchBar";

const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;

export default function AlertaClimatico() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (city = "São Paulo") => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${WEATHER_API_URL}/api/weather?city=${encodeURIComponent(city)}`
      );

      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setWeather(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro ao buscar clima");
    } finally {
      setLoading(false);
    }
  };

  // Geolocalização
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeather(`${latitude},${longitude}`);
      },
      () => fetchWeather()
    );
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Alerta Climático & Proteção Solar
          </h1>
          <p className={styles.subtitle}>
            Saiba o índice UV em tempo real e proteja sua pele com inteligência
          </p>
          <SearchBar onSearch={fetchWeather} />
        </div>

        <div className={styles.robot}>
          <img
            src="/assets/dermax2.png"
            alt="DermaIA"
            className={styles.robotImg}
          />
        </div>
      </section>

      <main className={styles.main}>
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Carregando clima...</p>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
            <button
              onClick={() => fetchWeather()}
              className={styles.retryBtn}
            >
              Tentar novamente
            </button>
          </div>
        )}

        {weather && weather.current && weather.forecast?.forecastday && (
          <>
            <CurrentWeather weather={weather} />
            <HourlyForecast
              data={weather.forecast.forecastday[0].hour}
            />
            <WeeklyForecast
              data={weather.forecast.forecastday}
            />
          </>
        )}
      </main>
    </div>
  );
}