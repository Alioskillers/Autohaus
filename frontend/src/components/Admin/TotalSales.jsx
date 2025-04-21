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
    axios.get('/admin/orders/total-sales').then(res => setTotal(res.data.totalSalesValue));
  }, []);

  return (
    <div>
      <h3>Grand Total:</h3>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontWeight: 'bold', fontSize: '1.8rem' }}>
          {(total || 0).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
        </p>
      </div>
    </div>
  );
};

export default TotalSales;