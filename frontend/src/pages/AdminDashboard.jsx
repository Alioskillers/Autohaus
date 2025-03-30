import React from 'react';
import OrderList from '../components/Admin/OrderList';
import OrderSearch from '../components/Admin/OrderSearch';
import SalesChart from '../components/Admin/SalesChart';
import TotalSales from '../components/Admin/TotalSales';
import AuditLogViewer from '../components/Admin/AuditLogViewer';

const AdminDashboard = () => {
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <OrderSearch />
      <TotalSales />
      <SalesChart />
      <OrderList />
      <AuditLogViewer />
    </div>
  );
};

export default AdminDashboard;