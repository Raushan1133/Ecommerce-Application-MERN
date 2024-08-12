import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProduct = () => {
  const [openUploadProduct , setOpenUploadProduct] = useState(false);
  const [allProduct,setAllProduct] = useState([]);

  const fetchAllProduct = async()=>{
    const response = await fetch(SummaryApi.allProduct.url);
    const responseData = await response.json();
    setAllProduct(responseData?.data || [])
  }
  useEffect(()=>{
    fetchAllProduct()
  },[])
  return (
    <div>
      <h1></h1>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-3 rounded-full' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      {/* All products */}
      <div className='flex items-center gap-5 py-4 flex-wrap h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product,index)=>{
            return(
              <AdminProductCard fetchData={fetchAllProduct} data={product} key={index+"allproduct"} />
               
            )
          })
        }
      </div>

      {/* UploadProduct component */}
      {
        openUploadProduct && (
          <UploadProduct fetchData={fetchAllProduct} onClose={()=>{setOpenUploadProduct(false)}} />

        )
      }
    </div>
  )
}

export default AllProduct
