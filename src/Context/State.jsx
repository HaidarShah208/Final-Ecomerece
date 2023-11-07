import React, { useEffect, useState } from 'react'
import myContext from './myContext'
import {Timestamp, collection,orderBy, onSnapshot, query, setDoc,doc, deleteDoc,getDocs } from 'firebase/firestore'
import { db } from '../Firebase/Config'
import { addDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'
 

function State(props) {
  
     const [mode,setMode]=useState('light')

     const toggleMode=()=>{
      if(mode==='light'){
        setMode('dark')
        document.body.style.backgroundColor='rgb(17,24,39)'
      }
      else{
        setMode('light')
        document.body.style.backgroundColor='white'
      }

    }

    const [products,setProducts]=useState({
      title:'',
      price:'',
      imageUrl:'',
      catageroy:'',
      description:'',
      time:Timestamp.now(),
      date:new Date().toLocaleString(
        "en-US",
        {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }
    )
    })
    // const navigate=useNavigate()
    

    // add products
    const addProduct = async () => {
      if (products.title == '' || products.price == '' || products.imageUrl == '' || products.category == '' || products.description == '') {
        return toast.error('Please fill all fields')
      }
      setLoading(true)
      try {
        const productRef = collection(db, "products")
        await addDoc(productRef, products)
        toast.success("Product Add successfully")
      setTimeout(()=>{
       window.location.href='/home'
      },1000)
        getProductData()
        closeModal()
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }


    //get products
    const [product,setProduct]= useState([])
    const getProductData=async()=>{
      setLoading(true)
      try{
        const q=query(
          collection(db,'products'),
          orderBy('time'),
        );

        const data=onSnapshot(q,(QuerySnapshot)=>{
          const productArray=[]
          QuerySnapshot.forEach((doc)=>{
            productArray.push({...doc.data(),id:doc.id})
          })
          setProduct(productArray)
          setLoading(false)
        })
        return ()=>data
      }catch(error){
        console.log(error)
        setLoading(false)

      }
    }


    //update products
    const editHandle=(item)=>{
      setProducts(item)
    }

    const updateProduct=async()=>{
      setLoading(true)
      try{
         await setDoc(doc(db,'products',products.id),products)
         toast.success('product update successfully')
         getProductData()
         setTimeout(() => {
          window.location.href = '/dashboard'
      }, 800);
         setLoading(false)
      }catch(error){
        console.log(error)
      }
    }

     //delte doc
    const deleteProduct=async(item)=>{
      setLoading(true)
      try{
       await deleteDoc(doc(db,'products',item.id))
       toast.success('product update successfully')
       getProductData()
       setLoading(false)
      }catch(error){
        console.log(error)
      }
    }
    
    
    
    
    //all orders 
    const [order, setOrder] = useState([]);
    const getOrderData = async () => {
      setLoading(true)
      try {
        const result = await getDocs(collection(db, "orders"))
        const ordersArray = [];
        result.forEach((doc) => {
          ordersArray.push(doc.data());
          setLoading(false)
        });
        setOrder(ordersArray);
        console.log(ordersArray)
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    
    
    useEffect(() => {
      getProductData();
      getOrderData()
  
    }, []);

    //user or dashboard
    const [user, setUser] = useState([]);

    const getUserData = async () => {
      setLoading(true)
      try {
        const result = await getDocs(collection(db, "users"))
        const usersArray = [];
        result.forEach((doc) => {
          usersArray.push(doc.data());
          setLoading(false)
        });
        setUser(usersArray);
        console.log(usersArray)
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    useEffect(()=>{
      getProductData();
      getOrderData();
      getUserData();
    },[])
    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')

    const [loading,setLoading]=useState(false)
    return (
    <div>
        <myContext.Provider value={{mode,toggleMode,loading,setLoading,products,setProducts,addProduct,product,editHandle,updateProduct,deleteProduct,order,user,searchkey,setSearchkey,filterPrice,setFilterPrice,filterType,setFilterType}}>
         {props.children}
        </myContext.Provider>
    </div>
  )
}

export default State