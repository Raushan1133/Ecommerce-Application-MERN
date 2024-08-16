import React, { useContext, useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { MdModeEditOutline } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import SummaryApi from '../common';
import { FaUserCircle } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import Loading from '../components/Loading';
import {toast} from 'react-toastify'
import Context from '../context';

const Profile = () => {
    const user = useSelector(state=>state?.user?.user);
    const [loading,setLoading] = useState(true);
    const [updateLoading , setUpdateLoading] = useState(false);
    const [imgUploading , setImgUploading] = useState(false)
    const [data,setData] = useState({
        name: "",
        email:"",
        profilePic:""
    })

    const {fetchUserDetails} = useContext(Context);


    const handleOnChange = (e)=>{
        const {name,value} = e.target
        setData((preve)=>{
            return{
                ...preve,
                [name] :value
            }
        })
    }
    const fetchData = async()=>{
        setLoading(true)
        const dataResponse = await fetch(SummaryApi.current_user.url,{
          method:SummaryApi.current_user.method,
          credentials:"include",
        })
    
        const dataApi = await dataResponse.json();
        if(dataApi.success){
            setData(dataApi.data)
            setLoading(false);
        }
      }
    useEffect(()=>{
        fetchData();
    },[]);

    const handleUpload = async (e)=>{
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

    const handleSubmit = async (e)=>{
      setUpdateLoading(true)
      e.preventDefault();

      if((data.name.trim()) === user.name && data.profilePic === user.profilePic){
          toast.error("No changes")
          setUpdateLoading(false)
          return;
      }

      const response = await fetch(SummaryApi.updateUserProfile.url,{
        method:SummaryApi.updateUserProfile.method,
        headers:{
          "content-type":"application/json"
        },
        credentials:'include',
        body:JSON.stringify({ 
          name : data.name,
          profilePic : data.profilePic
        })
      })
      const responseData = await response.json();
      setUpdateLoading(false);
      if(responseData?.success){
         toast.success(responseData?.message);
         fetchUserDetails();
      }
    }

  return (
    <div className='h-[calc(100vh-125px)]'>
      <div className="container md:py-4 px-4 pt-10">
        <div>
        <h1 className='white text-center text-xl font-semibold'>Profile Summary</h1>
        </div>

        {
          loading ? (
            <div> 
              <div className='text-8xl flex justify-center mt-5 rounded'>
                    <div>
                        <div className='h-36 w-36 rounded-full bg-slate-300 animate-pulse' > </div>
                        <div className='h-10 w-10 ml-auto -mt-12 cursor-pointer bg-slate-300 animate-pulse'></div>
                    </div>
               
          </div>
            <div className='w-full flex justify-center p-4'>
        <form className='max-w-md flex flex-col gap-5'> 
                
            <div className='flex items-center gap-10 w-full'>
            <label htmlFor="name" className='font-semibold p-4 h-5 w-5 bg-slate-300'> </label>
            <div className='flex items-center'>
            <input type="text" name="name" disabled id="name" className='bg-slate-300 w-full  border outline-none animate-pulse' onChange={handleOnChange} />
            <div className='-ml-3 p-4'> </div>
            </div>
            </div>

            <div className='flex items-center gap-10 w-full'>
            <label htmlFor="email" className='font-semibold p-4 h-5 w-5 bg-slate-300'> </label>
            <div className='flex items-center c'>
            <input type="text" name="email" disabled id="email" className='bg-slate-300 w-full  border outline-none cursor-not-allowed animate-pulse'/>
            <div className='-ml-3 p-4'> </div>
            </div>
            </div>

        </form>
        </div>
        </div>
          ):(
              <div>
                <div className='w-full flex justify-center p-4'>
        <form className='max-w-md flex flex-col gap-5'>
        <div>
            <div className='text-8xl flex justify-center mt-5 rounded'>
            {
                data?.profilePic ? (
                  <div>
                    {
                      imgUploading ? (
                        <div>
                        <div className='relative'>
                        <img src={data?.profilePic} alt={data?.name} className=' h-36 w-36  rounded-full' />
                        <div className='flex items-center justify-center mt-6 absolute top-10 left-16 '>
                        <Loading />
                        </div>
                          </div>
                    <input type="file" name="file" id="file" className='hidden' onChange={handleUpload} />
                        </div>
                      ):(
                        <div>
                      <img src={data?.profilePic} alt={data?.name} className=' h-36 w-36  rounded-full' />
                    <label htmlFor="file">
                    <FaCamera className='h-10 w-10 ml-auto -mt-12 cursor-pointer text-red-600' />
                    <input type="file" name="file" id="file" className='hidden' onChange={handleUpload} />
                    </label>
                        </div>
                      )
                    }
                  </div>
                ):(
                    <div className='relative'>
                          <div>
                            <div >  
                              <div className='relative'>
                            <FaUserCircle />
                            {
                              imgUploading && (<div className='flex items-center justify-center absolute top-10 left-9 '>
                              <Loading />
                              </div>)
                            }
                            <label htmlFor="file">
                              {
                                !imgUploading && (
                                  <FaCamera  className='h-10 w-10 ml-auto -mt-12 cursor-pointer text-red-600'/>

                                )
                              }
                              <input type="file" name="file" id="file" className='hidden' onChange={handleUpload} />
                            </label>
                                  </div>
                            </div>
                          </div>
                    </div>
                )
                }
          </div>
        </div>
            <div className='flex items-center gap-3 sm:gap-10 w-full'>
            <label htmlFor="name" className='font-semibold'>Name: </label>
            <div className='flex items-center'>
            <input type="text" name="name"  value={data?.name} id="name" className='bg-transparent w-full  border-b border-b-red-600 outline-none' onChange={handleOnChange} />
            <MdModeEditOutline className='-ml-3' />
            </div>
            </div>

            <div className='flex items-center gap-5 sm:gap-10 w-full'>
            <label htmlFor="email" className='font-semibold'>Email: </label>
            <div className='flex items-center c'>
            <input type="text" name="email" disabled  value={data?.email} id="email" className='bg-transparent w-full  border-b border-b-red-600 outline-none cursor-not-allowed' onChange={handleOnChange} />
            {/* <MdModeEditOutline className='-ml-3' /> */}
            </div>
            </div>
            <button className='bg-red-600 mt-2 hover:bg-red-700 text-white w-full px-4 py-2   rounded-full hover:scale-110 transition-all mx-auto block' onClick={handleSubmit}>{updateLoading ? (<div className='flex justify-center'>
       <div className='h-6 w-6 border-[3px] rounded-full animate-spin text-center border-red-white border-t-[transparent]'>
       </div>
    </div>): (<div>Update Profile</div>)}</button>
        </form>
        </div>
              </div>
          )
        }

      </div>
    </div>
  )
}

export default Profile
