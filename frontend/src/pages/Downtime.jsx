import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../api/axiosConfig';

const Downtime = () => {
  const location = useLocation();
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    const getEndTime = async () => {
      try {
        if (location.state?.endTime) {
          return new Date(location.state.endTime);
        }
        const res = await axios.get('/downtime/current');
        if (res.data.active && res.data.endsAt) {
          return new Date(res.data.endsAt);
        }
      } catch (error) {
        console.error('Failed to fetch downtime info:', error);
      }
      return null;
    };

    const startCountdown = async () => {
      const endTime = await getEndTime();
      if (!endTime) return;

      const updateTimer = () => {
        const now = new Date();
        const diff = endTime - now;
        if (diff <= 0) {
          setRemaining('Downtime ended');
          return;
        }
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setRemaining(`${minutes}m ${seconds}s`);
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    };

    startCountdown();
  }, [location.state]);

  // Disable all button interactions by adding a class to the body on mount
  useEffect(() => {
    document.body.classList.add('downtime-disable-buttons');
    return () => {
      document.body.classList.remove('downtime-disable-buttons');
    };
  }, []);

  return (
    <div className="downtime-mode">
      <div style={styles.wrapper}>
        <h1 style={styles.title}>🚧 Autohaus is currently down for maintenance</h1>
        <h2 style={styles.timer}>Remaining Time: {remaining || 'Loading...'}</h2>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    height: '100vh',
    backgroundColor: '#f7f9fb',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  timer: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    marginTop: '2rem',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Downtime;