import {toast} from 'react-toastify'

const RechargePage =({amount,setAmount,createIntent})=>{
  
  const handleClick =async()=>{
    const regEx = /^[1-9]\d*$/;
    if(amount <= 0 || !regEx.test(amount) ){
      return toast.warn('Please Enter valid amount')
    }
    createIntent(amount)
   
  }
  return(
    <div className="w-60">
      <div className="flex">
        <input type="text" name="" id="" value={amount} onChange={e=>setAmount(e.target.value)}
         className="h-10 rounded-md mt-3 border-gray-500 focus:outline-none p-2 text-center" />
        <span 
        className="m-1 bg-primary-500 w-16 mt-3 p-2 pl-3 rounded-sm cursor-pointer "
        onClick={handleClick}
        >Pay</span>
      </div>
    </div>
  )
}


export default RechargePage;