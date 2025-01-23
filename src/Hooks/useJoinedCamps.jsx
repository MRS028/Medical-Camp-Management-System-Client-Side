import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useJoinedCamps = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: JoinedCamps = [],
    isLoading: loading,
    refetch,
    isError
  } = useQuery({
    queryKey: ["joinedcamps"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/registeredCamps/${user.email}`);
      console.log("API Response:", res.data);
      return res.data;
    },
  });
  return [JoinedCamps, loading,isError, refetch];
};

export default useJoinedCamps;
