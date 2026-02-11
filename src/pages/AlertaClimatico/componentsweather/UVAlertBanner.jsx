import styles from './UVAlertBanner.module.css';

export default function UVAlertBanner({ uv }) {
  const level = uv >= 11 ? 'EXTREMO' : uv >= 8 ? 'MUITO ALTO' : 'ALTO';
  const color = uv >= 11 ? '#ff0066' : uv >= 8 ? '#ff4444' : '#ff8800';

  return (
    <div className={styles.banner} style={{ background: color }}>
      <strong>ALERTA UV {level}</strong> — Evite exposição entre 10h–16h • Use FPS 50+ • Chapéu e óculos
      <span className={styles.robot}>DermaIA recomenda proteção máxima!</span>
    </div>
  );
}