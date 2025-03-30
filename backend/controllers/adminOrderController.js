const Order = require('../models/Order');
const User = require('../models/User');
const Car = require('../models/Car');
const { formatDate, formatCurrency } = require('../utils/formatUtils');

// View all orders with pagination and formatting
exports.getAllOrders = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const totalOrders = await Order.countDocuments();
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user car');

    res.json({
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
      orders: orders.map(order => ({
        id: order._id,
        car: `${order.car.make} ${order.car.model}`,
        price: formatCurrency(order.car.price),
        userEmail: order.user.email,
        phone: order.user.phone,
        receipt: order.receiptNumber,
        type: order.type,
        period: order.period,
        createdAt: formatDate(order.createdAt),
        deliveryDate: formatDate(order.deliveryDate),
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search orders by receipt number, date, email, or phone
exports.searchOrders = async (req, res) => {
  const { email, phone, receipt, date } = req.query;

  try {
    let query = {};

    if (receipt) query.receiptNumber = receipt;

    if (date) {
      const dayStart = new Date(date);
      const dayEnd = new Date(date);
      dayEnd.setDate(dayEnd.getDate() + 1);
      query.createdAt = { $gte: dayStart, $lt: dayEnd };
    }

    if (email || phone) {
      const userQuery = {};
      if (email) userQuery.email = email;
      if (phone) userQuery.phone = phone;
      const users = await User.find(userQuery).select('_id');
      query.user = { $in: users.map(u => u._id) };
    }

    const orders = await Order.find(query).populate('user car');

    res.json(orders.map(order => ({
      id: order._id,
      car: `${order.car.make} ${order.car.model}`,
      price: formatCurrency(order.car.price),
      userEmail: order.user.email,
      phone: order.user.phone,
      receipt: order.receiptNumber,
      type: order.type,
      period: order.period,
      createdAt: formatDate(order.createdAt),
      deliveryDate: formatDate(order.deliveryDate),
    })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get total revenue
exports.getTotalSales = async (req, res) => {
  try {
    const orders = await Order.find().populate('car');
    const total = orders.reduce((sum, order) => sum + (order.car.price || 0), 0);
    res.json({ totalSalesValue: formatCurrency(total) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get daily order statistics for charting
exports.getOrderStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    const formattedStats = stats.map(s => ({
      date: `${s._id.year}-${String(s._id.month).padStart(2, '0')}-${String(s._id.day).padStart(2, '0')}`,
      count: s.count
    }));

    res.json(formattedStats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};