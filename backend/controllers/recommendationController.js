const Order = require('../models/Order');
const Car = require('../models/Car');

exports.getRecommendations = async (req, res) => {
  try {
    const userOrders = await Order.find({ user: req.user.id }).populate('car');
    const preferredMakes = userOrders.map(order => order.car.make);

    const recommendedCars = await Car.find({
      make: { $in: preferredMakes },
    });

    res.json(recommendedCars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};