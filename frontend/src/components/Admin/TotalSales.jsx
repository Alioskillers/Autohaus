import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';

const TotalSales = () => {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth < 768) {
      navigate('/forbidden');
    }
  }, [navigate]);

  useEffect(() => {
    axios.get('/admin/orders/total-sales').then(res => setTotal(res.data.total));
  }, []);

  return (
    <div>
      <h3>Total Sales</h3>
      <p>${(total || 0).toLocaleString()}</p>
    </div>
  );
};

export default TotalSales;