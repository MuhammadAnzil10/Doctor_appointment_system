import crypto from 'crypto'

const generateOtp =()=>{
  return (crypto.randomBytes(2).readUInt16BE() % 10000).toString().padStart(4, '0');

}


export default generateOtp;