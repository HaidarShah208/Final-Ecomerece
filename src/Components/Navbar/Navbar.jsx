import React, { useContext,useState,Fragment,useEffect } from "react";
import myContext from "../../Context/myContext";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { RxCross2 } from 'react-icons/rx'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector } from "react-redux";
import ali from '../../assets/ali.png'

function Navbar() {
  const navigate=useNavigate()
  const context = useContext(myContext);
  const { mode, toggleMode } = context;

  const [open, setOpen] = useState(false)

  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user.user.email)

  const logout=()=>{
    localStorage.clear('user')
    navigate('/login')
  }
  
  //for cartItems length
  const cartItems=useSelector((state)=>state.cart) 
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}, [cartItems])
  return (

    <div className="bg-gray sticky top-0 z-50  "  >
    {/* Mobile menu */}
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', }}>
              <div className="flex px-4 pb-2 pt-28">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <RxCross2 />
                </button>
              </div>
              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                
                <Link to={'/allproducts'} className="text-sm font-medium text-gray-900 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                  All Products
                </Link>
                <div className="flow-root">
                  <Link to={'/order'} style={{ color: mode === 'dark' ? 'white' : '', }} className="-m-2 block p-2 font-medium text-gray-900">
                    Order
                  </Link>
                </div>

                {user?.user?.email === 'shah208@gmail.com'?
                  <div className="flow-root">
                     <Link to={'/dashboard'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Admin
                  </Link>
                  </div> : ""
                }

                <div className="flow-root">
               {user?  <Link to={'/lgoin'}> 
                <a onClick={logout} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Logout
                  </a>
               </Link>:""}
                </div>
                <div className="flow-root">
                  <Link to={'/'} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                    <img
                      className="inline-block w-10 h-10 rounded-full"
                      src={ali}
                      alt="Dan_Abromov" /> </Link>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6">
                <a href="#" className="-m-2 flex items-center p-2">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                    className="block h-auto w-5 flex-shrink-0"
                  />
                  <span className="ml-3 block text-base font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>Pakistan</span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>



    {/* // Desktop ///////////////////////////////////// */}
    <div>
      <header className="relative bg-white">
        <p
          className="flex h-10 items-center justify-center bg-gray-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
          style={{backgroundColor: mode === "dark" ? "rgb(62 64 66)" : "",color: mode === "dark" ? "white" : "",}}>
          Get free delivery on orders over Rs.300
        </p>
        <nav
          aria-label="Top"
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl "
          style={{backgroundColor: mode === "dark" ? "#282c34" : "",color: mode === "dark" ? "white" : "",}}>
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
                style={{backgroundColor: mode === "dark" ? "rgb(80 82 87)" : "",color: mode === "dark" ? "white" : "",
                }}
              >
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                </svg>
              </button> 
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/" className="flex">
                  <div className="flex ">
                    <h1
                      className=" text-2xl font-bold text-black  px-2 py-1 rounded"
                      style={{ color: mode === "dark" ? "white" : "" }}>
                      Easy Buy
                    </h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    to="/allproducts"
                    className="text-sm font-medium text-gray-700 "
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    All Products
                  </Link>
                 
                 
                  
                  {user?.user?.email === 'shah208@gmail.com'?
                   <Link to={'/dashboard'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Admin
                  </Link> : ""
                }

                  <Link to='/login'>
                  <a onClick={logout}
                    className="text-sm font-medium text-gray-700 cursor-pointer  "
                    style={{ color: mode === "dark" ? "white" : "" }}>
                    Logout
                  </a>
                 </Link>
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      src="data:image/jpeg;base64,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"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span
                      className="ml-3 block text-sm font-medium"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Pakistan
                    </span>
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <button className="" onClick={toggleMode}>
                    {/* <MdDarkMode size={35} style={{ color: mode === 'dark' ? 'white' : '' }} /> */}
                    {mode === "light" ? (
                      <FiSun className="" size={30} />
                    ) : "dark" ? (
                      <BsFillCloudSunFill size={30} />
                    ) : (
                      ""
                    )}
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link
                    to="/cart"
                    className="group -m-2 flex items-center p-2"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>

                    <span className="ml-2 text-sm font-medium text-gray-700 group-" style={{ color: mode === "dark" ? "white" : "" }}>
                      {cartItems.length}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
    </div>
  );
}

export default Navbar;
