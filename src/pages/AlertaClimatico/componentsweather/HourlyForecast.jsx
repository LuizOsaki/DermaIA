import { format } from 'date-fns';
import styles from './HourlyForecast.module.css';


// HourlyForecast.jsx
export default function HourlyForecast({ data }) {
  return (
    <div style={{ position: 'relative', margin: '2rem 0' }}>
      <div className={styles.container}>
        {data.slice(0, 24).map((hour) => (
          <div key={hour.time} className={styles.card}>
            <div className={styles.time}>
              {format(new Date(hour.time), 'HH:mm')}
            </div>
            <img src={hour.condition.icon} alt="" className={styles.icon} />
            <div className={styles.temp}>{Math.round(hour.temp_c)}°</div>
            <div className={styles.rain}>Chuva {hour.chance_of_rain}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}