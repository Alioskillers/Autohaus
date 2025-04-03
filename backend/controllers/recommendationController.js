const Order = require('../models/Order');
const Car = require('../models/Car');
const VipCar = require('../models/VipCar');

exports.getRecommendations = async (req, res) => {
  try {
    const userOrders = await Order.find({ user: req.user.id }).populate('car');

    const preferredMakes = [...new Set(userOrders.map(order => order.car?.make).filter(Boolean))];

    if (preferredMakes.length === 0) {
      return res.json([]);
    }

    const [regularCars, vipCars] = await Promise.all([
      Car.find({ make: { $in: preferredMakes } }),
      VipCar.find({ make: { $in: preferredMakes } })
    ]);

    const recommendedCars = [...regularCars, ...vipCars];

    res.json(recommendedCars);
  } catch (err) {
    console.error('Recommendation error:', err);
    res.status(500).json({ message: err.message });
  }
};