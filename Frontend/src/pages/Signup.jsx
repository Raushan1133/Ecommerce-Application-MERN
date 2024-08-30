import React, { useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import uploadImage from '../helpers/uploadImage'
import Loading from '../components/Loading'

const Signup = () => {
    const [showPassword , setShowPassword] = useState(false)
    const [showConfirmPassword , setShowConfirmPassword] = useState(false)
    const [loading,setLoading] = useState(false);
    const[checkPassword , setCheckPassword] = useState(false);
    const [checkConfirmPassword , setCheckConfirmPassword] = useState(false);
    const [imgUploading , setImgUploading] = useState(false)
    const [data,setData] = useState({
        email:"",
        password:"",
        name:"",
        confirmPassword:"",
        profilePic:""
    });
    const navigate = useNavigate();
    const handleOnchange = (e)=>{
        const {name,value} = e.target;
        setData((preve)=>{
            return {
                ...preve,
                [name]:value
            }

        })
     }

     const handleUploadPic = async(e)=>{
        const file = e.target.files[0];
        setImgUploading(true);
        const imagePic = await uploadImage(file);
        setImgUploading(false);
        setData((preve)=>{
            return {
                ...preve,
                profilePic: imagePic.url
            }
        })
     }

     const handleSubmit =async (e)=>{
        e.preventDefault();
           try {
            const regex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z]).{8,}$/;
            if (!regex.test(data.password)) {
                setCheckPassword(true);
            }else{
                if(data.password === data.confirmPassword){
                    setLoading(true);
                        const dataResponse =await fetch(SummaryApi.signUp.url,{
                            method:SummaryApi.signUp.method,
                            headers :{
                                "content-type":"application/json"
                            },
                            body : JSON.stringify(data)
                        })
                        const dataApi = await dataResponse.json()
                        setLoading(false);
                        if(dataApi.success){
                            toast.success("Registered success !")
                            navigate("/login")
                        }
            
                        if(dataApi.error){
                            toast.error(dataApi.message);
                        }
                    
                }else{
                    setCheckConfirmPassword(true);
                 }
            }
           } catch (error) {
                setLoading(false);
                toast.error("Something went wrong , try again later");
           }
    
    }
  return (
    <section id='signup' >
        <div className='mx-auto container md:p-4 pb-4 pt-8'>
            <div className='bg-white p-5 py-5 w-full max-w-sm mx-auto rounded'>
                <div className='w-20 h-20 mx-auto bg-slate-200 relative overflow-hidden rounded-full'>
                    
                        {
                            imgUploading ? (
                                <div className='flex items-center justify-center mt-6'>
                                    <Loading />
                                </div>
                            ):(
                                <div>
                                <div>
                                <img src={data.profilePic || loginIcon} alt='login icon' />
                                </div>
                                <form action="">
                        <label>
                             <div className='text-xs bg-opacity-80 bg-slate-200 cursor-pointer  pb-4 pt-2 text-center absolute bottom-0 w-full'>
                                 Upload Photo
                             </div>
                            <input type='file' className='hidden' onChange={handleUploadPic} />
                        </label>
                    </form>
                                </div>
                                
                            )
                        }
                    
                    {/* <form action="">
                        <label>
                             <div className='text-xs bg-opacity-80 bg-slate-200 cursor-pointer  pb-4 pt-2 text-center absolute bottom-0 w-full'>
                                 Upload Photo
                             </div>
                            <input type='file' className='hidden' onChange={handleUploadPic} />
                        </label>
                    </form> */}
                </div>

                <form className='pt-6 flex flex-col gap-8' onSubmit={handleSubmit}>

                <div className='grid'>
                        <label>Name : </label>
                        <div className='bg-slate-100 p-2'>
                        <input type='text' 
                        name='name'
                        onChange={handleOnchange}
                        value={data.name}
                        required
                        placeholder='enter name' className='w-full h-full outline-none bg-transparent
                        ' />
                        </div>
                    </div>

                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-100 p-2'>
                        <input type='email' 
                        name='email'
                        required
                        onChange={handleOnchange}
                        value={data.email}
                        placeholder='enter email' className='w-full h-full outline-none bg-transparent
                        ' />
                        </div>
                    </div>

                    {/* Otp */}
                    <div className='hidden'>
                        <label>OTP : </label>
                        <div className='p-2 h-full flex justify-between items-center gap-2 '>
                        <input type="number" className='w-[20%] h-[100%] py-2 text-center text-lg border bg-slate-100 focus:outline-none  h-ful' name="" id="" />
                        <input type="number" className='w-[20%] h-[100%] py-2 text-center text-lg border bg-slate-100 focus:outline-none  h-ful' name="" id="" />
                        <input type="number" className='w-[20%] h-[100%] py-2 text-center text-lg border bg-slate-100 focus:outline-none  h-ful' name="" id="" />
                        <input type="number" className='w-[20%] h-[100%] py-2 text-center text-lg border bg-slate-100 focus:outline-none  h-ful' name="" id="" />
                        </div>
                    </div>

                    <div className='grid'>
                        <label>Password : </label>
                        <div className='bg-slate-100 p-2 flex'>
                        <input type={showPassword ? "text" : "password"} placeholder='enter password'
                        name='password' 
                        value={data.password}
                        required
                        onChange={(e)=>{handleOnchange(e); setCheckPassword(false)}}
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
                        {
                            checkPassword && (
                                <small className='text-red-600 transition-all'>Password must be at least 8 characters long, contain at least one uppercase letter, one digit, and one special character (!@#$%^&*)</small>
                            )
                        }
                    </div>

                    <div className='grid'>
                        <label>Confirm Password : </label>
                        <div className='bg-slate-100 p-2 flex'>
                        <input type={showConfirmPassword ? "text" : "password"} placeholder='enter confirm password'
                        name='confirmPassword' 
                        required
                        value={data.confirmPassword}
                        onChange={(e)=>{handleOnchange(e); setCheckConfirmPassword(false)}}
                        className='w-full h-full outline-none bg-transparent' />
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

                    <button className='bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2   rounded-full hover:scale-110 transition-all mx-auto block mt-6'>{loading ? (<div className='flex justify-center'>
       <div className='h-6 w-6 border-[3px] rounded-full animate-spin text-center border-red-white border-t-[transparent]'>
       </div>
    </div>):(<div>Sign Up</div>)}</button>
                </form>
                <p className='my-5'>Already have an account ? <Link to={'/login'} className='hover:text-red-700 hover:underline text-red-600'>Login</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Signup
