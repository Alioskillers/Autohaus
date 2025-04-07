const axios = require('axios');
const Order = require('../models/Order');
const Car = require('../models/Car');
const VipCar = require('../models/VipCar');

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ message: 'Missing user ID for recommendation' });
    }

    const response = await axios.post('http://localhost:5001/recommend', {
      userId: userId.toString()
    });

    return res.json(response.data);
  } catch (err) {
    console.error('🔥 Recommendation Error:', err.message);
    return res.status(500).json({ message: 'Failed to fetch recommendations' });
  }
};