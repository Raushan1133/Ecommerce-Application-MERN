import React, { useContext, useEffect, useState } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6';
import { useSelector } from 'react-redux'
import { MdModeEditOutline } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import Context from '../context';
import SummaryApi from '../common';

const Profile = () => {
    const user = useSelector(state=>state?.user?.user);
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState({
        ...user,
        name: "",
        email:""
    })

    // console.log(user)

    const handleOnChange = (e)=>{
        const {name,value} = e.target
        setData((preve)=>{
            return{
                ...preve,
                [name] :value
            }
        })
    }
    const fetchUserDetails = async()=>{
        setLoading(true)
        const dataResponse = await fetch(SummaryApi.current_user.url,{
          method:SummaryApi.current_user.method,
          credentials:"include",
        })
    
        const dataApi = await dataResponse.json();
        console.log(dataApi)
        if(dataApi.success){
            setData({
                name:dataApi?.data.name,
                email:dataApi?.data.email
            })
            setLoading(false);
        }
      }
    useEffect(()=>{
        fetchUserDetails();
    },[]);

  return (
    <div>
      <div className="container md:py-4 px-4 pt-10">
        <div>
        <h1 className='white text-center text-xl font-semibold'>Profile Summary</h1>
        </div>

        

        <div className='w-full flex justify-center p-4'>
        <form className='max-w-md flex flex-col gap-5'>
        <div>
            <div className='text-8xl flex justify-center mt-5 rounded'>
            {
                user?.profilePic ? (
                  <div>
                    <img src={user?.profilePic} alt={user?.name} className=' h-36 w-36  rounded-full' />
                    <FaCamera className='h-10 w-10 ml-auto -mt-12 cursor-pointer text-red-600' />
                  </div>
                ):(
                    <div>
                        <FaRegCircleUser />
                        <FaCamera className='h-10 w-10'/>
                    </div>
                )
                }
          </div>
        </div>
            <div className='flex items-center gap-10 w-full'>
            <label htmlFor="name" className='font-semibold'>Name: </label>
            <div className='flex items-center'>
            <input type="text" name="name"  value={data?.name} id="name" className='bg-transparent w-full  border-b border-b-red-600 outline-none' onChange={handleOnChange} />
            <MdModeEditOutline className='-ml-3' />
            </div>
            </div>

            <div className='flex items-center gap-10 w-full'>
            <label htmlFor="email" className='font-semibold'>Email: </label>
            <div className='flex items-center c'>
            <input type="text" name="email" disabled  value={data?.email} id="email" className='bg-transparent w-full  border-b border-b-red-600 outline-none cursor-not-allowed' onChange={handleOnChange} />
            <MdModeEditOutline className='-ml-3' />
            </div>
            </div>
        </form>
        </div>

      </div>
    </div>
  )
}

export default Profile
