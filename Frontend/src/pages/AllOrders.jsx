import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import dispalyINRcurrency from '../helpers/DisplayCurrency'
const AllOrders = () => {
  const [data,setData] = useState([])
    const [loading,setLoading] = useState(false);

  const fetchOrderDetails  = async ()=>{
    setLoading(true);
    const response = await fetch(SummaryApi.getAllOrders.url,{
      method:SummaryApi.getAllOrders.method,
      credentials:'include'
    });

    const responseData = await response.json();
    setLoading(false);
    setData(responseData?.data)

  }

  useEffect(()=>{
    fetchOrderDetails();
  },[])
  return (
    <div>
      {
        !data[0] && (
          <p>No Order available</p>
        )
      }

      <div className='md:p-4 pb-4 pt-10 w-full '>
        {
            loading ? (
                <div className='w-full h-[calc(100vh-250px)] flex text-center justify-center items-center flex-col'>
                    <div ><p>Loading ...</p></div>
                    <div className='flex justify-center'>
                        <div className='h-6 w-6 border-[3px] rounded-full animate-spin text-center border-red-600 border-t-[transparent]'></div>
                    </div>
                </div>
            ): (

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
                                Shipping Amount : {shipping.shipping_amount}
                              </div>
                            )
                          })
                        }
                      </div>
                        </div>
                      </div>
                      <div className='font-semibold w-fit ml-auto lg:text-lg'>
                        Total Amount : {item.totalAmount}
                      </div>
                      </div>
                    </div>
                  )
                })
            )
        }
      </div>
    </div>
  )
}

export default AllOrders
