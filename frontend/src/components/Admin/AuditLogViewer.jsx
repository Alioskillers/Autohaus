import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';

const AuditLogViewer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.innerWidth < 768) {
      navigate('/forbidden');
    }
  }, [navigate]);

  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filters, setFilters] = useState({ email: '', model: '' });

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get('/admin/audit-logs');
      setLogs(res.data);
      setFilteredLogs(res.data);
    } catch (err) {
      console.error('Error fetching audit logs:', err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    const lowerEmail = newFilters.email.toLowerCase();
    const lowerModel = newFilters.model.toLowerCase();

    const filtered = logs.filter((log) => {
      const matchesEmail = log.userEmail.toLowerCase().includes(lowerEmail);
      const matchesModel = log.carId?.model?.toLowerCase().includes(lowerModel);
      return matchesEmail && matchesModel;
    });

    setFilteredLogs(filtered);
  };

  return (
    <div className="container">
      <h2>Audit Log Viewer</h2>

      <div style={{ marginBottom: '1rem' }}>
  <input
    type="email"
    name="email"
    placeholder="Filter by user email"
    value={filters.email}
    onChange={handleFilterChange}
    style={{
      padding: '0.6rem 1rem',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      width: '100%',
      maxWidth: '300px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}
  />
        <input
  type="text"
  name="model"
  placeholder="Filter by car model"
  value={filters.model}
  onChange={handleFilterChange}
  style={{
    marginLeft: '1rem',
    padding: '0.6rem 1rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '250px',
    maxWidth: '100%',
    backgroundColor: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    transition: 'border-color 0.2s ease-in-out'
  }}
/>
      </div>

      <table>
        <thead>
          <tr>
            <th>User Email</th>
            <th>Car</th>
            <th>Updates</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log) => (
            <tr key={log._id}>
              <td>{log.userEmail}</td>
              <td>{log.carId ? `${log.carId.make} ${log.carId.model}` : '—'}</td>
              <td>
                <pre style={{ fontSize: '0.85rem' }}>
                  {JSON.stringify(log.updates, null, 2)}
                </pre>
              </td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogViewer;