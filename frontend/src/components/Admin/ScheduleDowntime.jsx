import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import Spinner from '../../components/Spinner';

const ScheduleDowntime = () => {
  const [startTime, setStartTime] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth < 768) {
      navigate('/forbidden');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/downtime/create', {
        startTime,
        durationMinutes,
        reason,
      });
      setSuccess(true);
      setTimeout(() => navigate('/admin'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to schedule downtime');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      {loading && <Spinner />}
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Schedule Server Downtime</h1>
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>Downtime scheduled successfully!</p>}
          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Start Date & Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>Duration (in minutes)</label>
            <input
              type="number"
              min="1"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              rows={3}
              style={styles.textarea}
            />

            <button type="submit" style={styles.button}>Schedule Downtime</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Helvetica Neue, sans-serif',
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.7rem',
    marginBottom: '1.5rem',
    fontWeight: 'bold',
  },
  label: {
    display: 'block',
    textAlign: 'left',
    marginBottom: '0.3rem',
    fontWeight: '500',
    marginTop: '1rem',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
  },
  textarea: {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    resize: 'vertical',
    marginTop: '0.5rem',
  },
  button: {
    marginTop: '2rem',
    padding: '0.9rem',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
  success: {
    color: 'green',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
};

export default ScheduleDowntime;