import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppointmentFormPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    VIN: '',
    date: '',
    repairType: ''
  });
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const generateNext7Days = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/service-center/book-appointment', {
        VIN: form.VIN.toUpperCase(),
        date: form.date,
        repairType: form.repairType
      });
      setMessage('Appointment booked successfully!');
      setStatus('success');
      setTimeout(() => navigate('/service-center'), 1500);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to book appointment');
      setStatus('error');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Book an Appointment</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Car VIN:</label>
          <input
            type="text"
            required
            value={form.VIN}
            onChange={(e) => setForm({ ...form, VIN: e.target.value.toUpperCase() })}
            placeholder="Enter VIN"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Date:</label>
          <select
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            style={styles.input}
          >
            <option value="">Select a date</option>
            {generateNext7Days().map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Repair Type:</label>
          <select
            required
            value={form.repairType}
            onChange={(e) => setForm({ ...form, repairType: e.target.value })}
            style={styles.input}
          >
            <option value="">Select a type</option>
            <option value="technical">Technical</option>
            <option value="non-technical">Non-Technical</option>
            <option value="routine-servicing">Routine Servicing</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>
          Book Appointment
        </button>

        {message && (
          <p style={{ ...styles.message, color: status === 'success' ? 'green' : 'red' }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

const styles = {
  container: {
  padding: '4rem 2rem',           // Increased top and bottom padding
  maxWidth: '600px',
  margin: '4rem auto 0 auto',     // Push down from top
  fontFamily: 'Segoe UI, sans-serif',
  background: '#fff',
  borderRadius: '10px',
  boxShadow: '0 0 15px rgba(0,0,0,0.1)'
},
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: '600'
  },
  input: {
    padding: '0.6rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  message: {
    marginTop: '1rem',
    fontWeight: 'bold',
    textAlign: 'center'
  }
};

export default AppointmentFormPage;