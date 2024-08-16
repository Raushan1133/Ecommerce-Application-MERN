import React, { useState } from 'react'
import emailImg from '../assest/sendEmail.gif'
import SummaryApi from '../common';
import {toast} from 'react-toastify'

const ForgotPassword = () => {
  const [data,setData] = useState("");
  const[loading,setLoading] = useState(false);
  const[help,setHelp ] =useState(false);

  const handleOnChange = (e)=>{
    setData(e.target.value)
  }

  const handleSubmit = async(e)=>{
    setLoading(true);
    e.preventDefault();
    if(!data){
      toast.error("Please enter email !")
      setLoading(false);
      return;
    }
    const response = await fetch(SummaryApi.sendPassword.url,{
      method:SummaryApi.sendPassword.method,
      headers:{
        "content-type" : "application/json"
      },
      body:JSON.stringify({
        email:data
      })
    })

    const responseData = await response.json();
    console.log("Response data",responseData);

    if(responseData.success){
       toast.success(responseData.message);
    }else{
      toast.error(responseData.message);
    }
    setData("");
    setLoading(false);
  }
  return (
    <div className='container pb-4 pt-10 md:pt-4 h-[calc(100vh-120px)]'>
      <div className='flex items-center justify-center flex-col w-full px-4 '>
        <div>
               <img src={emailImg} className='text-lg text-center ' />
        </div>
      

      <div className='max-w-sm flex justify-center w-full'>
        <form className='pt-6 flex flex-col gap-8 justify-center w-full'>
        <div className='grid gap-3'>
                        <label htmlFor='email'>Email : </label>
                        <div className='bg-slate-200 shadow-md p-2'>
                        <input type='email' 
                        id='email'
                        name='email'
                        placeholder='enter email*' className='w-full  h-full outline-none bg-transparent
                        '
                        required
                        value={data}
                        onChange={handleOnChange}
                        />
                        
                        </div>
                        <small className='text-red-600'>A reset password mail will be sent to your email valid for <b>15 minutes</b>.</small>

          </div>
          <div className='flex gap-3 flex-col'>
          <button onClick={handleSubmit} className='bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2  rounded-full hover:scale-110 transition-all mx-auto block'>{loading ? (<div className='flex justify-center'>
       <div className='h-6 w-6 border-[3px] rounded-full animate-spin text-center border-red-white border-t-[transparent]'>
       </div>
    </div>): (<div>Send</div>)}</button>
    <small onClick={()=>setHelp(!help)} className='text-red-600 underline cursor-pointer ml-auto'>Not received password reset link ?</small>
    
    {
      help && (
      <div className='pt-3'>
      <p>1. Check your internet connection.</p>
      <p>2. Check your email spam mails section.</p>
      <p>3. Try again later.</p>
    </div>
      )
    }
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default ForgotPassword
