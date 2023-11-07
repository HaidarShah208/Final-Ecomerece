import React, { useContext } from 'react'
import Layout from '../../Components/Layout/Layout'
// import myContext from '../../Context/myContext'
import HeroSection from '../../Components/heroSection/HeroSection'
import Filter from '../../Components/filter/Filter'
import ProductCard from '../../Components/productCard/ProductCard'
import Testimonials from '../../Components/testimonials/Testimonials'
import Track from '../../Components/track/Track'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../Redux/cartSlice'
import { Link } from 'react-router-dom'

function Home() {
  // const context=useContext(myContext)
  // console.log(context)
  
   const dispatch=useDispatch();
   const cartItem=useSelector((state)=>state.cart)
  
   console.log(cartItem)
   
  //  const addCart=()=>{
  //   dispatch(addToCart('shirt'))
  //  }

  //  const deleteCart=()=>{
  //   dispatch(deleteFromCart('shirt'));
  //  }
  return (
    <Layout>
     <HeroSection />
     <Filter/>
     <ProductCard/>
     <div className="flex justify-center -mt-10 mb-4">
      <Link to='/allproducts'>
        <button className='bg-gray-300 px-5 py-2'>See More</button>
      </Link>
       </div>
     <Track/>
     <Testimonials/>
    </Layout>
  )
}

export default Home