// CurrentWeather.jsx
import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './CurrentWeather.module.css';
import UVReminder from './UVReminder';
import UVAlertBanner from './UVAlertBanner';

const WeatherParticles = ({ weatherCode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || weatherCode < 1063) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let particles = [];
    const createRain = () => ({ x: Math.random() * canvas.width, y: -20, speed: 12 + Math.random() * 10, len: 15 });
    const createSnow = () => ({ x: Math.random() * canvas.width, y: -10, size: 3 + Math.random() * 4, speed: 1.5 + Math.random(), sway: Math.random() * 2 });

    if (weatherCode >= 1063 && weatherCode < 1200) particles = Array.from({ length: 130 }, createRain);
    else if (weatherCode >= 1210) particles = Array.from({ length: 90 }, createSnow);
    else return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (weatherCode >= 1063 && weatherCode < 1200) {
        ctx.strokeStyle = 'rgba(174, 194, 224, 0.6)';
        ctx.lineWidth = 1.8;
        particles.forEach(p => {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + 6, p.y + p.len);
          ctx.stroke();
          p.y += p.speed;
          p.x += 3;
          if (p.y > canvas.height) p.y = -20;
        });
      } else if (weatherCode >= 1210) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          p.y += p.speed;
          p.x += Math.sin(p.y / 20) * p.sway;
          if (p.y > canvas.height) p.y = -10;
        });
      }
      requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animate);
  }, [weatherCode]);

  if (weatherCode < 1063 || weatherCode >= 1300) return null;
  return <canvas ref={canvasRef} className={styles.particles} />;
};


const useCardBackground = (weather, containerRef) => {
  useEffect(() => {
    if (!weather?.current || !containerRef.current) return;

    const current = weather.current;
    const code = current.condition.code;
    const isDay = current.is_day === 1;

    let gradient = 'linear-gradient(135deg, rgba(10, 29, 86, 0.7), rgba(26, 26, 58, 0.8))';

    if (code === 1000) {
      gradient = isDay
        ? 'linear-gradient(135deg, rgba(0, 198, 255, 0.3), rgba(0, 114, 255, 0.4))'
        : 'linear-gradient(135deg, rgba(15, 12, 41, 0.8), rgba(48, 43, 99, 0.8))';
    } else if ([1003, 1006, 1009].includes(code)) {
      gradient = 'linear-gradient(135deg, rgba(102, 126, 234, 0.4), rgba(118, 75, 162, 0.5))';
    } else if (code >= 1063 && code < 1200) {
      gradient = 'linear-gradient(135deg, rgba(35, 37, 38, 0.9), rgba(65, 67, 69, 0.9))';
    } else if (code >= 1210) {
      gradient = 'linear-gradient(135deg, rgba(230, 233, 240, 0.7), rgba(238, 241, 245, 0.8))';
    } else if (!isDay && current.temp_c > 20) {
      gradient = 'linear-gradient(135deg, rgba(250, 112, 154, 0.5), rgba(254, 225, 64, 0.5))';
    }

    containerRef.current.style.background = gradient;
    containerRef.current.style.backdropFilter = 'blur(12px)';
    containerRef.current.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    containerRef.current.style.transition = 'all 1.8s ease';
  }, [weather]);
};

export default function CurrentWeather({ weather }) {
  const containerRef = useRef(null);
  useCardBackground(weather, containerRef);

  if (!weather || !weather.current || !weather.forecast?.forecastday?.[0]) {
    return null;
  }

  const { current, location, forecast } = weather;
  const today = forecast.forecastday[0].day;
  const { temp_c, feelslike_c, condition, wind_kph, humidity, uv, is_day } = current;
  const name = location.name;
  const time = format(new Date(location.localtime), 'EEEE, HH:mm', { locale: ptBR });
  const maxtemp_c = today.maxtemp_c;
  const mintemp_c = today.mintemp_c;
  const weatherCode = condition.code;

  const getWindDesc = (kph) => kph < 10 ? 'Calmo' : kph < 25 ? 'Leve' : kph < 40 ? 'Moderado' : 'Forte';
  const getHumidityDesc = (h) => h < 40 ? 'Seco' : h < 70 ? 'Confortável' : 'Úmido';

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.left}>
        <div className={styles.particlesOverlay}>
          <WeatherParticles weatherCode={weatherCode} />
        </div>

        <div className={styles.info}>
          <h2 className={styles.city}>{name}</h2>
          <h1 className={styles.temp}>{Math.round(temp_c)}°</h1>
          <div className={styles.range}>↑{Math.round(maxtemp_c)}° ↓{Math.round(mintemp_c)}°</div>
          <p className={styles.feels}>Sensação {Math.round(feelslike_c)}°</p>
          <p className={styles.time}>{time}</p>
        </div>

        <div className={styles.condition}>
          <img src={condition.icon} alt={condition.text} className={styles.weatherIcon} />
          <h3>{condition.text}</h3>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.detail}>
          <span>Vento</span>
          <span>{wind_kph} km/h <small>{getWindDesc(wind_kph)}</small></span>
        </div>
        <div className={styles.detail}>
          <span>Umidade</span>
          <span>{humidity}% <small>{getHumidityDesc(humidity)}</small></span>
        </div>
        <UVReminder uv={uv} />
        {uv >= 6 && <UVAlertBanner uv={uv} />}
      </div>
    </div>
  );
}