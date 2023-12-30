import app from '../../firebase.js'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { useUserGoogleAuthMutation } from "../../UserSlices/usersApiSlice.js";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../UserSlices/authSlice.js';


const OAuth = ()=>{
  const [googleAuth,{isLoading:isLoadingStatus}] = useUserGoogleAuthMutation()
  const dispatch = useDispatch()
 
  const handleClick =async(e)=>{
    e.preventDefault();
    const provider = new GoogleAuthProvider()
    const auth = getAuth(app)
    const result = await signInWithPopup(auth,provider)
    try {
      const res = await googleAuth({
        name:result.user.displayName,
        email:result.user.email
      }).unwrap()
      dispatch(setCredentials({...res}))
      navigate("/");

    } catch (err) {
      toast.error(err?.data?.message || err?.error)
    }

  }



  return (
    <div>
      <button className="w-full bg-red-700 text-white rounded-lg p-3
     uppercase hover:opacity-95" onClick={handleClick}>Google</button>
     
    </div>
  )
}

export default OAuth