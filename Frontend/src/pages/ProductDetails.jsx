import React, { useCallback, useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import SummaryApi from '../common';
import { FaStar , FaStarHalf } from 'react-icons/fa'
import dispalyINRcurrency from '../helpers/DisplayCurrency';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {

  const [data,setData] = useState({
    productName:"",
    brandName:"",
    category:"",
    productImage:[],
    description:"",
    price:"",
    sellingPrice:""
  })

  const params = useParams();
  const[loading,setLoading] = useState(false)
  const [addToCartLoading , setAddToCartLoading] = useState(false)
  const productImageLoading = new Array(4).fill(null);
  const [activeImage , setActiveImage] = useState("");
  const fetchProductDetails = async ()=>{
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url,{
      method:SummaryApi.productDetails.method,
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        productId:params?.id
      })
    })

    const responseData = await response.json();
    setLoading(false);
    setData(responseData?.data);
    setActiveImage(responseData?.data?.productImage[0]);
  }


  useEffect(()=>{
    fetchProductDetails()
  },[params])
  const handleMouseEnter = (imageUrl)=>{
    setActiveImage(imageUrl);
  }
  const[zoomImageCoordinate , setZoomImageCoordinate] = useState({
    x:0,
    y:0
  })
  const [zoomImage , setZoomImage] = useState(false)
  const { fetchUserAddToCart } = useContext(Context)

  const navigate = useNavigate();

  const handleZoomImage = useCallback((e)=>{
    setZoomImage(true);
    const { left , top , width , height } = e.target.getBoundingClientRect();

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    setZoomImageCoordinate({
      x,
      y
    })
  },[zoomImageCoordinate]);

  const handleZoomOutImage = ()=>{
    setZoomImage(false);
  }
  const handleAddToCart = async(e,id)=>{
    setAddToCartLoading(true)
    await addToCart(e,id);
    setAddToCartLoading(false);
    fetchUserAddToCart();
  }

  const handleBuyProduct = async(e,id)=>{
    setAddToCartLoading(true)
    await addToCart(e,id);
    setAddToCartLoading(false);
    fetchUserAddToCart();
    navigate("/cart");
  }
  return (
    <div className='container mx-auto md:p-4 pb-4 pt-12 px-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4 '>
        {/* Product image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4 justify-center items-center'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply ' alt="product" onMouseMove={handleZoomImage} onMouseLeave={handleZoomOutImage} />

            {/* Product zoom */}
            {
              zoomImage && (
                <div className='absolute min-w-[400px] min-h-[400px]  bg-slate-200 p-1 ml-5 -right-[410px] top-0 hidden lg:block overflow-hidden'>

              <div className='w-full h-full min-h-[400px] min-w-[400px] bg-slate-200 mix-blend-multiply scale-150' style={{backgroundImage:`url(${activeImage})`,backgroundRepeat:'no-repeat',
              backgroundPosition:`${zoomImageCoordinate.x *100}% ${zoomImageCoordinate.y *100}%`
            }}>

              </div>
            </div>
              )
            }
            
          </div>
            <div className='h-full'>
              {
                loading ? (
                  <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full '>
                    {
                      productImageLoading.map((el,index)=>{
                        return (
                          <div key={"loadingimage"+index} className='h-20 w-20 bg-slate-200 rounded animate-pulse'>

                          </div>
                        )
                      })
                    }
                  </div>
                ) : (
                  <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full justify-center'>
                    {
                      data?.productImage?.map((imageUrl,index)=>{
                        return (
                          <div key={imageUrl} className='h-20 w-20 bg-slate-200 rounded p-1'>
                            <img src={imageUrl} alt="Loading" className=' cursor-pointer w-full h-full object-scale-down mix-blend-multiply' onMouseEnter={()=>handleMouseEnter(imageUrl)} onClick={()=>handleMouseEnter(imageUrl)}/>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }
            </div>
        </div>
        {/* Product details */}
        {
          loading ? (
            <div className='grid w-full'>
            <p className=' bg-slate-200 animate-pulse h-6 w-full  rounded-full'></p>
            <h2 className='text-2xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse '></h2>
            <p className='capitalize bg-slate-200 min-w-[100px] animate-pulse h-6 text-slate-400'>  </p>

            <div className='flex items-center gap-1 bg-slate-200 h-6 animate-pulse'>
              
            </div>

            <div className='flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl h-6 animate-pulse'>
              <p className='bg-slate-200 h-6 animate-pulse w-full'></p>
              <p className='line-through bg-slate-200 h-6 animate-pulse w-full'></p>
            </div>

              <div className='flex items-center w-full bg-slate-200 animate-pulse gap-3 mt-2'>
                <button className='h-6 w-full bg-slate-200 rounded animate-pulse'></button>
                <button className='h-6 w-full bg-slate-200 rounded animate-pulse'></button>
              </div>

              <div>
                <p className='h-6 bg-slate-200 rounded animate-pulse'> </p>
                <p className='h-10 bg-slate-200 rounded animate-pulse'></p>
              </div>

        </div>
          ):(
            <div className='flex flex-col gap-1 '>
            <p className='bg-red-200 text-red-600 px-2 rounded-full w-fit'>{data?.brandName}</p>
            <h2 className='text-2xl lg:text-4xl font-medium '> {data?.productName} </h2>
            <p className='capitalize text-slate-400'> {data?.category} </p>

            <div className='text-red-600 flex items-center gap-1'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className='flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl'>
              <p className='text-red-600'>{dispalyINRcurrency(data?.sellingPrice)}</p>
              <p className='text-slate-400 line-through'>{dispalyINRcurrency(data?.price)}</p>
            </div>

              <div className='flex items-center gap-3 mt-2'>
                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e)=>{handleBuyProduct(e,data?._id)}} >Buy</button>
                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-transparent' onClick={(e)=>{handleAddToCart(e,data?._id)}}>Add To Cart</button>
              </div>

              <div>
                <p className='text-slate-600 font-medium my-1'> Description: </p>
                <p>{data?.description}</p>
              </div>

        </div>
          )
        }
      </div>
        
      {
        data.category && (
          <CategroyWiseProductDisplay category={data?.category} heading={"Recommended Product"}/>
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

export default ProductDetails
