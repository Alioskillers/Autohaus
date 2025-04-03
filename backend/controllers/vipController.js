const VipCar = require('../models/VipCar'); // Ensure your VipCar model is defined correctly

// GET /vip/cars - Fetch all VIP cars
exports.getVipCars = async (req, res) => {
  try {
    const cars = await VipCar.find({});
    return res.status(200).json(cars);
  } catch (error) {
    console.error('Error fetching VIP cars:', error);
    return res.status(500).json({ message: 'Server error fetching VIP cars' });
  }
};