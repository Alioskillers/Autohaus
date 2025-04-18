const VipCar = require('../models/VipCar');
const AuditLog = require('../models/AuditLog');
const uploadFromUrl = require('../utils/uploadFromUrl');


exports.getVipCars = async (req, res) => {
  try {
      const cars = await VipCar.find();
  
      const carsWithImageUrls = cars.map(car => {
        return {
          ...car.toObject(),
          imageUrl: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${car._id}.jpg`
        };
      });
  
      res.json(carsWithImageUrls);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.getVipCarById = async (req, res) => {
  try {
    const car = await VipCar.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    const region = process.env.AWS_REGION;
    const bucket = process.env.S3_BUCKET_NAME;

    const carWithImage = {
      ...car._doc,
      imageUrl: `https://${bucket}.s3.${region}.amazonaws.com/${car._id}.jpg`,
    };

    res.json(carWithImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addVipCar = async (req, res) => {
  let { make, model, color, price, topSpeed, stock, image } = req.body;

  if (!make || !model || !color || !price || !topSpeed || !stock || !image) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newCar = new VipCar({
      make,
      model,
      color,
      price,
      topSpeed,
      stock,
    });

    await newCar.save();
    await uploadFromUrl(image, `${newCar._id}.jpg`);

    res.status(201).json({
      message: 'Car added successfully',
      car: newCar,
      imageUrl: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${newCar._id}.jpg`
    });

  } catch (err) {
    console.error('Error while adding car:', err);
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