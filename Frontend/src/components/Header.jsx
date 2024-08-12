import React, { useContext, useState } from 'react'
import { GrSearch } from "react-icons/gr";
import {FaRegCircleUser} from "react-icons/fa6"
import {FaShoppingCart} from "react-icons/fa"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Logoo from '../assest/logo.png'
import Context from '../context';

const Header = () => {
  const dispatch = useDispatch();
  const [menuDisplay , setMenuDisplay] = useState(false)
  const user = useSelector(state=>state?.user?.user);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const[search,setSearch] = useState(searchQuery)
  const handleLogout = async ()=>{
    setMenuDisplay(!menuDisplay)
    const fetchData= await fetch(SummaryApi.logout_user.url,{
      method:SummaryApi.logout_user.method,
      credentials:"include"
    })

    const data = await fetchData.json()
    if(data.success)
    {
      toast.success(data.message);
      dispatch(setUserDetails(null))
      navigate("/");
    }
  if(data.error)
  toast.error(data.message);
  }

  const handleSearch = (e)=>{
    const {value} = e.target;
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate('search');
    }
  }
  
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className="h-full container mx-auto flex items-center md:px-4 px-0 justify-between">
        <div>
          <Link to={'/'} >
          <img src={Logoo} width={100} height={50} className='object-scale-down'  alt="Logo" />
          {/* <Logo w={90} h={50}  /> */}
          </Link>
        </div>
        <div className=' hidden md:flex items-center w-full justify-between  max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type="text" placeholder='Search product here...' className='w-full outline-none  '  onChange={handleSearch} value={search}/>
          <div className='text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full bg-red-600 text-white'>
            <GrSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>

        <div className='relative flex justify-center'>
        {
      user?._id && (
        
        <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>{setMenuDisplay(!menuDisplay)}} >
            {
              user?.profilePic? (
                <img src={user?.profilePic} alt={user?.name} className=' h-10 w-10 rounded-full' />
              ):(

            <FaRegCircleUser />
              )}
            
          </div>
      )
    }
          {
            menuDisplay && user?._id && (
          <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
            <nav>
              
              <div className='flex flex-col gap-2'>
              {
                user?.role === ROLE.ADMIN &&(
                  <div className='hover:bg-slate-100 p-1'>
                    <Link to={'admin-panel/all-products'} className='whitespace-nowrap' onClick={()=>{setMenuDisplay(!menuDisplay)}}>Admin Panel</Link>
                  </div>
                )
              }
              <div className='hover:bg-slate-100 p-1'>
              <Link to={'/order'} className='whitespace-nowrap ' onClick={()=>{setMenuDisplay(!menuDisplay)}}>Orders</Link>
              </div>
              <div className='hover:bg-slate-100  p-1'>
              <Link to={'/profile'} className='whitespace-nowrap ' onClick={()=>{setMenuDisplay(!menuDisplay)}}>Profile</Link>
              </div>

              <div className='hover:bg-slate-100 p-1'>
              <div onClick={handleLogout} className='whitespace-nowrap md:hidden hover:bg-slate-100 text-red-600 ml-2'>Logout</div>
              </div>
              </div>
            </nav>
            </div>
            )
          }
        </div>

          {
            user?._id && (
          <Link to={'/cart'} className='text-2xl relative'>
            <span>
            <FaShoppingCart />
            <div className='bg-red-600 h-5 rounded-full  text-white w-5 p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-sm'>{context?.cartProductCount}</p>
            </div>
            </span>
          </Link>
            )
          }


          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-600 hidden md:block'>Logout</button>
              ):(

                <Link to={'/login'} className='px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-600'>Login</Link>
              )
            }
          </div>

        </div>

      </div>
      <div className=' md:hidden  flex items-center  w-full justify-between bg-white shadow-md border focus-within:border-slate-300 rounded focus-within:shadow pl-2'>
          <input type="text" placeholder='Search product here...' className='w-full rounded p-2 rounded-l outline-none h-8'  onChange={handleSearch} value={search}/>
          <div className='text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r bg-red-600 text-white'>
            <GrSearch />
          </div>
        </div>
    </header>
  )
}

export default Header
