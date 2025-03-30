const Car = require('../models/Car');
const AuditLog = require('../models/AuditLog');

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

exports.createCar = async (req, res) => {
  try {
    const { make, build, model, color, price, topSpeed, stock, image } = req.body;
    const newCar = new Car({ make, build, model, color, price, topSpeed, stock, image });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCarStockOrPrice = async (req, res) => {
    try {
      const { stock, price } = req.body;
  
      const updateFields = {};
      if (stock !== undefined) {
        if (isNaN(stock) || stock < 0) {
          return res.status(400).json({ message: 'Stock must be a non-negative number' });
        }
        updateFields.stock = stock;
      }
  
      if (price !== undefined) {
        if (isNaN(price) || price < 1000 || price > 1000000) {
          return res.status(400).json({ message: 'Price must be between 1,000 and 1,000,000' });
        }
        updateFields.price = price;
      }
  
      const updated = await Car.findByIdAndUpdate(
        req.params.id,
        { $set: updateFields },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      // ✅ Save audit log to DB
await AuditLog.create({
    userEmail: who,
    carId: updated._id,
    updates: updateFields
  });
  
  const fullCar = req.query.full === 'true';
      // ✅ Return cleaner response
      res.json({
        message: 'Car updated successfully',
        carId: updated._id,
        updatedFields: updateFields
        (fullCar && { car: updated })
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };