import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useUsers = () => {
  const axiosSecure = useAxiosSecure();
  // const axiosPublic = useAxiosPublic()
  const {
    data: users = [],
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  return [users, loading, refetch];
};

export default useUsers;
