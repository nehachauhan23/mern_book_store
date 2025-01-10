import { useState } from 'react'
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm();

  const { registerUser } = useAuth();
  

  const onSubmit = async(data) => {

    try {
      // Call the registerUser function to register the user with email and password
      await registerUser(data.email, data.password);
      alert("Registration successful!"); // Handle success
    } catch (err) {
      setMessage("Invalid credential")
      console.error("Registration error:", err); // You can log or handle error here
    }
  }  
  const handleGoogleSignIn = () => {
    
  }

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input 
            {...register("email", {required: true})}
            type="email" name="email" id="email" placeholder="Email address" className="shadow appearance-none border rounded w-full py-2 px-3 leading-right focus:outline-none focus:shadow" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input 
            {...register("password", { required: true })}
            type="password" name="password" id="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 leading-right focus:outline-none focus:shadow" />
          </div>
          {
            
            
            message && <p className="text-red-500 text-xs italic mb-3">Email and password do not match, try again</p>
          }
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none">Register</button>
          </div>
        </form>
        <p className="align-baseline font-medium mt-4 text-sm ">
          Already registered? 
          <Link to="/login" className="text-blue-500 hover:text-blue-700"> Login here</Link>
        </p>

        <div className="mt-2">
          <button onClick={handleGoogleSignIn} className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
            <FaGoogle className="mr-2"/>
            Sign In with Google
          </button>
        </div>

        <p className="mt-5 text-center text-gray-500 text-xs">&copy; 2025 Book Store. All rights reserved</p>
      </div>
    </div>
  )
} 

export default Login