
const USER=require('../models/user');
const Appointment=require('../models/appoinment');
const Doctor=require('../models/doctor');
// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, appointmentTime,} = req.body;

    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      
    });

    const savedAppointment = await appointment.save();
    const user = await USER.findById(patientId);
    if (user) {
      user.notifcation.push('Your appointment has been created wait for doctor approvel.');
      await user.save();
    }
    res.status(200).json({
        sucess:true,
        data:savedAppointment,
        message:"Appoinment created"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('USER', 'name')
      .populate('Doctor', 'firstName lastName specialization')
      .exec();
      res.status(200).json({
        sucess:true,
        data:appointments,
        message:"Appoinment fetched"
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

// Get a specific appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('USER', 'name')
      .populate('Doctor', 'firstName lastName specialization')
      .exec();

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json({
        sucess:true,
        data:appointment,
        message:"Appoinment fetched"
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch appointment' });
  }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, appointmentTime} = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        patient: patientId,
        doctor: doctorId,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
      },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndRemove(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
};


exports.getAppointmentsByPatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    const appointments = await Appointment.find({ patient: patientId })
      .populate('doctor', 'firstName lastName')
      .exec();

    res.status(200).json({
      sucess:true,
      data:appointments,
      message:"appoiment of a user"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

