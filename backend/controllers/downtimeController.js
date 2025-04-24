const dotenv = require('dotenv');
dotenv.config();
const Downtime = require('../models/Downtime');

exports.createDowntime = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'Global-Admin') {
      return res.status(403).json({ message: 'Access denied. Only Global-Admins can schedule downtime.' });
    }

    const { startTime, durationMinutes, reason } = req.body;

    const downtime = new Downtime({
      startTime: new Date(startTime),
      durationMinutes,
      reason,
      createdBy: req.user._id,
    });

    await downtime.save();
    res.status(201).json({ message: 'Downtime scheduled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCurrentDowntime = async (req, res) => {
  const now = new Date();
  const allDowntimes = await Downtime.find();

  const current = allDowntimes.find(downtime => {
    const start = new Date(downtime.startTime);
    const end = new Date(start.getTime() + downtime.durationMinutes * 60000);
    return now >= start && now <= end;
  });

  const bypassToken = req.headers['x-admin-bypass'];
  const isBypassValid = bypassToken === process.env.DOWNTIME_BYPASS_TOKEN;

  if (!current) {
    return res.status(200).json({ active: false });
  }

  res.status(200).json({
    active: true,
    endsAt: new Date(current.startTime.getTime() + current.durationMinutes * 60000),
    reason: current.reason,
    allowBypass: isBypassValid
  });
};