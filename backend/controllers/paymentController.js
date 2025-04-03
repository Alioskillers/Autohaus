const Order = require('../models/Order');
const Car = require('../models/Car');
const VipCar = require('../models/VipCar');

const generateReceipt = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let receipt = '';
  for (let i = 0; i < 8; i++) {
    receipt += chars[Math.floor(Math.random() * chars.length)];
  }
  return receipt;
};

const processCardPayment = async (req, res) => {
  try {
    const { basket, buyer } = req.body;
    const orders = [];

    if (!basket || !Array.isArray(basket) || !buyer) {
      return res.status(400).json({ message: 'Missing basket or buyer info' });
    }

    for (const item of basket) {
      let car = await Car.findById(item.carId);
      let carModelType = 'Car';

      if (!car) {
      car = await VipCar.findById(item.carId);
      carModelType = 'VipCar';
      }

      if (!car) {
      return res.status(404).json({ message: `Car with ID ${item.carId} not found` });
      }

      if (car.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${car.make} ${car.model}. Available stock: ${car.stock}`
        });
      }

      car.stock -= item.quantity;
      await car.save();

      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3);

      const receiptNumber = generateReceipt();

      const order = new Order({
        user: req.user._id,
        car: car._id,
        carModelType,
        type: 'purchase',
        quantity: item.quantity,
        receiptNumber,
        deliveryDate,
        totalAmount: item.quantity * car.price,
        buyer,
      });

      await order.save();
      orders.push({ receiptNumber, deliveryDate });
    }

    res.status(201).json({
      message: 'Card payment successful',
      receipt: orders[0]?.receiptNumber,
      deliveryDate: orders[0]?.deliveryDate
    });
  } catch (err) {
    console.error('Card payment error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const processInstallmentPayment = async (req, res) => {
  try {
    const { buyer, totalAmount, period, frequency, carId } = req.body;

    if (!buyer || !totalAmount || !period || !frequency || !carId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let car = await Car.findById(carId);
    let carModelType = 'Car';

    if (!car) {
      car = await VipCar.findById(carId);
      carModelType = 'VipCar';
    }

    if (!car) {
      return res.status(404).json({ message: `Car with ID ${carId} not found` });
    }

    if (car.stock <= 0) {
      return res.status(400).json({ message: 'This car is out of stock' });
    }

    car.stock -= 1;
    await car.save();

    const receipt = generateReceipt();

    const order = new Order({
      user: req.user._id,
      car: car._id,
      carModelType,
      type: 'installment',
      receiptNumber: receipt,
      deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      buyer,
      totalAmount,
      period,
      frequency,
      installmentPlan: {
        schedule: []
      }
    });

    await order.save();

    res.status(201).json({
      message: 'Installment payment successful',
      receipt,
      deliveryDate: order.deliveryDate
    });
  } catch (err) {
    console.error('Installment payment error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

    module.exports = {
      processCardPayment,
      processInstallmentPayment
    };