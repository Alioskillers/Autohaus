import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const SalesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/admin/orders/sales-chart').then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h3>Sales Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;