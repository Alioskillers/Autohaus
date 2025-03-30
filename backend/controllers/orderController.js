const Order = require('../models/Order');
const Car = require('../models/Car');

const generateReceiptNumber = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let receipt = '';
  for (let i = 0; i < 4; i++) receipt += letters[Math.floor(Math.random() * 26)];
  for (let i = 0; i < 4; i++) receipt += numbers[Math.floor(Math.random() * 10)];
  return receipt;
};

exports.placeOrder = async (req, res) => {
  const { carId, type, period } = req.body;

  try {
    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3); // e.g., delivery after 3 days

    const receiptNumber = generateReceiptNumber();

    const order = new Order({
      user: req.user.id,
      car: carId,
      type,
      period: type === 'rent' ? period : undefined,
      receiptNumber,
      deliveryDate,
    });

    await order.save();
    res.status(201).json({
      message: 'Order placed successfully',
      receiptNumber,
      deliveryDate,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('car');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};