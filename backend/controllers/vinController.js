const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Order = require('../models/Order');
const Car = require('../models/Car');
const VipCar = require('../models/VipCar');

// 1. Worker Admin Verification
exports.verifyWorkerAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role !== 'Workers-Admin') {
      return res.status(403).json({ message: 'User is not authorized as Workers-Admin' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Verification successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Fetch Order Info by Receipt Number
exports.searchCarByReceipt = async (req, res) => {
  const { receiptNumber } = req.params;
  try {
    const order = await Order.findOne({ receiptNumber });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.VIN) {
      return res.status(400).json({ message: 'VIN already assigned in order' });
    }

    let car = null;
    if (order.carModelType === 'Car') {
      car = await Car.findById(order.car);
    } else if (order.carModelType === 'VipCar') {
      car = await VipCar.findById(order.car);
    }

    if (!car) return res.status(404).json({ message: 'Car not found' });

    res.json({
      make: car.make || 'N/A',
      model: car.model || 'N/A',
      color: car.color || 'N/A',
      price: typeof car.price === 'number' ? car.price : null,
      topSpeed: car.topSpeed || 'N/A',
      createdAt: order.createdAt ? order.createdAt.toISOString() : null,
      carModelType: order.carModelType,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Generate Unique VIN
exports.generateVinForCar = async (req, res) => {
  const { receiptNumber } = req.params;

  const generateVin = (isVip) => {
    const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ'; // Excluding I, O, Q
    const digits = '0123456789';
    const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
    const randomDigit = () => digits[Math.floor(Math.random() * digits.length)];

    let vin = isVip ? 'V' : 'N'; // VIP: V, Normal: N
    vin += randomLetter() + randomLetter();
    for (let i = 0; i < 6; i++) vin += Math.random() < 0.5 ? randomLetter() : randomDigit();
    vin += randomDigit();
    vin += 'S'; // Assuming 2025 model year
    vin += randomLetter(); // Plant code
    for (let i = 0; i < 6; i++) vin += randomDigit();

    return vin;
  };

  try {
    const order = await Order.findOne({ receiptNumber });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Check if VIN already assigned in order
    if (order.VIN) {
      return res.status(400).json({ message: 'VIN already assigned' });
    }

    const isVip = order.carModelType === 'VipCar';
    const CarModel = isVip ? VipCar : Car;

    const car = await CarModel.findById(order.car);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    // Check if VIN already assigned to car or order
    if (order.VIN) {
      return res.status(400).json({ message: 'VIN already assigned' });
    }

    let vin;
    let exists = true;

    while (exists) {
      vin = generateVin(isVip);
      const existingCar = await Car.findOne({ VIN: vin });
      const existingVipCar = await VipCar.findOne({ VIN: vin });
      exists = existingCar || existingVipCar;
    }

    car.VIN = vin;
    await car.save();

    order.VIN = vin;
    await order.save();

    res.json({ vin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};