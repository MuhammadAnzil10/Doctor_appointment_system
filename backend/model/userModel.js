import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema =new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone:{
        type:Number,
        required:true
    },
    age:{
      type:Number,
      required:true
    },
    bloodGroup:{
       type:String,
      
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked:{
      type:Boolean,
      default:false
    },
    verificationCode: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

userSchema.methods.matchPassword=async function(enteredPassword ){

  return await bcryptjs.compare(enteredPassword,this.password)

}

const User = mongoose.model("User", userSchema);
export default User;
