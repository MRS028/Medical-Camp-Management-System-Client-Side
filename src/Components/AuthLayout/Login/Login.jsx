import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../../assets/Lottie/login.json";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../Hooks/useAuth";
import useScrollToTop from "../../../Hooks/useScrollToTop";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useScrollToTop();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    logIn(data.email, data.password).then((result) => {
      const user = result.user;
      Swal.fire({
        title: "Login Success",
        text: "Assalamuwalaikum, Welcome to our MediCamp",
        icon: "success",
        timer: 1500,
      });
      navigate(from, { replace: true });
    });
  };

  const lottieOptions = {
    animationData,
    loop: true,
    autoplay: true,
  };

  return (
    <div className="flex flex-col lg:flex-row md:flex-row">
      {/* Left Section */}
      <div className="md:w-1/2 lg:w-1/2 bg-teal-800 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-white text-2xl lg:text-5xl font-bold">
            Welcome to MediCamp
          </h2>
          <Lottie options={lottieOptions} height={350} width={350} />
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-[40%] w-[90%] mx-auto flex items-center justify-center bg-base-100 pt-0 p-6">
        <div className="w-full max-w-md">
          <h2 className="text-5xl font-bold mb-6 text-center pt-6">Sign in</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="mb-4 relative">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                <FaEnvelope size={18} className="mr-2 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full focus:outline-none"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                <FaLock size={18} className="mr-2 text-gray-500" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className="w-full focus:outline-none"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="text-gray-500"
                >
                  {passwordVisible ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Forgot Password */}
            <div className="mb-4 text-right">
              <a
                href="/forgot-password"
                className="text-teal-500 hover:underline text-sm"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn bg-teal-500 text-white font-semibold rounded-md py-2 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Sign In
            </button>
          </form>
          <SocialLogin></SocialLogin>

          <div className="mt-4 text-center text-gray-600">
            <p className="mb-6">
              Don't have account?{" "}
              <Link
                to="/auth/register"
                className="text-teal-500 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
