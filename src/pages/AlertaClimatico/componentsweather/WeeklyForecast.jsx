import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './WeeklyForecast.module.css';

export default function WeeklyForecast({ data }) {
  return (
    <div className={styles.container}>
      {data.map((day) => (
        <div key={day.date} className={styles.row}>
          <div className={styles.day}>{format(parseISO(day.date), 'EEE', { locale: ptBR })}</div>
          <div className={styles.rain}>Chuva {day.day.daily_chance_of_rain}%</div>
          <div className={styles.condition}>
            <img src={day.day.condition.icon} alt="" />
            <span>{day.day.condition.text}</span>
          </div>
          <div className={styles.temp}>
            {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
          </div>
        </div>
      ))}
    </div>
  );
}