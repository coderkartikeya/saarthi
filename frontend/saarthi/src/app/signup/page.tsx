"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Signup = () => {
  const router =useRouter();
  const [role, setRole] = useState("patient"); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");

  const signup=async()=>{
    try{
      if(role==='patient'){
      const response=await fetch('http://localhost:4000/User/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          fullname:username,
          email:email,
          password:password,
          gender:"",
          dateOfBirth:"",
          contact:phone,
          address:""
        })

      })
      const data=await response.json()
      console.log(data)
      if(response.status==201){        
        
        localStorage.setItem('userId',data.user._id);
        localStorage.setItem('email',data.user.email);
        router.push('/patient');
        

      }
      
    }
    }catch(error){
      console.error(error);
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          {role === "patient" ? "Patient Signup" : "Hospital Signup"}
        </h1>

        
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 rounded-l-lg ${
              role === "patient" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("patient")}
          >
            Patient
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${
              role === "hospital" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("hospital")}
          >
            Hospital
          </button>
        </div>

        
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter your name"
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter your email"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contact</label>
            <input
              type="contact"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter your contact no."
              onChange={(e)=>setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter your password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          {role === "hospital" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Hospital Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="Enter hospital name"
              />
            </div>
          )}

          <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600" onClick={signup}>
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
