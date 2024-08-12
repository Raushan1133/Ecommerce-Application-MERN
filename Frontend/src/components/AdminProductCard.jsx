import React, { useState } from 'react'
import {MdModeEditOutline} from 'react-icons/md'
import AdminEditProduct from './AdminEditProduct'
import dispalyINRcurrency from '../helpers/DisplayCurrency'

const AdminProductCard = ({data,fetchData}) => {
    const[editProduct,setEditProduct] = useState(false)
  return (
    <>
      <div className='bg-white p-4 rounded  '>
                <div className='w-40'>
                  <div className='w-32 h-32 flex justify-center items-center'>
                <img src={data?.productImage[0]} className='object-scale-down mx-auto h-full' width={120} height={120} />
                  </div>
                <h1 className='text-ellipsis line-clamp-2 '>{data?.productName}</h1>
                <div>
                <div>
                  <p className='font-semibold'>

                  {
                    dispalyINRcurrency(data?.sellingPrice)
                  }
                  </p>
                  
                 
                </div>
                <div onClick={()=>setEditProduct(true)} className='w-fit ml-auto p-2 hover:bg-green-600 bg-green-100 rounded-full hover:text-white cursor-pointer'>
                    <MdModeEditOutline />
                </div>
                </div>
                </div>
              {
                editProduct && (
                  <AdminEditProduct fetchData={fetchData} productData={data} onClose={()=>setEditProduct(false)} />
                )
              }
              </div>
    </>
  )
}

export default AdminProductCard
