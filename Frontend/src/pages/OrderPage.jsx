import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import dispalyINRcurrency from '../helpers/DisplayCurrency'
const OrderPage = () => {
  const [data,setData] = useState([])

  const fetchOrderDetails  = async ()=>{
    const response = await fetch(SummaryApi.getOrder.url,{
      method:SummaryApi.getOrder.method,
      credentials:'include'
    });

    const responseData = await response.json();
    setData(responseData?.data)
  }

  useEffect(()=>{
    fetchOrderDetails();
  },[])
  return (
    <div>
      {
        !data[0] && (
          <p className='h-[calc(100vh-145px)] sm:h-[calc(100vh-125px)] text-2xl flex items-center justify-center font-semibold text-red-600' >No Order available</p>
        )
      }

      <div className='md:p-4 pb-4 pt-10 w-full '>
        {
          data?.map((item,index)=>{
            return(
              <div key={item.userId+index} className=''>
                <p className='font-medium text-lg'>{moment(item.createdAt).format('LL')}</p>
                <div className='border rounded'>
                <div className='flex justify-between lg:flex-row flex-col'>
                <div className='grid gap-1'>
                  {
                    item?.productDetails?.map((product,index)=>{
                      return(
                        <div key={product.productId+index} className='flex gap-3 bg-slate-100'>
                          <img src={product.image[0]} alt="" className='w-28 h-28 bg-slate-200 object-scale-down p-2' />
                          <div>

                          <div className='font-medium text-ellipsis line-clamp-1'>{product.name}</div>
                          <div className='flex items-center gap-5 mt-1'>
                          <div className='text-lg text-red-600'>{dispalyINRcurrency(product.price)}</div>
                          <p>Quantity : {product.quantity}</p>
                          </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>

                  <div className='flex gap-4 flex-col p-2 min-w-[300px]'>
                  <div>
                  <div className='text-lg font-medium'>Payment Details : </div>
                  <p className='ml-1'>Payment method : {item.paymentDetails.payment_method_type[0]}</p>
                  <p className='ml-1'>Payment Status : {item.paymentDetails.payment_status}</p>
                </div>
                <div>
                  <div className='text-lg font-medium'>Shipping Details : </div>
                  {
                    item?.shipping_options?.map((shipping,index)=>{
                      return(
                        <div key={shipping.shipping_rate} className=' ml-1'>
                          Shipping Amount : {dispalyINRcurrency(shipping.shipping_amount)}
                        </div>
                      )
                    })
                  }
                </div>
                  </div>
                </div>
                <div className='font-semibold w-fit ml-auto lg:text-lg'>
                  Total Amount : {dispalyINRcurrency(item.totalAmount)}
                </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default OrderPage
