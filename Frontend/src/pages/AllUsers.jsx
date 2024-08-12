import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import {MdModeEdit} from 'react-icons/md'
import ChangeUserRole from '../components/ChangeUserRole'

const AllUsers = () => {
    const [allUsers,setAllUsers] = useState([])
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email:"",
        name:"",
        role:"",
        _id:""
    })
    const fetchAllUsers = async()=>{
        const fetchData =await fetch(SummaryApi.allUser.url,{
            method: SummaryApi.allUser.method,
            credentials:'include'
        })

        const dataReponse = await fetchData.json()
        if(dataReponse.success){
            setAllUsers(dataReponse.data)
        }

        if(dataReponse.error){
            toast.error(dataReponse.message)
        }
    }
    useEffect(()=>{
        fetchAllUsers()
    },[])
  return (
    <div  className='pb-4 bg-white'>
      <table className='w-full userTable'>
        <thead  className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created at</th>
            <th>Action</th>
        </thead>
        <tbody>
            {
                allUsers.map((el,index)=>{
                    return(
                        <tr key={index+"all users"}>
                            <td>{index + 1}</td>
                            <td>{el?.name}</td>
                            <td>{el?.email}</td>
                            <td>{el?.role}</td>
                            <td>{moment(el?.createdAt).format("LL")}</td>
                            <td><button className='bg-green-100 hover:bg-green-500 p-2 rounded-full cursor-pointer hover:text-white'><MdModeEdit onClick={()=>{
                                setUpdateUserDetails(el)
                                setOpenUpdateRole(true)}}/></button></td>
                        </tr>
                    )
                })
            }
        </tbody>
      </table>
      {
        openUpdateRole && (
            
            <ChangeUserRole  onClose={()=>setOpenUpdateRole(false)} name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId = {updateUserDetails._id}
            callFunc = {fetchAllUsers}
            />
        )
      }
    </div>
  )
}

export default AllUsers
