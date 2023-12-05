import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../../Context/myContext';
import { toast } from 'react-toastify';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth,db} from '../../../Firebase/Config'
import { Timestamp,addDoc,collection } from 'firebase/firestore';
import { TailSpin } from 'react-loader-spinner'




function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate=useNavigate(); 

    const context = useContext(myContext);
    const { loading, setLoading } = context;
    
    const signup= async()=>{
        if (name === "" || email === "" || password === "") {
            return toast.error("All fields are required")
        }

        try{
        setLoading(true)
            const users = await createUserWithEmailAndPassword(auth, email, password);
            console.log(users)
            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time : Timestamp.now()
            }
            const userRef = collection(db, "users")
            await addDoc(userRef, user);
            toast.success("Signup Succesfully")
            setName("");
            setEmail("");
            setPassword("");
            setLoading(false)
            navigate('/')
            
        }catch(error){
       console.log(error)
       setLoading(false)
        }
    }
    return (
        <div className=' flex justify-center items-center h-screen'>
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="text"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>
                <div>
                    <input type="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button onClick={signup}
                        className=' bg-gray-100 w-full text-gray font-bold  px-2 py-2 rounded-lg'>
                        {loading ?<div className='flex justify-center'>
                          <TailSpin
                            height="30"
                            width="30"
                            color="red"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            />
                          </div>:'Sign Up'}
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className='text-red-500 font-bold' to={'/'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup