const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');


dotenv.config();
connectDB();

const app = express();
app.use(cookieParser());

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

app.use(session({
  secret: 'process.env.SESSION_SECRET',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));



app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/recommendations', require('./routes/recommendationRoutes'));
app.use('/api/admin/orders', require('./routes/adminOrderRoutes'));
app.use('/api/admin/audit-logs', require('./routes/auditLogRoutes'));
app.use('/api/admin/users', require('./routes/adminUserRoutes'));
app.use('/api/basket', require('./routes/basketRoutes'));
app.use('/api/installments', require('./routes/installmentRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/forgot-password', require('./routes/forgotPasswordRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api', require('./routes/adminRoutes'));
app.use('/api', require('./routes/vipAccess'));
app.use('/api/vip', require('./routes/vip'));
app.use('/api/vip/cars', require('./routes/vip'));
app.use('/api/global-admin', require('./routes/globalAdminRoutes'));
app.use('/api', require('./routes/managementRoutes'));
app.use('/api/worker', require('./routes/workerRoutes'));
app.use('/api/images', require('./routes/imageRoutes'));
app.use('/api/downtime', require('./routes/downtime'));

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.use((req, res) => res.status(404).json({ message: 'Page not found' }));

const PORT = process.env.PORT || 5030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));