import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({imageUrl , onClose}) => {
  return (
    <div className='fixed  bottom-0 top-0 right-0 left-0 flex justify-center items-center'>
        <div className='bg-white shadow-lg rounded-none max-w-5xl mx-auto '>
            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer p-4 ' onClick={onClose}>
                <CgClose />
            </div>
        <div className='flex justify-center max-w-[80vh] p-4 max-h-[80vh]'>
            <img src={imageUrl} className='w-full h-full ' alt="" />
        </div>
        </div>
    </div>
  )
}

export default DisplayImage
