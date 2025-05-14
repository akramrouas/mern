import React, { useState,useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import {Link,useNavigate}  from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from '../slices/authSlice';
import { useLoginMutation } from '../slices/UserApiSlice';
import Loader from '../components/Loader';


const Login = () => {

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const {userInfo} = useSelector((state)=>state.auth)
  const [errors, setErrors] = useState(false);
  const [message,setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [login,{isLoading}] = useLoginMutation();

  useEffect(()=>{
    if (userInfo) {
      navigate("/")
    }

  },[navigate,userInfo])

  const handleSubmit = async(e) =>{
    e.preventDefault();
  

    try {
      const response = await login({email,password}).unwrap()
      dispatch(setUser({...response}));
      navigate("/");
      
    } catch (err) {
      setErrors(true)
      setMessage(err.data.message)
      console.log(err?.data?.message || err.error)

    }

  }
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md mx-auto">
        <div className="mb-8 text-center">
          <div className="mb-6 mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <LogIn className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        
        <form  onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <Mail size={18} />
            </div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email Address"
              className={`block w-full pl-10 pr-3 py-3 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/70`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <Lock size={18} />
            </div>
            <input
              type= 'password'
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Password"
              className={`block w-full pl-10 pr-10 py-3 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/70`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          
       
          
          <button 
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            Sign In
          </button>

          <dir>
            {errors &&
            <div  className="text-lg bg-red-50 p-2"  >
              <h1> {message} </h1>
            </div>
            }

          </dir>

          
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign up
            </Link>
          </div>
        </form>
      </div>
      
      <div className="mt-6 text-center text-white text-sm">
        <p>© 2025 Your Company. All rights reserved.</p>
      </div>
      { isLoading && <Loader/> }
    </div>
  );
};

export default Login;