import React, { useState } from 'react'
import {CgClose} from 'react-icons/cg'
import {FaCloudUploadAlt} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import productCategory from '../helpers/ProductCategory'
import uploadImage from '../helpers/uploadImage'
import DisplayImage from './DisplayImage'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import Loading from './Loading'

const UploadProduct = ({onClose,fetchData}) => {
    const [loading,setLoading] = useState(false)
    const[submitLoading , setSubmitLoading] = useState(false)
    const [data,setData] = useState({
        productName:"",
        brandName:"",
        category:"",
        productImage:[],
        description:"",
        price:"",
        sellingPrice:""
    })
    const [OpenFullScreenImage , SetopenFullScreenImage] = useState(false)
    const[fullScreenImage , setFullScreenImage] = useState("")
    
    const handleOnchange = (e)=>{
        const {name,value} = e.target
        setData((preve)=>{
            return{
                ...preve,
                [name] :value
            }
        })
    }
    const handleUploadProduct = async (e)=>{
        const file = e.target.files[0];
        setLoading(true)
        const uploadImageCloudinary = await uploadImage(file)
        setData((preve)=>{
            return{
                ...preve,
                productImage:[...preve.productImage , uploadImageCloudinary.url]
            }
        })
        setLoading(false);
    }

    const handleDeleteProductImage = async (index)=>{
        const newProductImage = [...data.productImage]
        newProductImage.splice(index,1)
        setData((preve)=>{
            return{
                ...preve,
                productImage:[...newProductImage]
            }
        })
    }

    // Upload product
    const handleSubmit = async(e)=>{
        e.preventDefault();
            setSubmitLoading(true)
        const response = await fetch(SummaryApi.uploadProduct.url,{
            method:SummaryApi.uploadProduct.method,
            credentials:'include',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        })

        const responseData = await response.json()
        setSubmitLoading(false)
        if(responseData?.success){
            toast.success(responseData?.message);
            onClose();
            fetchData();
        }
        if(responseData?.error){
            toast(responseData?.message)
            console.log(responseData)
        }
    }
    
  return (
    <div className='fixed w-full bg-slate-200  bg-opacity-35 h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center p-3'>
            <h2 className='font-bold text-lg'>Upload Product</h2>
            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                <CgClose />
            </div>
        </div>
      <form onSubmit={handleSubmit} className='grid p-4 gap-3 h-full overflow-y-scroll pb-5'>
        <label htmlFor="productName">Product Name: </label>
        <input type="text"
         name="productName" 
         id="productName" 
         placeholder='Enter Product Name' 
         value={data.productName} 
         onChange={handleOnchange}
         className='p-2 bg-slate-100 border rounded '
         required
         />

        <label htmlFor="brandName" className='mt-3'>Brand Name: </label>
        <input type="text"
         name="brandName" 
         id="brandName" 
         placeholder='Enter Brand Name' 
         value={data.brandName} 
         onChange={handleOnchange}
         className='p-2 bg-slate-100 border rounded '
         required
         />
         
         <label htmlFor="category" className='mt-3'>Category: </label>
        <select required name="category" value={data.category} id="" className='p-2 bg-slate-100 border rounded' onChange={handleOnchange}>
            <option value="">Select Category</option>
            {
                productCategory.map((element,index)=>{
                    return (
                        <option value={element.value}key={element.value+index}>{element.label}</option>
                    )
                })
            }
        </select>
        <label htmlFor='productImage' className='mt-3'>Product Image :</label>
              <label htmlFor='uploadImageInput'>
              <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                        <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                          <span className='text-4xl'><FaCloudUploadAlt/></span>
                          <p className='text-sm'>Upload Product Image</p>
                          <input type='file' id='uploadImageInput'  className='hidden' onChange={handleUploadProduct}/>
                        </div>
              </div>
              </label> 
        <div>
            {
                data?.productImage[0]? (
                    <div className='flex items-center gap-2'>
                        {
                            data.productImage.map((el,index)=>{
                                return(
                                    <div className='relative group'>
                                        <img src={el} width={80} height={80} className='bg-slate-100 cursor-pointer rounded  object-scale-down' alt={el} onClick={()=>{
                                        SetopenFullScreenImage(true)
                                        setFullScreenImage(el)
                                    }} />
                                    <div className='absolute cursor-pointer bottom-0 right-0 p-1 bg-red-600 text-white rounded-full hidden group-hover:block' onClick={()=>handleDeleteProductImage(index)}>
                                        <MdDelete />
                                    </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (
                   loading ? (<div className='z-10'> <Loading /></div>) :(<p className='text-red-600 text-xs'>*Upload Product Image</p>) 
                )
            }
        </div>
        <label htmlFor="price">Price: </label>
        <input type="number"
         name="price" 
         id="price" 
         placeholder='Enter Price' 
         value={data.price} 
         onChange={handleOnchange}
         className='p-2 bg-slate-100 border rounded '
         required
         />

        <label htmlFor="sellingPrice">Selling Price: </label>
        <input type="number"
         name="sellingPrice" 
         id="sellingPrice" 
         placeholder='Enter Selling Price' 
         value={data.sellingPrice} 
         onChange={handleOnchange}
         className='p-2 bg-slate-100 border rounded '
         required
         />

         <label htmlFor="description">Description: </label>
        <textarea required name="description" className='h-28 bg-slate-100 resize-none p-1' placeholder='Enter product description' id="description" onChange={handleOnchange} value={data.description} ></textarea>

        <button className='px-2 py-2 mb-10 bg-red-600 text-white hover:bg-red-700'> {submitLoading ? (<div className='flex justify-center'>
       <div className='h-6 w-6 border-[3px] rounded-full animate-spin text-center border-white border-t-[transparent]'>
       </div>
    </div>):(<div>Upload Product</div>)} </button>
      </form>
      </div>
      {/* Display image full screen */}
      {
        OpenFullScreenImage && (
            <DisplayImage imageUrl={fullScreenImage} onClose={()=>SetopenFullScreenImage(false)}  />
        )
      }
    </div>
  )
}

export default UploadProduct
