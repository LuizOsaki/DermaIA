import styles from './UVReminder.module.css';

const getAdvice = (uv) => {
  if (uv < 3) return { level: 'Baixo', color: '#00ff9d', msg: 'Protetor opcional', spf: '15+' };
  if (uv < 6) return { level: 'Moderado', color: '#ffd000', msg: 'Use FPS 30+ e óculos', spf: '30+' };
  if (uv < 8) return { level: 'Alto', color: '#ff8800', msg: 'FPS 50+ obrigatório', spf: '50+' };
  if (uv < 11) return { level: 'Muito Alto', color: '#ff4444', msg: 'Evite sol 10h–16h', spf: '50+ (reaplicar)' };
  return { level: 'Extremo', color: '#ff0066', msg: 'Fique na sombra!', spf: 'Máxima proteção' };
};

export default function UVReminder({ uv }) {
  const { level, color, msg, spf } = getAdvice(uv || 0);

  return (
    <div className={styles.card} style={{ borderColor: color }}>
      <div className={styles.header}>
        <span>índice UV</span>
        <span style={{ color }}>{uv || '-'} • {level}</span>
      </div>
      <p className={styles.msg}>{msg}</p>
      <p className={styles.spf}>Recomendado: <strong>{spf}</strong></p>
    </div>
  );
}