const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['User', 'Worker', 'Admin', 'Global-Admin', 'Workers-Admin'], default: 'User' },
  oldPurchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  totalOrders: { type: Number, default: 0 },
  username: {
    type: String,
    unique: true,
    required: function () {
      return this.role === 'Admin' || this.role === 'Global-Admin' || this.role === 'Worker' || this.role === 'Workers-Admin';
    }
  },
  webAuthnCredentialId: { type: String }, 
  webAuthnPublicKey: { type: String }, 
  webAuthnChallenge: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);