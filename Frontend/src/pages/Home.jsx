import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <VerticalCardProduct category={'mobiles'} heading={'Smartphones'}/>
      <HorizontalCardProduct category={"airpodes"} heading={"True Wireless"} />
      <HorizontalCardProduct category={"camera"} heading={"Camera & Photography"} />
      <VerticalCardProduct category={'watches'} heading={'Trending Watches'}/>
      <VerticalCardProduct category={'mouse'} heading={'Mouse'}/>
      <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
      <VerticalCardProduct category={"earphones"} heading={"Top Earphones"}/>
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
    </div>
  )
}

export default Home
