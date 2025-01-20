import React, { useState } from "react";
import Lottie from "react-lottie";
import doctorAnimation from "../../../assets/Lottie/register.json";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Configuration for Lottie animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: doctorAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 py-8">
      {/* Left Section with Lottie Animation */}
      <div className="md:w-1/2 flex  items-center justify-center  mb-8 md:mb-0">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>

      {/* Right Section with Registration Form */}
      <div className="md:w-1/2 bg-white bg-opacity-10 p-8 rounded-2xl shadow-2xl  duration-300">
        <h2 className="text-4xl font-extrabold mb-4 text-center">Welcome to MediCamp</h2>
        <p className="text-center mb-6">
          Join our community and get access to premium healthcare resources.
        </p>
        <form className="space-y-5 ">
          {/* Name Field */}
          <div className="relative">
            <label htmlFor="fullName" className="text-sm font-semibold text-gray-700 mb-1 block">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute top-4 left-3 text-gray-400" />
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="w-full pl-10 py-3 border-2 rounded-lg bg-opacity-20 bg-white outline-none focus:ring-2 focus:ring-teal-300"
              />
            </div>
          </div>

          {/* Username Field */}
          <div className="relative">
            <label htmlFor="username" className="text-sm font-semibold text-gray-700 mb-1 block">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute top-4 left-3 text-gray-400" />
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                className="w-full pl-10 border-2 py-3 rounded-lg bg-opacity-20 bg-white outline-none focus:ring-2 focus:ring-teal-300"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1 block">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 py-3 border-2 rounded-lg bg-opacity-20 bg-white outline-none focus:ring-2 focus:ring-teal-300"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-1 block">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute top-4 left-3 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full pl-10 pr-10 border-2 py-3 rounded-lg bg-opacity-20 bg-white outline-none focus:ring-2 focus:ring-teal-300"
              />
              <div
                className="absolute top-4 right-3 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20}/>}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full py-3 bg-gradient-to-r from-teal-500 to-green-400 text-white rounded-lg font-bold hover:from-teal-600 hover:to-green-500 transition">
            Create Account
          </button>
        </form>
        <p className="text-center mt-6">
          Already registered?{" "}
          <Link to="/auth/login" className="text-teal-300 hover:underline font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
