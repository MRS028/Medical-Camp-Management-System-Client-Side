import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Lottie from "react-lottie";
import doctorAnimation from "../../../assets/Lottie/register.json";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaPhotoFilm } from "react-icons/fa6";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  //form-hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
//form-submission
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      updateUserProfile(data?.name, data?.photoURL)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            photoURL: data.photoURL,
          };
          console.log(userInfo);

          axiosPublic
            .post("/users", userInfo)
            .then((res) => {
              console.log(res.data);

              if (res.data.insertedId) {
                console.log("User added to the database");
                // reset();
                Swal.fire({
                  position: "top",
                  icon: "success",
                  title: "Sign Up Successful",
                  showConfirmButton: false,
                  timer: 1500,
                });

                navigate("/");
              }
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  };

  //Lottie animation
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
      <div className="md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
        <Lottie options={defaultOptions} height={300} width={400} />
      </div>

      {/* Right Section with Registration Form */}
      <div className="md:w-1/2  bg-white bg-opacity-10 p-8 rounded-2xl shadow-2xl duration-300">
        <h2 className="text-4xl font-extrabold mb-4 text-center">
          Welcome to MediCamp
        </h2>
        <p className="text-center mb-6">
          Join our community and get access to premium healthcare resources.
        </p>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="relative">
            <label
              htmlFor="fullName"
              className="text-sm font-semibold text-gray-700 mb-1 block"
            >
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute top-4 left-3 text-gray-400" />
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                {...register("name", { required: "Full name is required" })}
                className="w-full pl-10 py-3 border-2 rounded-lg bg-opacity-20 bg-white outline-none focus:ring-2 focus:ring-teal-300"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>
          </div>

          {/* Username Field */}
          <div className="relative">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-gray-700 mb-1 block"
            >
              Profile Photo Link
            </label>
            <div className="relative">
              <FaPhotoFilm className="absolute top-4 left-3 text-gray-400" />
              <input
                id="username"
                type="text"
                placeholder="Give Your Profile Link"
                // { required: "Username is required" }
                {...register("photoURL", )}
                className="w-full pl-10 border-2 py-3 rounded-lg bg-opacity-20 bg-white outline-none focus:ring-2 focus:ring-teal-300"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700 mb-1 block"
            >
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full pl-10 py-3 border-2 rounded-lg bg-opacity-20 bg-white outline-none focus:ring-2 focus:ring-teal-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700 mb-1 block"
            >
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute top-4 left-3 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                className="w-full pl-10 pr-10 border-2 py-3 rounded-lg bg-opacity-20 bg-white outline-none focus:ring-2 focus:ring-teal-300"
              />
              <div
                className="absolute top-4 right-3 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-green-400 text-white rounded-lg font-bold hover:from-teal-600 hover:to-green-500 transition"
          >
            Create Account
          </button>
        </form>
        <p className="text-center mt-6">
          Already registered?{" "}
          <Link
            to="/auth/login"
            className="text-teal-300 hover:underline font-bold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
