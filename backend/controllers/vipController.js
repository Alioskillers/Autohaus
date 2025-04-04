const VipCar = require('../models/VipCar');

exports.getVipCars = async (req, res) => {
  try {
    const cars = await VipCar.find({});
    return res.status(200).json(cars);
  } catch (error) {
    console.error('Error fetching VIP cars:', error);
    return res.status(500).json({ message: 'Server error fetching VIP cars' });
  }
};

exports.getVipCarById = async (req, res) => {
  try {
    const car = await VipCar.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addVipCar = async (req, res) => {
  const { make, model, color, price, topSpeed, stock, image } = req.body;

  if (!make || !model || !color || !price || !topSpeed || !stock || !image) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newVipCar = new VipCar({
      make,
      model,
      color,
      price,
      topSpeed,
      stock,
      image,
    });

    await newVipCar.save();
    res.status(201).json({ message: 'VIP Car added successfully', car: newVipCar });
  } catch (err) {
    console.error('Error adding VIP car:', err);
    res.status(500).json({ message: 'Server error' });
  }
};