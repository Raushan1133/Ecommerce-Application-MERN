import React, { useState } from 'react'
import SummaryApi from '../common'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const ResetPasswordPage = () => {
    const [showPassword , setShowPassword] = useState(false)
    const[checkPassword , setCheckPassword] = useState(false);
    const [checkConfirmPassword , setCheckConfirmPassword] = useState(false);
    const[showConfirmPassword , setShowConfirmPassword] = useState(false)
    const params = useParams();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState({
        password:"",
        confirmPassword:""
    })

    const handleOnChange = (e)=>{
        const {name,value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name]:value
            }
        })
    }
    const regex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z]).{8,}$/;
    const handleSubmit = async(e)=>{
      e.preventDefault();

      if (!regex.test(data.password)) {
        setCheckPassword(true);
    }else{
      if(data.confirmPassword !== data.password){
          setCheckConfirmPassword(true);
      }else{
        setLoading(true)
        const response = await fetch(SummaryApi.resetPassword.url,{
          method:SummaryApi.resetPassword.method,
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify({
            password : data.password,
            confirmPassword : data.confirmPassword,
            userId:params?.userId,
            token:params?.token
          })
        })
  
        const responseData = await response.json();
        setLoading(false);
        if(responseData.success){
            toast.success(responseData.message);
            navigate("/login");
        }else{
          toast.error(responseData.message);
        }
      }
    }

    }
  return (
    <div className='container pb-4 pt-10 md:pt-4 h-[calc(100vh-120px)]'>
    <div className='flex items-center justify-center flex-col w-full px-4 '>    

    <div className='max-w-sm flex justify-center w-full'>
      <form className='pt-6 flex flex-col gap-8 justify-center w-full'>
      <div className='grid gap-3'>
                      <label htmlFor='password'>Password : </label>
                      <div className='bg-slate-200 shadow-md p-2 flex'>
                      <input type={showPassword ? "text" : "password"} 
                      id='password'
                      name='password'
                      placeholder='create a strong password*' className='w-full  h-full outline-none bg-transparent
                      '
                      required
                      value={data.password}
                      onChange={(e)=>{handleOnChange(e);setCheckPassword(false)}}
                      />
                      <div className='cursor-pointer text-xl' onClick={()=>{setShowPassword(!showPassword)}}>
                            <span>
                                {
                                    showPassword ? (
                                        <FaEyeSlash />
                                    ): (
                                        <FaEye />
                                    )
                                }
                            </span>
                        </div>
                      </div>
                      {
                        checkPassword && (

                          <small className='text-red-600 transition-all'>Password must be at least 8 characters long, contain at least one uppercase letter, one digit, and one special character (!@#$%^&*)</small>
                        )
                        }
                      <label htmlFor='password'>Confirm Password : </label>
                      <div className='bg-slate-200 shadow-md p-2 flex'>
                      <input type={showConfirmPassword ? "text" : "password"}
                      id='confirmPassword'
                      name='confirmPassword'
                      placeholder='confirm password*' className='w-full  h-full outline-none bg-transparent
                      '
                      required
                      value={data.confirmPassword}
                      onChange={(e)=>{handleOnChange(e);setCheckConfirmPassword(false)}}
                      />
                      <div className='cursor-pointer text-xl' onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}}>
                            <span>
                                {
                                    showConfirmPassword ? (
                                        <FaEyeSlash />
                                    ): (
                                        <FaEye />
                                    )
                                }
                            </span>
                        </div>
                      </div>
                      {
                            checkConfirmPassword && (

                                <small className='text-red-600'>Password and confirm password not matched </small>
                            )
                      }

        </div>
        <div>
        <button className='bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2  rounded-full hover:scale-110 transition-all mx-auto block' onClick={handleSubmit}>{loading ? (<div className='flex justify-center'>
       <div className='h-6 w-6 border-[3px] rounded-full animate-spin text-center border-red-white border-t-[transparent]'>
       </div>
    </div>): (<div>Reset Password</div>)}</button>
        </div>
      </form>
    </div>
    </div>
  </div>
  )
}

export default ResetPasswordPage
