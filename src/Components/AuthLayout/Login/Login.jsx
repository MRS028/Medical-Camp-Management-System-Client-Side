import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Lottie from "react-lottie"; 
import animationData from "../../../assets/Lottie/login.json";  
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaMailBulk, FaUser } from "react-icons/fa"; // Import icons

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const lottieOptions = {
    animationData,  
    loop: true,      
    autoplay: true,  
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row md:flex-row">
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
      <div className="md:w-1/2 lg:w-1/2 flex items-center justify-center bg-base-100 pt-0 p-6">
        <div className="w-full max-w-md">
          <h2 className="text-5xl font-bold mb-6 text-center pt-6">
            Sign in 
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form>
                <div className="mb-4 relative">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <FaEnvelope size={18} className="mr-2 text-gray-500" />
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="w-full focus:outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4 relative">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Password
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <FaLock size={18} className="mr-2 text-gray-500" />
                    <Field
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      className="w-full focus:outline-none"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)} 
                      className="text-gray-500"
                    >
                      {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />} {/* Toggle icon */}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4 text-right">
                  <a
                    href="/forgot-password"
                    className="text-teal-500 hover:underline text-sm"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white font-semibold rounded-md py-2 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  Create Account
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-4 text-center text-gray-600">
            <p className=" mb-6">Please register at first. Go to <Link
              to="/auth/register"
              className="text-teal-500 font-semibold hover:underline"
            >
              SIGN UP
            </Link></p>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
