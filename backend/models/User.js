const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['User', 'Worker', 'Admin', 'VIP'], default: 'User' },
  oldPurchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  totalOrders: { type: Number, default: 0 },
  username: {
    type: String,
    unique: true,
    required: function () {
      return this.role === 'Admin';
    }
  },
}, { timestamps: true });

userSchema.methods.addOrderAmount = async function(amount) {
  this.totalOrders += amount;
  if (this.totalOrders >= 1000000 && this.role !== 'VIP') {
    this.role = 'VIP';
  }
  await this.save();
};
module.exports = mongoose.model('User', userSchema);