import mongoose from 'mongoose';

const favoriteDoctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: [{
    doctorId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    }
   
  }],
 
});

const FavoriteDoctor = mongoose.model('FavoriteDoctor', favoriteDoctorSchema);

export default FavoriteDoctor;
