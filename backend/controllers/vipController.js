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