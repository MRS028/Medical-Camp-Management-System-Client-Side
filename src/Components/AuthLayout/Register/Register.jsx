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
import SocialLogin from "../SocialLogin/SocialLogin";
import useScrollToTop from "../../../Hooks/useScrollToTop";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  useScrollToTop();

  // form-hook
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // form-submission
  const onSubmit = (data) => {
    // Check for errors

    // Proceed with the registration process
    Swal.fire({
      title: "Loading...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;

        updateUserProfile(data?.name, data?.photoURL)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              photoURL: data.photoURL,
              role: "user",
              created: new Date(),
            };

            axiosPublic
              .post("/users", userInfo)
              .then((res) => {
                Swal.close();
                if (res.data.insertedId) {
                  reset();
                  Swal.fire({
                    title: "Sign Up Successful",
                    text: "Assalamuwalaikum, Welcome to our MediCamp",
                    icon: "success",
                    timer: 1500,
                  });

                  navigate("/");
                }
              })
              .catch((err) => {
                // console.log(err);
                Swal.close();
                Swal.fire({
                  title: "An Error Occurred",
                  text:
                    err.message ||
                    "Something went wrong. Please try again later.",
                  icon: "error",
                });
              });
          })
          .catch((err) => {
            // console.log(err);
            Swal.close();
            Swal.fire({
              title: "An Error Occurred",
              text:
                err.message || "Something went wrong. Please try again later.",
              icon: "error",
            });
          });
      })
      .catch((err) => {
        // console.log(err);
        Swal.close();
        Swal.fire({
          title: "An Error Occurred",
          text: err.message || "Something went wrong. Please try again later.",
          icon: "error",
        });
      });
  };

  // Lottie animation
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
      <div className="md:w-1/2 hidden lg:block items-center justify-center mb-8 md:mb-0">
        <h2 className="lg:text-5xl text-2xl font-extrabold mb-4 text-center">
          Welcome to MediCamp
        </h2>
        <p className="text-center mb-6">
          Join our community and get access to premium healthcare resources.
        </p>
        <Lottie options={defaultOptions} height={400} width={340} />
      </div>

      {/* Right Section with Registration Form */}
      <div className="md:w-[40%] bg-white bg-opacity-10 p-8 rounded-2xl shadow-2xl duration-300">
        <h2 className="text-4xl font-extrabold mb-4 text-center">Register</h2>

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
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
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

          {/* Profile Photo URL Field */}
          <div className="relative">
            <label
              htmlFor="photoURL"
              className="text-sm font-semibold text-gray-700 mb-1 block"
            >
              Profile Photo Link
            </label>
            <div className="relative">
              <FaPhotoFilm className="absolute top-4 left-3 text-gray-400" />
              <input
                id="photoURL"
                type="text"
                placeholder="Give Your Profile Link"
                {...register("photoURL")}
                className="w-full pl-10 border-2 py-3 rounded-lg bg-opacity-20 bg-white outline-none focus:ring-2 focus:ring-teal-300"
              />
              {errors.photoURL && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photoURL.message}
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
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
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
        <SocialLogin />
        <p className="text-center mt-6">
          Already registered?{" "}
          <Link
            to="/auth/login"
            className="text-teal-300 hover:underline font-bold"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
