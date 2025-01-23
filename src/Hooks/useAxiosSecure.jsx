import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", // আপনার সার্ভারের URL দিন
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    // Request interceptor
    axiosSecure.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    axiosSecure.interceptors.response.use(
      function (response) {
        return response;
      },
      async (error) => {
        const status = error.response?.status;

        // Check for 401 or 403 and log out
        if (status === 401 || status === 403) {
          await logOut();
          // Delay navigate to avoid React render issue
          navigate("/auth/login", { replace: true });
        }
        return Promise.reject(error);
      }
    );
  }, [navigate, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;
