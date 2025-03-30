const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:", "https://img-ik.cars.co.za"],
        scriptSrc: ["'self'", "https:"],
        styleSrc: ["'self'", "https:", "'unsafe-inline'"],
      },
    })
  );
app.use(cors());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/recommendations', require('./routes/recommendationRoutes'));
app.use('/api/admin/orders', require('./routes/adminOrderRoutes'));
app.use('/api/admin/audit-logs', require('./routes/auditLogRoutes'));
app.use('/api/admin/users', require('./routes/adminUserRoutes'));
app.use('/api/basket', require('./routes/basketRoutes'));
app.use('/api/installments', require('./routes/installmentRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

// ✅ Serve frontend static build
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// ❌ 404 fallback (optional, React handles it)
app.use((req, res) => res.status(404).json({ message: 'Page not found' }));

// Start server
const PORT = process.env.PORT || 5030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));