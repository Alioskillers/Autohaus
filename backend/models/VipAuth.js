const mongoose = require('mongoose');

const VipAuthSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true, 
      unique: true  // Ensure each user has a unique VIP auth record
    },
    vipUsername: { 
        type: String, 
        required: true 
      },
      email: { 
        type: String, 
        required: true 
      },
    vipPassword: { 
      type: String, 
      required: true 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('VipAuth', VipAuthSchema);