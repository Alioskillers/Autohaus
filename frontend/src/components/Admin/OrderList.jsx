import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (window.innerWidth < 768) {
      navigate('/forbidden');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`/admin/orders?page=${currentPage}&limit=5`);
        setOrders(res.data.orders || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, [currentPage]);

  return (
    <div>
      <h3 style={styles.title}>📦 Paginated Orders</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
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
            {orders.map((order) => (
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
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.pagination}>
  <button
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    style={{
      ...styles.paginationButton,
      ...(currentPage === 1 ? styles.paginationButtonDisabled : {})
    }}
  >
    Previous
  </button>
  <span style={styles.paginationText}>
    Page {currentPage} of {totalPages}
  </span>
  <button
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    style={{
      ...styles.paginationButton,
      ...(currentPage === totalPages ? styles.paginationButtonDisabled : {})
    }}
  >
    Next
  </button>
</div>
      </div>
  );
};

const styles = {
  title: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    fontWeight: '600'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95rem',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    backgroundColor: '#fff'
  },
  rowEven: {
    backgroundColor: '#f9f9f9'
  },
  rowOdd: {
    backgroundColor: '#ffffff'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid #ccc'
  },
  paginationButton: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  paginationButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  paginationText: {
    fontSize: '1rem',
    fontWeight: 500,
    color: '#333'
  }
};

export default OrderList;