const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  VIN: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  date: {
    type: String, // ISO date string
    required: true,
  },
  repairType: {
    type: String,
    enum: ['technical', 'non-technical', 'routine-servicing'],
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Appointment', appointmentSchema);


// Static method to check if a VIN already has an appointment in the same ISO week
appointmentSchema.statics.isVinBookedThisWeek = async function (vin, date) {
  const inputDate = new Date(date);
  const getWeek = (d) => {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  };
  const week = getWeek(inputDate);
  const year = inputDate.getUTCFullYear();

  const existing = await this.find();
  return existing.some((app) => {
    const appDate = new Date(app.date);
    return (
      app.VIN === vin.toUpperCase() &&
      getWeek(appDate) === week &&
      appDate.getUTCFullYear() === year
    );
  });
};