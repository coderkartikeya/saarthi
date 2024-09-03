"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [role, setRole] = useState("patient"); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const login = async () => {
    try {
      let endpoint = '';
      // Determine the correct endpoint based on the role
      if (role === "patient") {
        endpoint = 'http://localhost:4000/User/login';
      } else if (role === "hospital") {
        endpoint = 'http://localhost:4000/hospital/login';
      } else {
        console.error('Invalid role');
        return;
      }
  
      const request = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
  
      const response = await request.json();
      console.log(response);
  
      if (request.status === 201) { 
        console.log(response);
        localStorage.setItem('userId', response.user._id);
        localStorage.setItem('email', response.user.email);
        localStorage.setItem('name',response.user.name);
  
        
        if (role === "patient") {
          router.push('/patient'); 
        } else {
          router.push('/hospital'); 
        }
      } else {
        
        console.error('Login failed:', response.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          {role === "patient" ? "Patient Login" : "Hospital Login"}
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

        {/* Login Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            login();
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            onClick={login}
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
