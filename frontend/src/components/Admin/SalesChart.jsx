import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const SalesChart = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth < 768) {
      navigate('/forbidden');
    }
  }, [navigate]);

  useEffect(() => {
    axios.get('/admin/orders/sales-chart').then(res => setData(res.data));
  }, []);

  return (
    <div className="no-global-reset">
      <h3>Sales Over Time</h3>
      <ResponsiveContainer width="105%" height={300} className="no-global-reset">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis width={90} tickFormatter={(value) => `$${value.toLocaleString()}`} />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;