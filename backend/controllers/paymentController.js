const Order = require('../models/Order');
const Car = require('../models/Car');

const generateReceipt = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let receipt = '';
  for (let i = 0; i < 8; i++) {
    receipt += chars[Math.floor(Math.random() * chars.length)];
  }
  return receipt;
};

// ✅ Card Payment Logic
const processCardPayment = async (req, res) => {
  try {
    const { basket, buyer } = req.body;  // Basket can now include multiple cars
    const orders = [];

    // Ensure basket and buyer info are provided
    if (!basket || !Array.isArray(basket) || !buyer) {
      return res.status(400).json({ message: 'Missing basket or buyer info' });
    }

    // Process each car in the basket
    for (const item of basket) {
      const car = await Car.findById(item.carId);
      if (!car) return res.status(404).json({ message: `Car with ID ${item.carId} not found` });

      // Check if there is enough stock for the car
      if (car.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${car.make} ${car.model}. Available stock: ${car.stock}`
        });
      }

      // Deduct stock for this car
      car.stock -= item.quantity;
      await car.save();  // Save the updated car document

      // Create the order
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3);  // Add 3 days for delivery

      const receiptNumber = generateReceipt();

      const order = new Order({
        user: req.user._id,
        car: car._id,
        type: 'purchase',
        quantity: item.quantity,
        receiptNumber,
        deliveryDate,
        totalAmount: item.quantity * car.price,
        buyer,
      });

      await order.save();
      orders.push({ receiptNumber, deliveryDate });
    }

    // Respond with order details
    res.status(201).json({
      message: 'Card payment successful',
      receipt: orders[0]?.receiptNumber,  // send from first order
      deliveryDate: orders[0]?.deliveryDate
    });
  } catch (err) {
    console.error('Card payment error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Installment Payment Logic
const processInstallmentPayment = async (req, res) => {
    try {
      const { buyer, totalAmount, period, frequency, carId } = req.body;
  
      if (!buyer || !totalAmount || !period || !frequency || !carId) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const car = await Car.findById(carId);
      if (!car) return res.status(404).json({ message: 'Car not found' });
  
      const receipt = generateReceipt();
  
      const order = new Order({
        user: req.user._id,
        car: carId,
        type: 'installment',
        receiptNumber: receipt,
        deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        buyer,
        totalAmount,
        period,
        frequency,
        installmentPlan: {
          schedule: []
        }
      });
  
      await order.save();
  
      res.status(201).json({
        message: 'Installment payment successful',
        receipt,
        deliveryDate: order.deliveryDate
      });
    } catch (err) {
      console.error('Installment payment error:', err);
      res.status(500).json({ message: 'Server error' });
      } 
  };

    module.exports = {
      processCardPayment,
      processInstallmentPayment
    };