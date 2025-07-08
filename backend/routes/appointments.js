const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Appointment = require('../models/Appointment');

router.post('/book-appointment', async (req, res) => {
  try {
    const { VIN, date, repairType } = req.body;

    if (!VIN || !date || !repairType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const vinUpper = VIN.toUpperCase();
    const targetDate = new Date(date);
    const startOfWeek = new Date(targetDate);
    const endOfWeek = new Date(targetDate);
    startOfWeek.setDate(targetDate.getDate() - targetDate.getDay());
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const existing = await Appointment.findOne({
      VIN: vinUpper,
      date: {
        $gte: startOfWeek.toISOString(),
        $lte: endOfWeek.toISOString()
      }
    });

    if (existing) {
      return res.status(400).json({ error: 'VIN already has an appointment this week' });
    }

    const newAppointment = new Appointment({ VIN: vinUpper, date, repairType });
    await newAppointment.save();

    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

// Get already booked dates
router.get('/booked-dates', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    const bookedDates = appointments.map(app => app.date);
    res.json(bookedDates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch booked dates' });
  }
});

module.exports = router;