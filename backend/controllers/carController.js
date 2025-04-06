const Car = require('../models/Car');
const AuditLog = require('../models/AuditLog');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addCar = async (req, res) => {
  const { make, model, color, price, topSpeed, stock, image } = req.body;

  if (!make || !model || !color || !price || !topSpeed || !stock || !image) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newCar = new Car({
      make,
      model,
      color,
      price,
      topSpeed,
      stock,
      image,
    });

    await newCar.save();
    res.status(201).json({ message: 'Car added successfully', car: newCar });
  } catch (err) {
    console.error('Error while adding car:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCarStockOrPrice = async (req, res) => {
  try {
    const { stock, isVip } = req.body;

    if (stock === undefined || isNaN(stock) || stock < 0) {
      return res.status(400).json({ message: 'Stock must be a non-negative number' });
    }

    const Model = isVip ? require('../models/VipCar') : require('../models/Car');
    const car = await Model.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const oldStock = car.stock || 0;
    const newStock = oldStock + Number(stock);

    car.stock = newStock;
    const updated = await car.save();

    await AuditLog.create({
      userEmail: req.user?.email || 'Unknown',
      carId: updated._id,
      updates: { addedStock: stock, newStock, isVip: !!isVip }
    });

    res.json({ message: 'Stock updated successfully', car: updated });
  } catch (err) {
    console.error('Error updating stock:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateCarPrice = async (req, res) => {
  const { username, password, role, make, model, price } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user || user.role !== role || user.role !== 'Workers-Admin') {
      return res.status(403).json({ message: 'Access denied: Workers-Admin only' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!price || isNaN(price) || price < 1000 || price > 1000000) {
      return res.status(400).json({ message: 'Price must be between 1,000 and 1,000,000' });
    }

    const car = await Car.findOne({ make, model });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    car.price = price;
    await car.save();

    return res.status(200).json({ message: 'Car price updated successfully', car });
  } catch (err) {
    console.error('Error updating price:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};