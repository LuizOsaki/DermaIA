// src/pages/AlertaClimatico/hooks/useWeather.js

import { useState, useEffect } from 'react';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWeather = async (city = 'São Paulo') => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `http://localhost:5000/api/weather?city=${encodeURIComponent(city)}`
      );

      if (!res.ok) throw new Error('Cidade não encontrada');
      const data = await res.json();

      setWeather({
        current: {
          ...data.current,
          mintemp_c: data.forecast.forecastday[0].day.mintemp_c,
          maxtemp_c: data.forecast.forecastday[0].day.maxtemp_c,
        },
        hourly: data.forecast.forecastday[0].hour,
        weekly: data.forecast.forecastday,
        location: data.location,
      });
    } catch (err) {
      setError('Erro ao carregar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return { weather, loading, error, searchCity: fetchWeather };
};
