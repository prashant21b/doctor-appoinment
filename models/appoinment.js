const mongoose = require('mongoose');
const USER=require('../models/user');
const Doctor=require('../models/doctor');
const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'USER', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointment_date: { type: Date, required: true },
  appointment_time: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'rejected', 'approved'],
    default: 'pending'
  }

});

module.exports = mongoose.model('Appointment', appointmentSchema);
