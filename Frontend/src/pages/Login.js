import React, { useContext, useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import SummaryApi from '../common'
import {toast} from 'react-toastify'
import Context from '../context'

const Login = () => {
    const [showPassword , setShowPassword] = useState(false)
    const[loading,setLoading] = useState(false);
    const [data,setData] = useState({
        email:"",
        password:""
    });

    const navigate = useNavigate()
         
    const {fetchUserDetails , fetchUserAddToCart} = useContext(Context)
    const handleOnchange = (e)=>{
        const {name,value} = e.target;
        setData((preve)=>{
            return {
                ...preve,
                [name]:value
            } 

        })
     }

     const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        const response = await fetch(SummaryApi.signIn.url,{
            method:SummaryApi.signIn.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        }) 

        const dataApi = await response.json()
        setLoading(false);
        if(dataApi.success){
            toast.success(dataApi.message)
            navigate("/")
            fetchUserDetails();
            fetchUserAddToCart();
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }
     }
  return (
    <section id='login' >
        <div className='mx-auto container md:p-4 pb-4 pt-8'>
            <div className='bg-white p-5 py-5 w-full max-w-sm mx-auto rounded'>
                <div className='w-20 h-20 mx-auto'>
                    <img src={loginIcon} alt='login icon' />
                </div>

                <form className='pt-6 flex flex-col gap-8 ' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-100 p-2'>
                        <input type='email' 
                        name='email'
                        onChange={handleOnchange}
                        value={data.email}
                        placeholder='enter email' className='w-full h-full outline-none bg-transparent
                        ' />
                        </div>
                    </div>

                    <div className='grid'>
                        <label>Password : </label>
                        <div className='bg-slate-100 p-2 flex'>
                        <input type={showPassword ? "text" : "password"} placeholder='enter password'
                        name='password' 
                        value={data.password}
                        onChange={handleOnchange}
                        className='w-full h-full outline-none bg-transparent' />
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
                        <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600' >Forgot Password ? </Link>
                    </div>

                    <button className='bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2  rounded-full hover:scale-110 transition-all mx-auto block mt-6'>{loading ? (<div className='flex justify-center'>
       <div className='h-6 w-6 border-[3px] rounded-full animate-spin text-center border-red-white border-t-[transparent]'>
       </div>
    </div>): (<div>Login</div>)}</button>
                    <Link to={'/sign-up'} className='bg-red-600 mb-5 text-center hover:bg-red-700 text-white px-1 py-2 w-full rounded-full hover:scale-110 transition-all mx-auto block -mt-3'>Create New Account</Link>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Login
