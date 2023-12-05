// Login.js

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../Firebase/Config';
import { TailSpin } from 'react-loader-spinner';
import { Modal, Input, Button } from 'antd';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const navigate = useNavigate();

  const signin = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('user', JSON.stringify(result));
      toast.success('Signin Successfully', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      navigate('/home');
    } catch (error) {
      toast.error('Signin Failed', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent successfully', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (error) {
      toast.error('Failed to send password reset email', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  const showResetModal = () => {
    setResetModalVisible(true);
  };

  const handleResetModalOk = () => {
    resetPassword();
    setResetModalVisible(false);
  };

  const handleResetModalCancel = () => {
    setResetModalVisible(false);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-gray-800 px-10 py-10 rounded-xl'>
        <div>
          <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
        </div>
        <div>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
            placeholder='Email'
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
            placeholder='Password'
          />
        </div>
        <div className='flex justify-center mb-3'>
          <button
            onClick={signin}
            className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'
            disabled={loading}
          >
            {loading ? (
              <div className='flex justify-center'>
                <TailSpin height='30' width='30' color='white' ariaLabel='tail-spin-loading' />
              </div>
            ) : (
              'Login'
            )}
          </button>
        </div>
        <div>
          <h2 className='text-white'>
            Don't have an account <Link className='text-yellow-500 font-bold' to={'/signup'}>Signup</Link>
          </h2>
        </div>
        <div className='flex'>
        <h6 onClick={showResetModal} className='text-white cursor-pointer'>
            <b>Password reset</b>
          </h6>
        </div>

        {/* Password Reset Modal */}
        <Modal
          title='Password Reset'
          visible={resetModalVisible}
          onOk={handleResetModalOk}
          onCancel={handleResetModalCancel}
          footer={[
            <Button key='cancel' onClick={handleResetModalCancel}>
              Cancel
            </Button>,
            <Button key='reset' type='primary' className='text-black' onClick={handleResetModalOk}>
              Reset Password
            </Button>,
          ]}
        >
          <Input
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Modal>
      </div>
    </div>
  );
}

export default Login;
