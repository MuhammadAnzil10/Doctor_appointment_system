import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
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
  appointmentTime:{
    type:String,
    require:true
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Slot',
    required: true,
  },
  paymentStatus: {
      type: String,
      default: 'Pending',
    },
    consultationFee: {
      type: Number,
      default: 0,
    },
    paymentDate: {
      type: Date,
      default:Date.now
    },
    paymentMethod: {
      type: String,
      required:true
    },


});


const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
