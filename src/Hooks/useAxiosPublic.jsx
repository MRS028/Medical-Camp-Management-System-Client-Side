import axios from "axios";
import React from "react";
const axiosPublic = axios.create({
  baseURL: "https://medical-camp-management-system-server-theta.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
