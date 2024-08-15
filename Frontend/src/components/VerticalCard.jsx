import React, { useContext, useState } from 'react'
import scrollTop from '../helpers/scrollTop'
import dispalyINRcurrency from '../helpers/DisplayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

const VerticalCard = ({loading , data = []}) => {
    const [addToCartLoading , setAddToCartLoading] = useState(false)

    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
        setAddToCartLoading(true)
       await addToCart(e,id)
       setAddToCartLoading(false)
       fetchUserAddToCart()
    }
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-around  md:gap-10 overflow-x-scroll scrollbar-none transition-all'>
    {
         loading ? (
             loadingList.map((product,index)=>{
                 return(
                     <div key={index} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                         <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                         </div>
                         <div className='p-4 grid gap-3'>
                             <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                             <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                             <div className='flex gap-3'>
                                 <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                 <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                             </div>
                             <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                         </div>
                     </div>
                 )
             })
         ) : (
             data.map((product,index)=>{
                 return(
                     <Link to={"/product/"+product?._id} key={index} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[300px]  bg-white rounded-sm shadow mt-4 md:mt-0' onClick={scrollTop}>
                         <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex gap-2 justify-center items-center'>
                             <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                         </div>
                         <div className='p-4 grid gap-3'>
                             <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                             <p className='capitalize text-slate-500'>{product?.category}</p>
                             <div className='flex gap-3'>
                                 <p className='text-red-600 font-medium'>{ dispalyINRcurrency(product?.sellingPrice) }</p>
                                 <p className='text-slate-500 line-through'>{ dispalyINRcurrency(product?.price)  }</p>
                             </div>
                             <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                         </div>
                     </Link>
                 )
             })
         )
         
     }
              {
            addToCartLoading && (
                <div className='flex justify-center items-center w-full h-[100vh] fixed  top-0 bottom-0 right-0 left-0 '>
                    <div className='bg-white h-24  w-24 gap-1 flex justify-center  items-center rounded flex-col'>
                    <div className='h-6 w-6 border-[3px] rounded-full animate-spin text-center border-red-600 border-t-[transparent]'>
                    </div>
                        <p className='text-xs'>Adding to cart</p>
                    </div>
                 </div>
            )
         }
    </div>
  )
}

export default VerticalCard
