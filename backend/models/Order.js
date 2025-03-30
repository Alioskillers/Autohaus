const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: false
  },
  type: {
    type: String,
    enum: ['purchase', 'rent', 'installment'],
    required: true
  },
  period: {
    type: Number,
    required: function () {
      return this.type === 'rent' || this.type === 'installment';
    }
  },
  frequency: {
    type: String,
    required: function () {
      return this.type === 'installment';
    }
  },
  receiptNumber: {
    type: String,
    required: true,
    unique: true
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  buyer: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  installmentPlan: {
    duration: Number,
    frequency: String,
    schedule: [
      {
        installment: Number,
        amount: String
      }
    ]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);