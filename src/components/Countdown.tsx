import { useState, useEffect } from 'react';
import { MdClose, MdPlayArrow, MdCheckCircle } from 'react-icons/md';

import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.05 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button
          disabled
          type="button"
          className={styles.countdownButton}
        >
          Ciclo encerrado 
          <MdCheckCircle className={styles.icon} color="#4CD62B" fontSize={20} />
        </button>
      ) : (
          <>
            {isActive ? (<button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
              <MdClose className={styles.icon} fontSize={24} />
            </button>) : (<button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar ciclo
              <MdPlayArrow className={styles.icon} fontSize={24} />
            </button>)}
          </>
        )}
    </div>
  );
}
