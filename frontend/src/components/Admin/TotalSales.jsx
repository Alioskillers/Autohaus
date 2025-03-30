import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';

const TotalSales = () => {
  const [total, setTotal] = useState(0);

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