import React, { useState,useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Check, AlertCircle } from 'lucide-react';
import {Link,useNavigate}  from 'react-router-dom'
import {useDispatch,useSelector } from "react-redux";
import { setUser } from '../slices/authSlice';
import {useInscriptionMutation} from "../slices/UserApiSlice"



const Register = () => {
  const [name, setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [ConfirmPassword,setConfirmPassword] = useState();

  const [errors, setErrors] = useState({});
  const {userInfo} = useSelector((state)=>state.auth)
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inscription, { isLoading, error }] = useInscriptionMutation();


  const handleSubmit = async(e) => {
    e.preventDefault();
    if(password !== ConfirmPassword){
      alert("password does not Match !!")
    }
    else{
      try {
        const response  = await inscription({name,email,password}).unwrap()
        dispatch(setUser({...response}))
        navigate("/");
        
      } catch (error) {
          console.log(error)
      }
    }
    
  };

  
  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto transition-all duration-500 transform animate-fade-in">
        <div className="text-center">
          <div className="mb-6 mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for registering, {formData.name}. We've sent a confirmation email to {formData.email}.
          </p>
          <button
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
          >
            Back to Register
          </button>
        </div>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Sign up to get started with our service</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <User size={18} />
            </div>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Full Name"
              className={`block w-full pl-10 pr-3 py-3 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/70`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.name}
              </p>
            )}
          </div>
          
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
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.email}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <Lock size={18} />
              </div>
              <input
                type='password'
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
              
                className={`block w-full pl-10 pr-10 py-3 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/70`}
              />
             
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <Lock size={18} />
              </div>
              <input
                type='password'
                name="ConfirmPassword"
                value={ConfirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                placeholder="ConfirmPassword"
                className={`block w-full pl-10 pr-10 py-3 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/70`}
              />
            
            </div>
            
            {errors.password && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.password}
              </p>
            )}
          
          </div>
          
     
          
          <div className="flex items-start">
           
            <div className="ml-2">
             
              {errors.termsAgreed && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.termsAgreed}
                </p>
              )}
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            Create Account
          </button>
          
          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign in
            </Link>
          </div>
        </form>
      </div>
      
      <div className="mt-6 text-center text-white text-sm">
        <p>© 2025 Your Company. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Register;