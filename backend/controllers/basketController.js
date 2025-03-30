const Basket = require('../models/Basket');
const Car = require('../models/Car');

// Get basket
exports.getBasket = async (req, res) => {
  const basket = await Basket.findOne({ user: req.user._id }).populate('items.car');
  res.json(basket || { items: [] });
};

// Add to basket
exports.addToBasket = async (req, res) => {
  const { carId, quantity } = req.body;
  let basket = await Basket.findOne({ user: req.user._id });

  if (!basket) basket = new Basket({ user: req.user._id, items: [] });

  const itemIndex = basket.items.findIndex(item => item.car.toString() === carId);
  if (itemIndex > -1) {
    basket.items[itemIndex].quantity += quantity;
  } else {
    basket.items.push({ car: carId, quantity });
  }

  await basket.save();
  res.status(200).json(basket);
};

// Update quantity
exports.updateQuantity = async (req, res) => {
  const { carId, quantity } = req.body;
  const basket = await Basket.findOne({ user: req.user._id });
  if (!basket) return res.status(404).json({ message: 'Basket not found' });

  const item = basket.items.find(item => item.car.toString() === carId);
  if (item) item.quantity = quantity;

  await basket.save();
  res.status(200).json(basket);
};

// Remove from basket
exports.removeFromBasket = async (req, res) => {
  const { carId } = req.body;
  const basket = await Basket.findOne({ user: req.user._id });
  if (!basket) return res.status(404).json({ message: 'Basket not found' });

  basket.items = basket.items.filter(item => item.car.toString() !== carId);
  await basket.save();
  res.status(200).json(basket);
};

// Clear basket
exports.clearBasket = async (req, res) => {
  await Basket.findOneAndDelete({ user: req.user._id });
  res.status(200).json({ message: 'Basket cleared' });
};

exports.saveBasketToDB = async (req, res) => {
  try {
    const { items } = req.body;

    const basket = await Basket.findOneAndUpdate(
      { user: req.user._id },
      { items },
      { upsert: true, new: true }
    );

    res.json(basket);
  } catch (err) {
    console.error('Save basket error:', err);
    res.status(500).json({ message: 'Failed to save basket' });
  }
};