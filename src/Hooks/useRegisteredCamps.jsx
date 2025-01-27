import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useregisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: registeredCamps = [],
    isLoading: loading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["registeredCamps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/registeredCamps");
      //   console.log("API Response:", res.data);
      return res.data;
    },
  });
  return [registeredCamps, loading, isError, refetch];
};

export default useregisteredCamps;
