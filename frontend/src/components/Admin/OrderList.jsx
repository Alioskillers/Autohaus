import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch paginated orders on page change
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`/admin/orders?page=${page}&limit=5`);
        setOrders(res.data.orders);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, [page]);

  // Pagination controls
  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Paginated Orders</h2>
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Car</th>
            <th>Price</th>
            <th>User Email</th>
            <th>Phone</th>
            <th>Receipt</th>
            <th>Type</th>
            <th>Period</th>
            <th>Created</th>
            <th>Delivery</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.car}</td>
                <td>{order.price}</td>
                <td>{order.userEmail}</td>
                <td>{order.phone}</td>
                <td>{order.receipt}</td>
                <td>{order.type}</td>
                <td>{order.period || '-'}</td>
                <td>{order.createdAt}</td>
                <td>{order.deliveryDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" align="center">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button onClick={prevPage} disabled={page === 1}>Previous</button>
        <span style={{ margin: '0 1rem' }}>Page {page} of {totalPages}</span>
        <button onClick={nextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default OrderList;