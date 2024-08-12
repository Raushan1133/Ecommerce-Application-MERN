import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helpers/ProductCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const [filterCategoryList , setFilterCategoryList] = useState([]);
    const location = useLocation();
    const urlSearch= new URLSearchParams(location.search);
    const urlCategoryListInArray = urlSearch.getAll("category");

    const urlCategoryListObject = {}
    urlCategoryListInArray.forEach(el =>{
      urlCategoryListObject[el]  = true
    })
    const [selectCategory , setSelectCategory] = useState(urlCategoryListObject)

    const[sortBy,setSortBy] = useState("")

    const fetchData = async ()=>{
      const response = await fetch(SummaryApi.filterProduct.url,{
        method: SummaryApi.filterProduct.method,
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          category:filterCategoryList
        })
      })

      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    }

    const handleSelectCategory = (e)=>{
      const {name,value,checked} = e.target
      setSelectCategory((preve)=>{
        return{
          ...preve,
          [value] : checked
        }
      })
    }

    useEffect(()=>{
      fetchData()
    },[filterCategoryList])

    useEffect(()=>{
      const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName=>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null;
      }
    ).filter(el => el)

    setFilterCategoryList(arrayOfCategory)
    // Format for url change when change on the checkbox
    const urlformat = arrayOfCategory.map((el,index) =>{
      if((arrayOfCategory.length -1) === index ){
        return `category=${el}`
      }
      
      return `category=${el}&&`
    })
    navigate("/product-category?"+urlformat.join(""))
    },[selectCategory])

    const handleOnchangeSortBy = (e)=>{
      const {value} = e.target
      setSortBy(value)
      if(value === 'asc'){
        setData((prev)=> prev.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }
      if(value === 'dsc'){
        setData((prev)=> prev.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }
    }

    useEffect(()=>{

    },[sortBy])

  return (
    <div className='container mx-auto md:p-4 mb-4 mt-7 md:mt-0'>
      {/* Desktop version */}
      <div className=' grid grid-cols-[100px,1fr]  lg:grid-cols-[200px,1fr]'>
        {/* Left side bar */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none'>
          {/* Sort by */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
            <form className='text-sm flex gap-2 flex-col py-2'>
              <div className='flex items-center gap-3'>
                <input type="radio" name="sortBy" checked={sortBy === 'asc'} value={"asc"} onChange={handleOnchangeSortBy}/>
                <label>Price - Low to High</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type="radio" name="sortBy" value={"dsc"} checked={sortBy === 'dsc'} onChange={handleOnchangeSortBy}/>
                <label >Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter by */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
            <form className='text-sm flex gap-2 flex-col py-2'>
              {
                productCategory.map((categoryName,index)=>{
                  return(
                    <div key={index} className='flex items-center gap-3'>
                      <input type="checkbox" name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                      <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>
        </div>

        {/* Right side */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>
        <div className='min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none max-h-[calc(100vh-120px)]'>
          {
            data.length !==0 && (
              <VerticalCard   data={data} loading={loading} />
            )
          }
        </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
