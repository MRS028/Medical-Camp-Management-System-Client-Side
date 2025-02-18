import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useJoinedCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const email = user?.email; // Avoid accessing undefined properties

  const {
    data: JoinedCamps = [],
    isLoading: loading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["joinedcamps", email], // Email-dependent caching
    queryFn: async () => {
      if (!email) return []; // No request if email is missing
      const res = await axiosSecure.get(`/registeredCamps/${email}`);
      return res.data;
    },
    enabled: !!email, // Prevent query if email is missing
  });

  return [JoinedCamps, loading, refetch, isError];
};


export default useJoinedCamps;
