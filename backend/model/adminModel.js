import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const adminSchema = mongoose.Schema({

  name:{
    type : String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  isVerified:{
    type:Boolean,
    default:true
  },
  createdAt:{
    type:Date,
    default:Date.now
  }

})

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

adminSchema.methods.matchPassword = async function(enteredPassword ){

  return await bcryptjs.compare(enteredPassword,this.password)

}
const Admin = mongoose.model('Admin',adminSchema)

export default Admin;