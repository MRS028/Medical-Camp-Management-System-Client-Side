import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photoURL: result.user?.photoURL,
        };

        axiosPublic
          .post("/users", userInfo)
          .then((res) => {
            console.log(res.data);
            // Navigate to the previous page or home
            Swal.fire({
              title: "Login Success",
              text: "Assalamuwalaikum, Welcome to our MediCamp",
              icon: "success",
              showConfirmButton: true,
              timer: 1500,
            });
            navigate(from, { replace: true });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              position: "top",
              icon: "error",
              title: "Failed to create user",
              text: err.message,
              showConfirmButton: true,
            });
          });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Google Sign-in Failed",
          text: err.message,
          showConfirmButton: true,
        });
      });
  };

  return (
    <div className="">
      <div className="divider">
        <p>Or</p>
      </div>
      <button onClick={handleGoogleSignIn} className="btn w-full">
        <FcGoogle /> Continue With Google
      </button>
    </div>
  );
};

export default SocialLogin;
