import nodemailer from 'nodemailer'


const generateMail = async (verificationCode,email)=>{
return new Promise((resolve , reject)=>{

  const transporter = nodemailer.createTransport({
    host:'smtp.ethereal.email',
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:process.env.EMAIL_ETHEREAL,
        pass:process.env.EMAIL_PASSWORD_ETHEREAL
    }
});
const mailOptions = {
  from:process.env.FROM_EMAIL,
  to:email,
  subject: 'Account Verification',
  text: `Your verification code is: ${verificationCode}`,
}
 transporter.sendMail(mailOptions,function(error,info){
  if(error){
      console.log(error);
       reject({success:false})
  }
  else{
      console.log("Email hasbeen sent: -",info.response);
      resolve({success:true})
  }
})

})
  


}

export default generateMail