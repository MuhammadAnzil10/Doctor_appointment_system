const mongoose = require('mongoose');

// Define Appointment schema
const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: Number,
    required: true,
  },
  paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    amount: {
      type: Number,
      default: 0,
    },
    paymentDate: {
      type: Date,
      default:Date.now
    },
    paymentMethod: {
      type: String,
      enum: ['Card', 'Online', 'Cash', 'Wallet'],
      default: 'Cash',
    },


});


const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
