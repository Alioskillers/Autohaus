const Installment = require('../models/Installment');

exports.createInstallmentPlan = async (req, res) => {
  try {
    const { totalAmount, period, frequency } = req.body;
    if (!totalAmount || !period || !frequency) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let paymentsPerYear;
    switch (frequency) {
      case 'monthly':
        paymentsPerYear = 12;
        break;
      case 'quarterly':
        paymentsPerYear = 4;
        break;
      case 'semi-annually':
        paymentsPerYear = 2;
        break;
      case 'annually':
        paymentsPerYear = 1;
        break;
      default:
        return res.status(400).json({ message: 'Invalid frequency' });
    }

    const totalPayments = period * paymentsPerYear;
    const installmentAmount = totalAmount / totalPayments;;

    const installment = new Installment({
      user: req.user?._id || null,
      totalAmount,
      period,
      frequency,
      installmentAmount: installmentAmount.toFixed(2),
      totalPayments,
    });

    await installment.save();

    res.status(201).json(installment);
  } catch (err) {
    console.error('❌ Installment error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Optional testing route
exports.calculateInstallment = async (req, res) => {
    try {
      const { totalAmount, period, frequency } = req.body;
  
      if (!totalAmount || !period || !frequency) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      let paymentsPerYear;
      switch (frequency) {
        case 'monthly': paymentsPerYear = 12; break;
        case 'quarterly': paymentsPerYear = 4; break;
        case 'semi-annually': paymentsPerYear = 2; break;
        case 'annually': paymentsPerYear = 1; break;
        default: return res.status(400).json({ message: 'Invalid frequency' });
      }
  
      const totalPayments = period * paymentsPerYear;
      const installmentAmount = (totalAmount / totalPayments).toFixed(2);
  
      res.json({
        totalPayments,
        installmentAmount
      });
    } catch (err) {
      console.error('Installment calculation error:', err);
      res.status(500).json({ message: 'Server error while calculating installment' });
    }
  };