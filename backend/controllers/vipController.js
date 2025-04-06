const VipCar = require('../models/VipCar');
const AuditLog = require('../models/AuditLog');

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

exports.updateVipCarStock = async (req, res) => {
  try {
    const { stock } = req.body;

    if (stock === undefined || isNaN(stock) || stock < 0) {
      return res.status(400).json({ message: 'Stock must be a non-negative number' });
    }

    const vipCar = await VipCar.findById(req.params.id);
    if (!vipCar) {
      return res.status(404).json({ message: 'VIP Car not found' });
    }

    const oldStock = vipCar.stock || 0;
    const newStock = oldStock + Number(stock);
    vipCar.stock = newStock;

    const updated = await vipCar.save();

    await AuditLog.create({
      userEmail: req.user?.email || 'Unknown',
      carId: updated._id,
      updates: { addedStock: stock, newStock }
    });

    res.json({ message: 'VIP Car stock updated successfully', car: updated });
  } catch (err) {
    console.error('Error updating VIP car stock:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};