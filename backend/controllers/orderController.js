const Order = require('../models/Order');
const Car = require('../models/Car');
const VipCar = require('../models/VipCar');

const generateReceiptNumber = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let receipt = '';
  for (let i = 0; i < 8; i++) {
    receipt += chars[Math.floor(Math.random() * chars.length)];
  }
  return receipt;
};

exports.placePurchaseOrder = async (req, res) => {
  try {
    const { carId, buyer, installmentPlan } = req.body;
    if (!carId || !buyer) {
      return res.status(400).json({ message: 'Missing carId or buyer info' });
    }

    let car = await Car.findById(carId);
    let carModelType = 'Car';

    if (!car) {
      car = await VipCar.findById(carId);
      carModelType = 'VipCar';
    }
    if (!car) return res.status(404).json({ message: 'Car not found' });

    const receiptNumber = generateReceiptNumber();
    const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    const order = new Order({
      user: req.user._id,
      car: car._id,
      type: 'purchase',
      receiptNumber,
      deliveryDate,
      totalAmount: car.price,
      buyer,
      installmentPlan: installmentPlan || undefined
    });

    await order.save();
    res.status(201).json({ receiptNumber, deliveryDate });
  } catch (err) {
    console.error('Purchase order error:', err);
    res.status(500).json({ message: 'Server error while placing purchase order' });
  }
};

exports.placeRentalOrder = async (req, res) => {
  try {
    const { carId, period, buyer, installmentPlan } = req.body;
    if (!carId || !period || !buyer) {
      return res.status(400).json({ message: 'Missing carId, period or buyer' });
    }

    let car = await Car.findById(carId);
    let carModelType = 'Car';

    if (!car) {
      car = await VipCar.findById(carId);
      carModelType = 'VipCar';
    }
    if (!car) return res.status(404).json({ message: 'Car not found' });

    const receiptNumber = generateReceiptNumber();
    const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    const totalAmount = car.price * Number(period);

    const order = new Order({
      user: req.user._id,
      car: car._id,
      type: 'rent',
      period,
      receiptNumber,
      deliveryDate,
      totalAmount,
      buyer,
      installmentPlan: installmentPlan || undefined
    });

    await order.save();
    res.status(201).json({ receiptNumber, deliveryDate });
  } catch (err) {
    console.error('Rental order error:', err);
    res.status(500).json({ message: 'Server error while placing rental order' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('car');
    res.status(200).json(orders);
  } catch (err) {
    console.error('Fetching user orders failed:', err);
    res.status(500).json({ message: 'Failed to fetch user orders' });
  }
};