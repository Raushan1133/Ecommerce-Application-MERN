import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import dispalyINRcurrency from '../helpers/DisplayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({category , heading}) => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [addToCartLoading , setAddToCartLoading] = useState(false)
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
        setAddToCartLoading(true);
       await addToCart(e,id)
       setAddToCartLoading(false);
       fetchUserAddToCart()
    }

    const fetchData = async()=>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct?.data)
    }
    useEffect(()=>{
        fetchData();
    },[])

    const scrollRight = ()=>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = ()=>{
        scrollElement.current.scrollLeft -= 300
    }
  return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
        <button   className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
        <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight /></button>
        {
            loading ?(
                loadingList.map((el,index)=>{
                    return(
                        <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                        <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                        </div>
                        <div className='p-4 grid w-full gap-2'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                            <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                            <div className='flex gap-3 w-full'>
                                <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                            </div>
                            <button className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                        </div>
                    </div>
                    )
                })
            ):(
                data.map((product,index)=>{
                    return(
                        <Link to={"product/"+product?._id} key={"index"+index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                <img src={product.productImage[0]} className='object-scale-down mix-blend-multiply h-full hover:scale-110 transition-all'/>
                            </div>
                            <div className='p-4 grid'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                <p className='capitalize text-slate-500'>{product?.category}</p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium text-sm'>{ dispalyINRcurrency(product?.sellingPrice) }</p>
                                    <p className='text-slate-500 text-sm font-semibold  line-through'>{ dispalyINRcurrency(product?.price)  }</p>
                                </div>
                                <div className='w-full mt-2 flex items-center justify-center'>
                                <button onClick={(e)=>handleAddToCart(e,product?._id)} className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full'>Add to Cart</button>
                                </div>
                            </div>
                        </Link>
                    )
                })
               )
            
        }
        </div>
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

export default HorizontalCardProduct
