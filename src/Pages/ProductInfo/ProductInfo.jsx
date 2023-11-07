import React, { useContext,useState,useEffect } from 'react'
import Layout from '../../Components/Layout/Layout'
import { db } from '../../Firebase/Config'
import { getDoc,doc } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import myContext from '../../Context/myContext'
import { addToCart } from '../../Redux/cartSlice'
import { toast } from 'react-toastify'

function ProductInfo() {
    const context=useContext(myContext)
    const {loading,setLoading}=context


    const [products, setProducts] = useState('')
    const params = useParams()


    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart)
    // console.log(cartItems)

    // add to cart
    const addCart=(product)=>{
        dispatch(addToCart(product))
        toast.success('added to cart')
       }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])
    const getProductData = async () => {
        setLoading(true)
        try {
            const productTemp = await getDoc(doc(db, "products", params.id))
            // console.log(productTemp)
            setProducts(productTemp.data());
            // console.log(productTemp.data())
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    useEffect(() => {
        getProductData()

    }, [])
    return (
        <Layout>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-32 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img  style={{width:'15rem'}}
                            alt="ecommerce"
                            className="md:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src={products.imageUrl}
                        />
                        <div className="md:w-1/2 md:ms-5 sm:mt-9 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                           
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                               {products.title}
                            </h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-indigo-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-indigo-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-indigo-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-indigo-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-indigo-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <p>tell me review</p>                                     
                                </span>
                            </div>
                            <p className="leading-relaxed border-b-2 mb-5 pb-5">
                                {products.description}
                            </p>
                         
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">
                                  Rs. {products.price}
                                </span>
                                <button onClick={()=>addCart(products)} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                    Add To Cart
                                </button>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    )
}

export default ProductInfo