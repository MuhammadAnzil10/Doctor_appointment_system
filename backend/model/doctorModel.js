import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required:true
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
  },
  qualification: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  specialization: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Specialization"
  },
  password: {
    type: String,
    require: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});


doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

doctorSchema.methods.matchPassword=async function(enteredPassword ){

  return await bcryptjs.compare(enteredPassword,this.password)

}





const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
