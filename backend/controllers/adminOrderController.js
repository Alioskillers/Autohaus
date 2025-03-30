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
        installmentPlan: order.installmentPlan || null
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchOrders = async (req, res) => {
  try {
    const { email, phone, receipt, date } = req.query;
    const query = {};

    if (email) {
      const user = await User.findOne({ email });
      if (user) query.user = user._id;
    }

    if (phone) {
      const user = await User.findOne({ phone });
      if (user) query.user = user._id;
    }

    if (receipt) {
      query.receiptNumber = { $regex: `^${receipt}$`, $options: 'i' };
    }

    if (date) {
      const dayStart = new Date(date);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);
      query.createdAt = { $gte: dayStart, $lte: dayEnd };
    }

    const orders = await Order.find(query)
      .populate('user', 'email phone')
      .populate('car', 'make model price');

    res.json(orders.map(order => ({
      id: order._id,
      user: order.user,
      car: order.car,
      receipt: order.receiptNumber,
      type: order.type,
      period: order.period,
      totalAmount: order.totalAmount,
      createdAt: formatDate(order.createdAt),
      deliveryDate: formatDate(order.deliveryDate),
      buyer: order.buyer,
      installmentPlan: order.installmentPlan || null
    })));
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
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

exports.getSalesChart = async (req, res) => {
  try {
    const chart = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          total: { $sum: "$totalAmount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(chart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};